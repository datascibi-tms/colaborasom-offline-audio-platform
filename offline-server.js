/*
 * offline-server.js
 * -----------------------------------------------------------------------
 * Substitui o servidor Node + socket.io para a versão do GitHub Pages.
 *
 * Em vez de editar as centenas de chamadas socket.emit(...) do sketch.js,
 * esta camada define um `io` falso. O sketch.js continua chamando
 *   socket = io.connect(); socket.on(...); socket.emit(...);
 * e quem responde agora é este arquivo, localmente:
 *
 *   - gravações (.ogg)  -> IndexedDB (guarda Blob direto, sem limite de 5 MB)
 *   - trilhas sonoras   -> IndexedDB
 *   - sessões           -> IndexedDB (JSON)
 *   - exportar/importar -> dois botões na barra de transporte geram/leem
 *                          um backup .json (áudios em base64)
 *   - lista de criadores, avatar, nome, link no chat -> respondidos localmente
 *   - o que era só broadcast para outros clientes (troca de som, chat,
 *     "outrosom") -> ignorado, não há outros clientes
 *
 * Tudo está dentro de try/catch e as respostas são assíncronas: se o
 * IndexedDB falhar (modo privado, quota cheia), a aplicação continua
 * funcionando e as gravações ficam só na memória da aba.
 *
 * Carregue ESTE arquivo ANTES do sketch.js e remova o <script> do socket.io.
 */
(function () {
  'use strict';

  var DB_NOME = 'colaborasom';
  var DB_VERSAO = 1;
  var STORES = ['gravacoes', 'trilhas', 'sessoes'];
  // identifica esta abertura da página, para poder apagar do banco
  // uma gravação feita agora quando o usuário clica na lixeira
  var SESSAO_PAGINA = Date.now();

  /* ------------------------------------------------------------------ */
  /* Camada de armazenamento (IndexedDB com fallback em memória)         */
  /* ------------------------------------------------------------------ */
  var memoria = { gravacoes: [], trilhas: [], sessoes: [] };
  var proximoIdMemoria = 1;
  var dbPromise = null;

  function abreDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!('indexedDB' in window)) {
        reject(new Error('IndexedDB indisponível'));
        return;
      }
      var req = indexedDB.open(DB_NOME, DB_VERSAO);
      req.onupgradeneeded = function () {
        var db = req.result;
        STORES.forEach(function (nome) {
          if (!db.objectStoreNames.contains(nome)) {
            db.createObjectStore(nome, { keyPath: 'id', autoIncrement: true });
          }
        });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
      req.onblocked = function () { reject(new Error('IndexedDB bloqueado')); };
    });
    // pede ao navegador para não apagar os dados quando faltar espaço
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    } catch (e) { /* ignora */ }
    return dbPromise;
  }

  function transacao(store, modo, fn) {
    return abreDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(store, modo);
        var req = fn(t.objectStore(store));
        t.oncomplete = function () { resolve(req ? req.result : undefined); };
        t.onerror = function () { reject(t.error); };
        t.onabort = function () { reject(t.error); };
      });
    });
  }

  function salva(store, registro) {
    return transacao(store, 'readwrite', function (os) { return os.add(registro); })
      .catch(function (e) {
        console.warn('[offline-server] IndexedDB falhou, guardando só na memória:', e);
        registro.id = 'mem' + (proximoIdMemoria++);
        memoria[store].push(registro);
        return registro.id;
      });
  }

  function lista(store) {
    return transacao(store, 'readonly', function (os) { return os.getAll(); })
      .catch(function () { return memoria[store].slice(); });
  }

  function apagaPorId(store, id) {
    memoria[store] = memoria[store].filter(function (r) { return r.id !== id; });
    return transacao(store, 'readwrite', function (os) { return os.delete(id); })
      .catch(function (e) { console.warn('[offline-server] não consegui apagar:', e); });
  }

  // apaga um registro criado NESTA abertura da página, pelo número do contador
  function apagaPorNumero(store, n) {
    return lista(store).then(function (itens) {
      itens.forEach(function (r) {
        if (r.sessaoPagina === SESSAO_PAGINA && r.n === n) apagaPorId(store, r.id);
      });
    }).catch(function () { /* ignora */ });
  }

  /* ------------------------------------------------------------------ */
  /* "Servidor" local: o que antes o server.js fazia                     */
  /* ------------------------------------------------------------------ */
  function criaSocketLocal() {
    var handlers = {};

    // o cliente que antes o servidor criava no 'connection'
    var eu = {
      id: 'local-' + Math.random().toString(36).slice(2, 10),
      nome: 'Criador',
      avatar: 'notamusicalAlfa',
      recBlob: null,
      recBlobs: [],
      trilhas: []
    };

    // dispara os callbacks registrados com socket.on, sempre de forma assíncrona
    function responde(evento) {
      var args = Array.prototype.slice.call(arguments, 1);
      setTimeout(function () {
        (handlers[evento] || []).forEach(function (fn) {
          try { fn.apply(null, args); }
          catch (e) { console.warn('[offline-server] erro no handler de "' + evento + '":', e); }
        });
      }, 0);
    }

    // equivalente aos socket.on(...) do server.js
    var local = {
      entraCliente: function (d) {
        if (d && d.nome) eu.nome = d.nome;
        responde('upClientesNome', [eu]);
      },

      updateAvatar: function (d) {
        if (d && d.avatar) eu.avatar = d.avatar;
        responde('upClientesAvatar', [eu]);
      },

      updateBlob: function (d) {
        if (d) { eu.recBlob = d.recBlob; eu.recBlobs = d.recBlobs || eu.recBlobs; }
        responde('upClientesBlob', [eu]);
      },

      // antes: fs.writeFile('./public/sons/usersBlobs/...ogg')
      recBlob: function (cl) {
        if (!cl || !cl.recBlob) return;
        salva('gravacoes', {
          criador: cl.nome,
          avatar: cl.avatar,
          n: cl.gravinas,
          sessaoPagina: SESSAO_PAGINA,
          data: new Date().toISOString(),
          blob: cl.recBlob
        });
      },

      // antes: grava .json e .ogg em ./public/trilhas
      serveTrilha: function (tri) {
        if (!tri || !tri.blob) return;
        salva('trilhas', {
          criador: tri.criador,
          videosrc: tri.videosrc,
          nome: tri.nome,
          n: tri.contador,
          sessaoPagina: SESSAO_PAGINA,
          data: new Date().toISOString(),
          blob: tri.blob
        });
      },

      // antes: grava ./public/sessions/*.json
      salvaSession: function (s) {
        if (!s) return;
        var dados;
        try {
          // o objeto da sessão tem elementos DOM; só o que é JSON vai para o banco
          dados = JSON.parse(JSON.stringify({
            nome: s.nome, criador: s.criador, msns: s.msns, canais: s.canais, cont: s.cont
          }));
        } catch (e) {
          dados = { nome: s.nome, criador: s.criador };
        }
        dados.data = new Date().toISOString();
        salva('sessoes', dados);
      },

      // o servidor devolvia o link também para quem enviou
      mandaLinkCl: function (lk) { responde('newLink', lk); }

      // Ignorados de propósito (eram só broadcast para outros clientes):
      // chatMsg, outrosom, outrosom2, trocaSom1..32, sendObjBlob, ping, teste
    };

    var socket = {
      id: eu.id,
      connected: true,
      on: function (evento, fn) {
        (handlers[evento] = handlers[evento] || []).push(fn);
        return socket;
      },
      off: function (evento, fn) {
        handlers[evento] = (handlers[evento] || []).filter(function (f) { return f !== fn; });
        return socket;
      },
      emit: function (evento) {
        var args = Array.prototype.slice.call(arguments, 1);
        try {
          if (local[evento]) local[evento].apply(null, args);
        } catch (e) {
          console.warn('[offline-server] erro em emit("' + evento + '"):', e);
        }
        return socket;
      },
      disconnect: function () {}
    };

    // no 'connection' o servidor mandava a lista de clientes
    responde('clientes', [eu]);

    return socket;
  }

  // funciona tanto como io() quanto como io.connect()
  var io = function () { return criaSocketLocal(); };
  io.connect = io;
  window.io = io;

  /* ------------------------------------------------------------------ */
  /* Restaura o que foi salvo em visitas anteriores                      */
  /* ------------------------------------------------------------------ */
  var ICONE_LIXEIRA = '<ion-icon name=trash-sharp size=large></ion-icon>';

  function ligaNoWebAudio(audio) {
    // mesmo roteamento do sketch.js: sai no alto-falante e entra no gravador
    try {
      if (typeof ctx !== 'undefined' && typeof dest !== 'undefined') {
        var track = ctx.createMediaElementSource(audio);
        track.connect(ctx.destination);
        track.connect(dest);
      }
    } catch (e) { console.warn('[offline-server] Web Audio:', e); }
  }

  function restauraGravacao(item) {
    var container = document.getElementById('audioCombo');
    if (!container) return;

    var audio = document.createElement('audio');
    audio.className = 'audUser';
    audio.controls = true;
    audio.loop = true;
    audio.src = URL.createObjectURL(item.blob);
    ligaNoWebAudio(audio);

    var usDiv = document.createElement('div');
    usDiv.className = 'usDiv';
    var capa = document.createElement('div');
    capa.id = 'capaUsDiv';
    var bot = document.createElement('button');
    bot.className = 'usBot';
    bot.innerHTML = item.criador + '</br> Gravação (salva) ' + new Date(item.data).toLocaleString();
    var del = document.createElement('button');
    del.className = 'bDel';
    del.innerHTML = ICONE_LIXEIRA;
    del.onclick = function () { usDiv.remove(); apagaPorId('gravacoes', item.id); };

    capa.append(bot, del);
    usDiv.append(capa, audio);
    container.append(usDiv);
  }

  function restauraTrilha(item) {
    var container = document.getElementById('divTrilhaGaleria');
    if (!container) return;

    var audio = document.createElement('audio');
    audio.className = 'audTUser';
    audio.style.display = 'none';
    audio.controls = true;
    audio.loop = false;
    audio.src = URL.createObjectURL(item.blob);
    ligaNoWebAudio(audio);

    var icone = document.createElement('img');
    icone.src = './imgs/trilhaAlfa100.png';
    icone.onclick = function () {
      if (typeof playTrilha === 'function') playTrilha(audio, item.videosrc);
    };

    var usDiv = document.createElement('div');
    usDiv.className = 'usTrilhaDiv';
    var capa = document.createElement('div');
    capa.className = 'capaUsTrilhaDiv';
    var bot = document.createElement('button');
    bot.className = 'usBot';
    bot.innerHTML = item.criador + '</br> Trilha (salva)';
    var del = document.createElement('button');
    del.className = 'bDel';
    del.innerHTML = ICONE_LIXEIRA;
    del.onclick = function () { usDiv.remove(); apagaPorId('trilhas', item.id); };

    capa.append(bot, icone, del);
    usDiv.append(capa, audio);
    container.append(usDiv);
  }

  function restauraTudo() {
    lista('gravacoes').then(function (itens) {
      itens.forEach(function (i) { try { restauraGravacao(i); } catch (e) { console.warn(e); } });
    });
    lista('trilhas').then(function (itens) {
      itens.forEach(function (i) { try { restauraTrilha(i); } catch (e) { console.warn(e); } });
    });
  }


  /* ------------------------------------------------------------------ */
  /* Exportar / importar (backup em arquivo .json)                       */
  /* ------------------------------------------------------------------ */
  /*
   * O IndexedDB é por navegador e por dispositivo. Para levar as gravações
   * para outro lugar (ou fazer backup), exportamos tudo em UM arquivo .json.
   * Os áudios (Blob) viram texto base64 dentro do JSON e voltam a ser Blob
   * na importação. Formato:
   *   { versao: 1, exportadoEm, gravacoes: [...], trilhas: [...], sessoes: [...] }
   * Cada gravação/trilha leva o campo "base64" (data URL) no lugar de "blob".
   */

  // Blob -> data URL (texto base64), para caber no JSON
  function blobParaDataURL(blob) {
    return new Promise(function (resolve, reject) {
      var leitor = new FileReader();
      leitor.onload = function () { resolve(leitor.result); };
      leitor.onerror = function () { reject(leitor.error); };
      leitor.readAsDataURL(blob);
    });
  }

  // data URL -> Blob (o fetch de um data: URL devolve os bytes direto)
  function dataURLParaBlob(dataUrl) {
    return fetch(dataUrl).then(function (r) { return r.blob(); });
  }

  // converte uma lista de registros trocando "blob" por "base64"
  function serializaItens(itens) {
    return Promise.all(itens.map(function (item) {
      var copia = Object.assign({}, item);
      delete copia.id;            // o id é do banco local, não vai no arquivo
      delete copia.sessaoPagina;  // só faz sentido dentro da aba que gravou
      if (!item.blob) return copia;
      return blobParaDataURL(item.blob).then(function (b64) {
        delete copia.blob;
        copia.base64 = b64;
        return copia;
      });
    }));
  }

  // dispara o download de um arquivo gerado no navegador (sem servidor)
  function baixaArquivo(nome, texto) {
    var arquivo = new Blob([texto], { type: 'application/json' });
    var url = URL.createObjectURL(arquivo);
    var a = document.createElement('a');
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // espera um pouco antes de liberar a URL, para o download começar
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  }

  function exportaBackup() {
    Promise.all([lista('gravacoes'), lista('trilhas'), lista('sessoes')])
      .then(function (r) {
        if (!r[0].length && !r[1].length && !r[2].length) {
          alert('Não há gravações salvas para exportar.');
          return null;
        }
        return Promise.all([serializaItens(r[0]), serializaItens(r[1]), serializaItens(r[2])]);
      })
      .then(function (r) {
        if (!r) return;
        var backup = {
          versao: 1,
          exportadoEm: new Date().toISOString(),
          gravacoes: r[0],
          trilhas: r[1],
          sessoes: r[2]
        };
        var dia = new Date().toISOString().slice(0, 10);
        baixaArquivo('colaborasom-backup-' + dia + '.json', JSON.stringify(backup));
      })
      .catch(function (e) {
        console.warn('[offline-server] erro ao exportar:', e);
        alert('Não consegui exportar as gravações.');
      });
  }

  // chave que identifica um registro, para não importar o mesmo duas vezes
  function chaveDe(item) { return item.criador + '|' + item.data + '|' + item.n; }

  // importa uma lista de um tipo ('gravacoes' ou 'trilhas'); devolve quantos entraram
  function importaItens(store, itensArquivo, restaura) {
    return lista(store).then(function (existentes) {
      var jaTem = {};
      existentes.forEach(function (e) { jaTem[chaveDe(e)] = true; });

      var novos = itensArquivo.filter(function (i) { return i && i.base64 && !jaTem[chaveDe(i)]; });

      // processa um por vez, para não carregar todos os áudios na memória juntos
      return novos.reduce(function (fila, item) {
        return fila.then(function (total) {
          return dataURLParaBlob(item.base64).then(function (blob) {
            var registro = Object.assign({}, item, { blob: blob });
            delete registro.base64;
            return salva(store, registro).then(function (id) {
              registro.id = id;
              try { restaura(registro); } catch (e) { console.warn(e); } // já aparece na tela
              return total + 1;
            });
          });
        });
      }, Promise.resolve(0));
    });
  }

  function importaBackup(arquivo) {
    if (!arquivo) return;
    var leitor = new FileReader();
    leitor.onerror = function () { alert('Não consegui ler o arquivo.'); };
    leitor.onload = function () {
      var dados;
      try { dados = JSON.parse(leitor.result); }
      catch (e) { alert('Esse arquivo não é um backup válido (JSON inválido).'); return; }

      if (!dados || dados.versao !== 1) {
        alert('Esse arquivo não parece ser um backup do Colaborasom.');
        return;
      }

      Promise.all([
        importaItens('gravacoes', dados.gravacoes || [], restauraGravacao),
        importaItens('trilhas', dados.trilhas || [], restauraTrilha),
        // sessões são só JSON, sem áudio
        lista('sessoes').then(function (existentes) {
          var jaTem = {};
          existentes.forEach(function (e) { jaTem[e.criador + '|' + e.data] = true; });
          var novas = (dados.sessoes || []).filter(function (x) { return x && !jaTem[x.criador + '|' + x.data]; });
          return Promise.all(novas.map(function (x) { return salva('sessoes', x); }))
            .then(function () { return novas.length; });
        })
      ]).then(function (r) {
        alert('Importado: ' + r[0] + ' gravação(ões), ' + r[1] + ' trilha(s), ' + r[2] + ' sessão(ões).');
      }).catch(function (e) {
        console.warn('[offline-server] erro ao importar:', e);
        alert('Não consegui importar todo o arquivo.');
      });
    };
    leitor.readAsText(arquivo);
  }

  // cria os dois botões na barra de transporte (mesmo estilo dos outros)
  function criaBotoesBackup() {
    var barra = document.getElementById('transportContainer');
    if (!barra) return;

    function botao(icone, titulo, aoClicar) {
      var b = document.createElement('button');
      b.className = 'transportButtons';
      b.title = titulo;
      b.innerHTML = '<ion-icon name="' + icone + '" size="large"></ion-icon>';
      b.onclick = aoClicar;
      return b;
    }

    // <input type=file> escondido; o botão de importar apenas o aciona
    var entrada = document.createElement('input');
    entrada.type = 'file';
    entrada.accept = '.json,application/json';
    entrada.style.display = 'none';
    entrada.onchange = function () {
      importaBackup(entrada.files[0]);
      entrada.value = ''; // permite escolher o mesmo arquivo de novo
    };

    barra.append(
      botao('download-sharp', 'Exportar gravações (backup)', exportaBackup),
      botao('cloud-upload-sharp', 'Importar gravações (backup)', function () { entrada.click(); }),
      entrada
    );
  }

  // depois do sketch.js, para ctx/dest/playTrilha já existirem
  window.addEventListener('load', function () {
    restauraTudo();
    criaBotoesBackup();
  });

  // usado pelas lixeiras das gravações criadas na sessão atual (ver sketch.js)
  window.Armazenamento = {
    apagaGravacao: function (n) { return apagaPorNumero('gravacoes', n); },
    apagaTrilha: function (n) { return apagaPorNumero('trilhas', n); }
  };
})();
