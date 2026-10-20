var socket;

//require('WaveSurfer');
var doc;
var a;
var tempo, tempo2, metroTempo;
////// variáveis do chat
var msgDiv, sendButton, conversaDiv, textoUser, mic;

var iconImgs = [];
let audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8,
audio9, audio10, audio11, audio12, audio13, audio14, audio15, audio16,
audio17, audio18, audio19, audio20, audio21, audio22, audio23, audio24,
audio25, audio26, audio27, audio28, audio29, audio30, audio31, audio32;

var audio1b;

let
//////audios ativados por keypress- a-h e z-,     16 canais - 1-16
playSound1, playSound2, playSound3, playSound4, playSound5, playSound6, playSound7, playSound8,
playSound9,playSound10, playSound11, playSound12, playSound13, playSound14, playSound15, playSound16,
/// 32 canais 17-32
playSound17, playSound18, playSound19, playSound20, playSound21, playSound22, playSound23, playSound24,
playSound25,playSound26, playSound27, playSound28, playSound29, playSound30,playSound31, playSound32,
//////audios ativados por buttonPress- 1-16,     16 canais
// playSound1b, playSound2b, playSound3b, playSound4b ,playSound5b, playSound6b,playSound7b, playSound8b,
// playSound9b, playSound10b, playSound11b, playSound12b, playSound13b, playSound14b, playSound15b, playSound16b,
///////////
//////////// ganhos da web audio api dos 16 canais key press
gain1, gain2, gain3, gain4, gain5, gain6, gain7, gain8,
gain9, gain10, gain11, gain12, gain13, gain14, gain15, gain16,
/// canais de 17- 32
gain17, gain18, gain19, gain20, gain21, gain22, gain23, gain24, gain25, gain26, gain27,
gain28, gain29, gain30, gain31, gain32,
//////////// ganhos da web audio api dos 16 canais button Press
gain1b, gain2b, gain3b, gain4b, gain5b, gain6b, gain7b, gain8b,
gain9b, gain10b, gain11b, gain12b, gain13b, gain14b, gain15b, gain16b,
botW,botH ;

//// volumes de cada canal
var v1,v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16,
v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31, v32,
 canal, bot, b;

//// booleanas de keypressed de cada Canal
let c1Press = false;
let c2Press = false;
let c3Press = false;
let c4Press = false;
let c5Press = false;
let c6Press = false;
let c7Press = false;
let c8Press = false;
let c9Press = false;
let c10Press = false;
let c11Press = false;
let c12Press = false;
let c13Press = false;
let c14Press = false;
let c15Press = false;
let c16Press = false;
let c17Press = false;
let c18Press = false;
let c19Press = false;
let c20Press = false;
let c21Press = false;
let c22Press = false;
let c23Press = false;
let c24Press = false;
let c25Press = false;
let c26Press = false;
let c27Press = false;
let c28Press = false;
let c29Press = false;
let c30Press = false;
let c31Press = false;
let c32Press = false;

///////////// função para mutar os canais
function zeraVolume(){
 for (i = 1; i <= 32; i++) {
  let sl = document.getElementById('sld'+i);
  sl.value = 0;
  //console.log(sl.value);
  }
}

///////////// função para retornar a volume nos canais
function voltaVolume(){
  for (i = 1; i <= 32; i++) {
   let slv = document.getElementById('sld'+i);
   slv.value = 0.5;
   }
}



let height, width;
var latency, startTime;
var sinth1;
var homeDiv = document.getElementById("home");

function escondeDiv(){
  homeDiv.style.display ="none";
}


//////////// função para destravar o web api no ios da apple.
// function unlockAudioContext(audioCtx) {
//   if (audioCtx.state !== 'suspended') return;
//   const b = document.body;
//   const events = ['touchstart','touchend', 'mousedown','keydown'];
//   events.forEach(e => b.addEventListener(e, unlock, false));
//   function unlock() { audioCtx.resume().then(clean); }
//   function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
// }

/////////// criando o context da web audio api para as operações de audio do site.
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
//// criando destino da gravação
const dest = ctx.createMediaStreamDestination();
// //// criando o gravador da web audio api
const recorder = new MediaRecorder(dest.stream);
/////////
let testbotSom = document.getElementById('chatBot');
////////função para liberar o mute da web audio api no safari

let metronomoBotAdd, metronomoBotSub, metronomoTempoDisplay, metronomoDiv;


function showMetronome(){
  metronomoDiv = document.getElementById('metroDiv');
  metronomoDiv.style.display = "flex";
}

/////////// carrega os audios e conecta com os 16 canais no ctx da web audio api

// function openAudio(){
//   let o = ctx.createOscillator();
//   o.frequency.value = 440;
//   o.connect(ctx.destination);
//   o.start(0);
//   o.stop(0.5);
// }


/////////// teste para safari que não está tocando os sons
// window.fetch("./sons/BumboSub.ogg")
//   .then(response => response.arrayBuffer())
//   .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer,
//         audioBuffer => {
//                         au1 = audioBuffer;
//                         return au1;
//                         },
//                        error =>
//                        console.error(error)
//                       ));

////////////////     Atenção !!!!!!!!!!!!!!!!!! problema com safari para decodeAudioData

/////////teste para iphone mudando o sintaxe do decodeAudioData porque safari usa a sintax antiga
// function bPlay1(){
//   ctx.resume();
//   bot = "Botão 1";
//   var playSound1b = ctx.createBufferSource();
//   var vb1 = document.getElementById('sld1').value;
//   playSound1b.buffer = source;
//   var gain1b = ctx.createGain();
//   playSound1b.connect(gain1b);
//   gain1b.connect(ctx.destination);
//   gain1b.connect(dest);
//   gain1b.gain.value = vb1;
//   trocaCorBot("pb1");
//   console.log(au1);
//   console.log(playSound1b);
//   playSound1b.start(ctx.currentTime);
// }

// function loadTrilha() {
//   fetch('./trilhas/zeca_trilhaSonora.json')
//       .then((response) => response.json())
//       .then((json) => console.log(json));
// }
//
//
//
// loadTrilha();

  /////Canal 1 // carrega audio para canais da web audio api ctx
  fetch("./sons/Bumbo.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio1 = decodedAudio;
      });
  //////////////////Canal 2
  fetch("./sons/Caixa.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio2 = decodedAudio;
      });
  /////////////////// canal 3
  fetch("./sons/Cajon.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio3 = decodedAudio;
      });
  /////////////  canal 4
  fetch("./sons/Crash.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio4 = decodedAudio;
      });
  //////  canal 5
  fetch("./sons/Guitarra-PcC.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio5 = decodedAudio;
      });
  //////////////////Canal 6
  fetch("./sons/Guitarra-PcF.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio6 = decodedAudio;
      });
  /////////////////// canal 7
  fetch("./sons/Guitarra-PcG.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio7 = decodedAudio;
      });
  /////////////  canal 8
  fetch("./sons/Hihat.ogg")
       .then(data => data.arrayBuffer())
       .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
       .then(decodedAudio => {
         audio8 = decodedAudio;
      });
      ///////Canal 9 // carrega audio para canais da web audio api ctx
      fetch("./sons/PianoC.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio9 = decodedAudio;
          });
      //////////////////Canal 10
      fetch("./sons/PianoEm.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio10 = decodedAudio;
          });
      /////////////////// canal 11
      fetch("./sons/PianoF.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio11 = decodedAudio;
          });
      /////////////  canal 12
      fetch("./sons/TamborimG.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio12 = decodedAudio;
          });
      //////  canal 13
      fetch("./sons/BassC3.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio13 = decodedAudio;
          });
      //////////////////Canal 14
      fetch("./sons/BassF3.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio14 = decodedAudio;
          });
      /////////////////// canal 15
      fetch("./sons/BassG3.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio15 = decodedAudio;
          });
      /////////////  canal 16 Bases pré gravadas
      fetch("./sons/BassC3.ogg")
           .then(data => data.arrayBuffer())
           .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
           .then(decodedAudio => {
             audio16 = decodedAudio;
          });

    //// canais de 17 ao 32

    fetch("./sons/Bumbo.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio17 = decodedAudio;
        });
    /////////////////
    fetch("./sons/Caixa.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio18 = decodedAudio;
        });
    ///////////////////
    fetch("./sons/HiHat.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio19 = decodedAudio;
        });
    /////////////
    fetch("./sons/HiHat.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio20 = decodedAudio;
        });
    //////
    fetch("./sons/SurdoG.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio21 = decodedAudio;
        });
    ////////////////
    fetch("./sons/SurdoA.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio22 = decodedAudio;
        });
    ///////////////////
    fetch("./sons/Ride.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio23 = decodedAudio;
        });
    /////////////
    fetch("./sons/Crash.ogg")
         .then(data => data.arrayBuffer())
         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
         .then(decodedAudio => {
           audio24 = decodedAudio;
        });
        ///////
        fetch("./sons/TamborimG.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio25 = decodedAudio;
            });
        //////////////////
        fetch("./sons/TamborimA.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio26 = decodedAudio;
            });
        ///////////////////
        fetch("./sons/PianoC.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio27 = decodedAudio;
            });
        /////////////
        fetch("./sons/PianoBm.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio28 = decodedAudio;
            });
        //////
        fetch("./sons/PianoEm.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio29 = decodedAudio;
            });

        fetch("./sons/PianoF.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio30 = decodedAudio;
            });

        fetch("./sons/PianoG.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio31 = decodedAudio;
            });

        fetch("./sons/PianoD.ogg")
             .then(data => data.arrayBuffer())
             .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
             .then(decodedAudio => {
               audio32 = decodedAudio;
            });

///////////////metronomo


  ///// slider circular do metronomo
  $("#metroSld").roundSlider(
    {
      sliderType: "min-range",
      handleShape: "round",
      width: 22,
      radius: 60,
      value: 60,
      min:40,
      max:380
  });


////////////// metronomo
var metronome = new Metronome();


//tempo.textContent = metronome.tempo;

var playPauseIcon = document.getElementById('play-pause-icon');

// metroTempoSld.addEventListener('change', function(){
//   metronome.tempo = this.value;
//   console.log(this.value);
//   });
var metroSld = document.getElementById('metroSld');

var metroPlayButton = document.getElementById('metroOnOffBot');
metroPlayButton.addEventListener('click', function() {
metronome.startStop();


    // if (metronome.isRunning) {
    //     playPauseIcon.className = 'pause';
    // }
    // else {
    //     playPauseIcon.className = 'play';
    // }

});


/////////////////



var amix, mixServ, mixServBuffer;
var gravacão, blobGravaçãoMix;
var micStream, micAudio;


var track1, track2;
var chunks1 = [];//// array para receber a mix do cliente
var chunks2 = [];///// array para receber a mix do servidor proveniente de outro cliente.
var micChunks = [];
var video, trilhaAudio1, trilhaAudio2;
var bpm, soundClick;

let src1, src2, src3, src4, src5, src6, src7, src8,
src9, src10, src11, src12, src13, src14, src15, src16,
src17, src18, src19, src20,src21, src22, src23, src24,
src25, src26, src27, src28, src29, src30, src31, src32;

///////////////// funções de teste para criação de divs com icones para os clientes
function criaIcon() {
  let divIcon = document.createElement('button');
  divIcon.style.width="10%";
  divIcon.style.height="20%";
  divIcon.style.borderRadius = "50%";
  let icon = document.createElement('img');
  icon.src = "/imgs/icons/giraffe.png";
  icon.style.display = "flex";
  icon.style.width = "95%";
  icon.style.height = "95%";
  divIcon.append(icon);
  document.getElementById('footer').appendChild(divIcon);
}


////////////////////////////////////pega a width do device//////////////
// function pegaWidth(){
//   width = screen.width;
//   document.getElementById('top').innerHTML = width;
// }
// pegaWidth();

///////////////////////////////////////////////////
var users = [];
var divBot = document.createElement("div");
var audioUsersDiv = document.getElementById('audioCombo');

class Trilha {
  constructor(id, nome, criador, avatar, audio, videosrc, blob, trilhas) {
    this.id = id;
    this.nome = nome;
    this.criador = criador;
    this.avatar= avatar;
    this.audio = audio;
    this.videosrc = videosrc;
    this.blob = blob;
    this.trilhas =[];
    }
}
///////////////// classes cliente e sessao
class Cliente{
  constructor(id, nome, avatar, sessao, recBlob, recBlobs, msn, msns, sessoes,canais,trilhas) {
    this.id = id;
    this.nome = nome;
    this.avatar= avatar;
    this.sessao = sessao;
    this.recBlob = recBlob;
    this.recBlobs = [];
    this.msn = msn;
    this.msns = [];
    this.sessoes = sessoes;
    this.canais = [];
    this.trilhas =[];
    }
  }

////////////////////// classe sessao

class Sessao{
  constructor(id, nome, criador, clientes,  blobs, msns, canais ) {
    this.id = id;
    this.nome = nome;
    this.criador = criador;
    this.clientes = [];
    this.blobs = [];
    this.msns = [];
    this.canais = [];

   }
}

///////////// classe Canal
class Canal{
  constructor(id, tipo, audio, volume, video, audiosrc, videosrc, synth) {
    this.id = id;
    this.tipo = "audioSample";
    this.audio = audio;
    this.volume = volume;
    this.video = video;
    this.audiosrc = audiosrc;
    this.videosrc = videosrc;
    this.synth = synth;
   }
  }

class RecBlob {
  constructor(id, criador, avatar, blob, tipo, time) {
    this.id = id;
    this.criador = criador;
    this.avatar = avatar;
    this.blob = [];
    this.tipo = "audioSample";
    this.time = time;
   }
}

function dadosCanais(n){
  for (let i=0;i<=n;i++){
    let vl = document.getElementById('sld'+(i+1));
    let src = document.getElementById('menu'+(i+1));
    console.log("O criador "+ sessao.criador +" acabou de criar uma sessão!");
    let c = new Canal();
    c.volume = vl.value;
    c.audiosrc = src.value;
    sessao.canais.push(c);

   }
   console.log("Dados dos canais desta sessão: ");
   console.log(sessao);

}
/////////////////////
let sessoes = [];
let blobsSessao = [];
let clientes = [];
let canais = [];
var trilhaDisplay = new Trilha();
let sessao = new Sessao();
/// objeto para testar o JSON.stringify no servidor para receber objeto como string
let obje = {
  name:"som",
  apelido: "mané"
}

async function salvaSessao(){
  var botSessao = document.createElement("button");
  var nomeSessao = await prompt("Escolha um nome para sua sessão.");
  sessao.nome = nomeSessao;
  sessao.criador = cliente.nome;
  sessao.id = cliente.id;
  //sessao.blobs = blobsSessao;
  clientes.push(cliente);
  console.log("O cliente "+ cliente.nome+" acaba de salvar sua sessão.");
  sessao.clientes = arrayClientes;
  let logSessao = JSON.stringify(sessao, null, 4);
  console.log(logSessao);
  socket.emit('salvaSession', sessao);
  sessoes.push(sessao);
  dadosCanais(31);

  }



  let fileupl = document.getElementById('inputFile');


////////////////////////////
  function submitFile(){
    let f = document.getElementById('form');
    f.submit();
  }

function ativa(){
  fileupl.click();
}

// ////////usuário cliente
// var dataUser = {
//   Id:null,
//   recBlob: null,
//   src: null,
//   apelido:null,
//   users:null,
//   text:null,
//   link:null,
//   sessions:null
// };
//
// ////////// usuário externo
// var dataUserEx = {
//   Id:null,
//   recBlob: null,
//   src: null,
//   apelido:null,
//   users:null,
//   link:null,
//   sessions:null,
//   text:null
// };

let cliente = new Cliente();

let arrayClientes = [];
let botUsersArray = [];

///////////testes com localstorage para guardar dados do cliente se fechar aba ou browser reiniciar

function putInLocalStorage(el, dt){
  localStorage.setItem(el , JSON.stringify(dt));
  console.log("LocalStorage guardou esse elemento abaixo.");
  console.log(localStorage);
}
///////testando a função
// /////////////


//////////////////// site inicia e cria-se um cliente
async function criaUser(){
    var apelidoCliente = await prompt("Escolha um apelido de criador.");
    cliente.nome = apelidoCliente;
    putInLocalStorage('nome', JSON.stringify(cliente.nome));
    cliente.id = socket.id;
    let clienteData = cliente;
    clienteMode = true;
    socket.emit('entraCliente', clienteData);
    console.log("Cliente "+ cliente.nome+" entrou!");

    }



document.getElementById('metroDiv').onclick = function(){
  let obj = localStorage.getItem('nome');
  let no = JSON.parse(obj);
   console.log("Acabei de pegar no localStorage esses dados parciais da sessaõ.");
   console.log(no);
   typeof no;

};

/////////////////////////
function checaCliente(){
  if (cliente.nome == null)
    {
    criaUser();

  } else
    {
    alert("Você já configurou um criador!");
    }
}

///////////// variáveis para esconder os divs de galeriaClientes e chat na inicialização.
///// conexão com o servidor
function setup(){
    // createCanvas(800,650);
    // var users = [];
    // background(255);
    socket = io.connect(); // agora é o servidor local (offline-server.js)
    //socket = io.connect('https://colaborasom.uniriotec.br:443');
    /////  registra o ping
    // setInterval(function() {
    // startTime = performance.now();
    // socket.emit('ping');}, 1000);
    // socket.on('pong', function() {
    // var latency = performance.now() - startTime;
    // //console.log("A latência é de "+ latency + " milisegundos!");
    // });
    ////////////////retira a colaboração quasi síncrona//////////////////////////
    //socket.on('outrosom', newToca);
    //socket.on('outrosom2', newToca2);
    ///////////////////////////////////////////////
    socket.on('chatMsg', registraMsn);
    socket.on('newLink', botaLinkCl);
    socket.on('newLinkEx', botaLinkClEx)
    socket.on('recBlobEx', guardaAudioUserEx);
    ////// atualiza o array de clientes localmente recebendo o array do servidor
    socket.on('clientes', registraCls);
    /////// atualiza os apelidos dos clientes
    socket.on('upClientesNome', registraCls);
    ////atualiza os avatares dos clientes
    socket.on('upClientesAvatar', registraCls);
    ////atualiza os blobs dos clientes
    socket.on('upClientesBlob', registraCls);
    /// atualiza os clientes quando alguem sai da sessão
    socket.on('tiraCliente', registraCls);

    socket.on('trilhaEx', guardaTrilhaEx);
    ///funções que recebem trocas de sons nos menus de outros clientes.
    socket.on('trSom1Ex', trocaSom1Ex);
    socket.on('trSom2Ex', trocaSom2Ex);
    socket.on('trSom3Ex', trocaSom3Ex);
    socket.on('trSom4Ex', trocaSom4Ex);
    socket.on('trSom5Ex', trocaSom5Ex);
    socket.on('trSom6Ex', trocaSom6Ex);
    socket.on('trSom7Ex', trocaSom7Ex);
    socket.on('trSom8Ex', trocaSom8Ex);
    socket.on('trSom9Ex', trocaSom9Ex);
    socket.on('trSom10Ex', trocaSom10Ex);
    socket.on('trSom11Ex', trocaSom11Ex);
    socket.on('trSom12Ex', trocaSom12Ex);
    socket.on('trSom13Ex', trocaSom13Ex);
    socket.on('trSom14Ex', trocaSom14Ex);
    socket.on('trSom15Ex', trocaSom15Ex);
    socket.on('trSom16Ex', trocaSom16Ex);
    socket.on('trSom17Ex', trocaSom17Ex);
    socket.on('trSom18Ex', trocaSom18Ex);
    socket.on('trSom19Ex', trocaSom19Ex);
    socket.on('trSom20Ex', trocaSom20Ex);
    socket.on('trSom21Ex', trocaSom21Ex);
    socket.on('trSom22Ex', trocaSom22Ex);
    socket.on('trSom23Ex', trocaSom23Ex);
    socket.on('trSom24Ex', trocaSom24Ex);
    socket.on('trSom25Ex', trocaSom25Ex);
    socket.on('trSom26Ex', trocaSom26Ex);
    socket.on('trSom27Ex', trocaSom27Ex);
    socket.on('trSom28Ex', trocaSom28Ex);
    socket.on('trSom29Ex', trocaSom29Ex);
    socket.on('trSom30Ex', trocaSom30Ex);
    socket.on('trSom31Ex', trocaSom31Ex);
    socket.on('trSom32Ex', trocaSom32Ex);

  }


  ///////// função que cria o div com as gravações , textos e produções do criador em questão
      let clGravinas = document.getElementById('gravinas');
      function chamaMenuCliente(){
        let galeriaClientes = document.getElementById('galeriaClientes');
        galeriaClientes.style.display = "none";
        let galeriaClienteGravinas = document.getElementById('galeriaClienteGravinas');
        galeriaClienteGravinas.style.display = "flex";
        galeriaClienteGravinas.style.position = "absolute";
        let tituloCliente = document.getElementById('tituloCriador');
        tituloCliente.innerHTML = "Gravações";
        let clMnDownDiv = document.getElementById('clMenuDownDiv');
        //clMnDownDiv.style.display = "none";
        // let clMenuDownB1 = document.createElement('button');///// cria os botões de menu de cada cliente
        // clMenuDownB1.className = "clMenuDownBots";
        // clMenuDownB1.id = this.id;
        // clMenuDownB1.innerHTML = "Gravações";
        /////mostra o menu gravinas do respectivo cliente usando o seu id.
        // let clMenuDownB2 = document.createElement('button');
        // clMenuDownB2.className = "clMenuDownBots";
        // clMenuDownB2.innerHTML = "Mensagens";
        // let clMenuDownB3 = document.createElement('button');
        // clMenuDownB3.className = "clMenuDownBots";
        // clMenuDownB3.innerHTML = "Outros";
        // clMenuDownDiv.append(clMenuDownB1, clMenuDownB2, clMenuDownB3);
        achaCliente(this.id);
      }

// let g = document.getElementById('galeriaCriacoes');
// let menuAudioFiles = document.createElement('list');
// menuAudioFiles.className = "menuAudios";
// let titulomenuaudios = document.createElement('span');
// titulomenuaudios.innerHTML = "Gravações no servidor";
// titulomenuaudios.style = "align-self: center";
// g.appendChild(titulomenuaudios);
// g.appendChild(menuAudioFiles);

// function showAudiosList(audioFilesNames){
//   //let recAudioLib = document.createElement('list');
//   console.log(audioFilesNames);
//   //////cria a lista para servir como menu das gravaçõelse
//   audioFilesNames.forEach(item => {
//     let divCriacao = document.createElement('div');
//     divCriacao.className = "divCriacao";
//     let btCriacao = document.createElement('button');
//     btCriacao.className = "botClientesGravinas";
//     divCriacao.appendChild(btCriacao);
//     let capaUs = document.createElement('div');
//     capaUs.className = "capaUsCriacao";
//     let capatop = document.createElement('div');
//     capatop.className = "capaUsCriacaotop";
//     capaUs.appendChild(capatop);
//     divCriacao.appendChild(capaUs);
//     let option = document.createElement("option");
//     option.text = item;
//     option.style.display = "flex";
//     option.style.width = "80%";
//     option.style.height = "100%";
//     capatop.appendChild(option);
//     let btrash = document.createElement('span');
//     btrash.className = "bDelCria";
//     btrash.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
//     capatop.appendChild(btrash);
//     btrash.onclick = function(){divCriacao.remove();};
//     let audcr = document.createElement('audio');
//     audcr.className = "audCria";
//     audcr.controls = "true";
//     capaUs.appendChild(audcr);
//     menuAudioFiles.appendChild(divCriacao);
//   });
//   menuAudioFiles.style.display = "flex";
//   console.log("Aqui estão os arquivos de audio da pasta de usersBlobs do servidor.");
//   console.log(menuAudioFiles);
//
// }


///// resolver isso!!!
function achaCliente(id){
  for (var i = arrayClientes.length - 1; i >= 0; --i) {
    if (arrayClientes[i].id == id) {
        botaBotClienteGravinas(arrayClientes[i].recBlobs, clGravinas, arrayClientes[i]);
       }
     }
}

/////////função para colocar botões para as gravaçoes de um cliente
function botaBotClienteGravinas(arry, div, data){
  div.innerHTML ="";
  let z = 0;
  for (var i = 0; i <= arry.length - 1; ++i) {
    z +=1;
    let bDiv = document.createElement('div');
     bDiv.className = "bDivGravina";
     let bGravina = document.createElement('button');
     bGravina.className = "botClientesGravinas";
     let im = document.createElement('img');
     im.src="imgs/icons/"+ data.avatar +".png";
     im.className = "imageIconsGravinas";
     bGravina.append(im);
     let n = document.createElement('span');
     n.className = "nomeGravina";
     n.innerHTML = data.nome + " - Gravação"+z;
     bDiv.append(bGravina);
     var delIcon = document.createElement('span');
     delIcon.className ="bDelGravina";
     delIcon.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
     delIcon.onclick = function(){bDiv.remove();};
     n.append(delIcon);
     let clAudDiv = document.createElement('div');//div que contem o nome do clientee o audio element
     clAudDiv.className = "clAudDiv";
     clAudDiv.append(n);
     const blob = new Blob([arry[i]], { type: "audio/ogg" });
     var audioClGravina = document.createElement('audio');
     audioClGravina.className = "audGravinas";
     audioClGravina.id="aud"+data.id;
     audioClGravina.controls = true;
     audioClGravina.loop = true;
     audioClGravina.src = URL.createObjectURL(blob);
     clAudDiv.append(audioClGravina);
     bDiv.append(clAudDiv);
     div.append(bDiv);
    }

  }


//// registra as mudanças nos clientes de uma sessão
function registraCls(clientes){
  console.log("Temos os seguintes clientes logados neste momento no array clientes: ");
  arrayClientes = clientes;
  console.log(arrayClientes);
  atualizaClientes(arrayClientes);
  atualizaNomes(arrayClientes);
  atualizaAvatars(arrayClientes);
  atualizaBlobs(arrayClientes);

}
/////teste de edição de avatar no cliente
function testa(avatarId){
  cliente.avatar = avatarId;
  console.log(cliente.avatar);
}


//// togle effect no metro bot
function scaleElem(){
  let metrobot = document.getElementById('metroOnOffBot');
  metrobot.style.transform = "scale(0.85)";
  setTimeout(function(){metrobot.style.transform = "scale(1)"}, 100);
}


/////////////função para acionar os botões da classe icones usando jquery


let divChatBot, divHomeBot, divCriasomBot, divCriaTrilhaBot;

divHomeBot = document.getElementById('divHome');


//////////////////////////////////////////////////// div que recebe os clientes e apresenta como galeria
var footer = document.getElementById('footer');
  ////////////////////////////////////////////

// função para colocar elementos em um divs

function colocaElemento(el, div){
  div.append(el);
}



////////////// função para atualizar os clientes ao entrar na sessao

function botaBotClientes(arr, div){
  div.innerHTML ="";
  for (var i = arr.length - 1; i >= 0; --i) {
     let divBcliente = document.createElement('div');
     divBcliente.className = "divBcliente";
     let b = document.createElement('button');
     b.className="botClientes";
     b.id = arr[i].id;
     b.name = arr[i].nome;
     b.onclick = chamaMenuCliente;
     let im = document.createElement('img');
     im.className = "imageIcons";
     im.src = "imgs/icons/"+arr[i].avatar+".png";
     im.style.display = "flex";
     let n = document.createElement('span');
     n.className = "nome";
     n.innerHTML = arr[i].nome;
     n.style.display="flex";
     b.appendChild(im);
     divBcliente.appendChild(b);
     divBcliente.appendChild(n);
     div.append(divBcliente);
    }

}


function botaBotClientesNome(arr, div){
  div.innerHTML ="";
  for (var i = arr.length - 1; i >= 0; --i) {
     let divBcliente = document.createElement('div');
     divBcliente.className = "divBcliente";
     let b = document.createElement('button');
     b.className="botClientes";
     b.id = arr[i].id;
     b.name = arr[i].nome;
     b.onclick = chamaMenuCliente;
     let im = document.createElement('img');
     im.className = "imageIcons";
     im.src = "imgs/icons/"+ cliente.avatar +".png";
     let n = document.createElement('span');
     n.className = "nome";
     n.innerHTML = arr[i].nome;
     n.style.display="flex";
     b.appendChild(im);
     divBcliente.appendChild(b);
     divBcliente.appendChild(n);
     div.append(divBcliente);
    }

  }


function botaBotClientesAvatar(arr, div){
  div.innerHTML ="";
  for (var i = arr.length - 1; i >= 0; --i) {
     let divBcliente = document.createElement('div');
     divBcliente.className = "divBcliente";
     let b = document.createElement('button');
     b.name = arr[i].nome;
     b.className="botClientes";
     b.id = arr[i].id;
     b.onclick = chamaMenuCliente;
     let im = document.createElement('img');
     im.className = "imageIcons";
     im.style.display = "flex";
     im.src = "imgs/icons/"+ arr[i].avatar +".png";
     let n = document.createElement('h1');
     n.className = "nome";
     n.innerHTML = arr[i].nome;
     b.appendChild(im);
     divBcliente.appendChild(b);
     divBcliente.appendChild(n);
     div.append(divBcliente);
    }

    }
////////////////


//função para colocar botões para cada gravação no menu de gravações de cada cliente
function botaBotClientesBlob(arr, div, data){
  div.innerHTML ="";
  for (var i = arr.length - 1; i >= 0; --i) {
    if (arr[i].id = data.id){
      let divBcliente = document.createElement('div');
      divBcliente.className = "divBcliente";
      let b = document.createElement('button');
      b.name = arr[i].nome;
      b.className="botClientes";
      b.id = arr[i].id;
      b.onclick = function(){console.log("Apertou um blob!")};
      let im = document.createElement('img');
      im.className = "imageIcons";
      im.style.display = "flex";
      im.src = "imgs/icons/notamusicalAlfa.png";
      let n = document.createElement('h1');
      n.className = "nome";
      n.innerHTML = arr[i].nome;
      b.appendChild(im);
      divBcliente.appendChild(b);
      divBcliente.appendChild(n);
      div.append(divBcliente);
      console.log(arr[i].recBlobs);
      };

    }

}



/////////////
  function atualizaClientes(clientes){
    console.log("Atualizou o array de clientes no servidor!");
    arrayClientes = clientes;
    botaBotClientes(clientes, footer);

  }

  /////////// troca o nome do cliente
      function atualizaNomes(clientes){
      //  console.log("Atualizou o array de clientes no servidor!");
        botaBotClientesNome(clientes, footer);
        botaBotClientesAvatar(clientes, footer);

      }

    function atualizaAvatars(clientes){
      botaBotClientesNome(clientes, footer);
      botaBotClientesAvatar(clientes, footer);
      //console.log("Atualizou o array de clientes no servidor!");
      console.log(clientes);

    }

    function atualizaBlobs(clientes){
      botaBotClientesNome(clientes, footer);
      botaBotClientesAvatar(clientes, footer);
      console.log("Atualizou o array de clientes no servidor!");
      console.log(clientes);

    }





let galeriaClientes = document.getElementById('galeriaClientes');
//função que fecha a janela parente do elemento clicado

function fechaJanelaCriadores(){
  console.log(galeriaClientes);
}

function fechaJanelaClienteMenuGravinas(){
  galeriaClientes.style.display="flex";
  let b = document.getElementById('botFechaClienteMenuGravinas');
  b.style.display = "flex";
  console.log("Fechei o menu gravinas");
  document.getElementById('botFechaClientesMenu').style.display = "flex";
}

function fechaJanelaSessões(){
  let divSess = document.getElementById('');
}

function fechaJanelaChat(){
  let chatDiv = document.getElementById('chat');
  chatDiv.style.display = "none";
}

function fechaJanelaCriações(){
  galeriaCriacoes.style.display = "none";
}

function fechaJanelaIcones(){
  let iconsDiv = document.getElementById('clientIconGaleria');
  iconsDiv.style.display = "none";
}

function fechaJanelaTrilhaSonora(){
  let trilhaDiv = document.getElementById('trilhasPage');
  iconsDiv.style.display = "none";
}


function checaSeToca(data){
  console.log(data);
  let ide = "aud"+ data;
  let ad = document.getElementById(ide);
  console.log(ad);

  // if (!a.paused){
  //   console.log("Audio está tocando no momento!");
  // } else {
  //   console.log("Agora está pausado o audio!");
  //
  // }

}

var myAudio = document.getElementById('myAudioID');


//////////// função para procurar por elementos de uma natureza em um parent divs

function pegaElementos(el){
  let arr = document.querySelectorAll(el);
  console.log("Audio foi produzido!");
  console.log(arr);
}

    ///// função que troca o icon do user no avatar
    $(document).ready(function(){
      $(".icons").click(function(){
        let nome = document.createElement('h1');
        nome.style.fontSize = "10px";
        nome.innerHTML = cliente.nome;
        cliente.avatar = this.name;
        let clienteD = cliente;
        socket.emit('updateAvatar', clienteD);
        console.log(clienteD);
        console.log("o cliente "+ cliente.nome+" foi atualizado!");
        putInLocalStorage('avatar', JSON.stringify(this.name));
      });

      $("#metroDiv").click(function(){
        console.log("eita!");
        let m1 = $("#metroSld").val();
        metronome.tempo = m1;
        //console.log(m1);
      });


    });

/////////// econde o div que tem os menuVideos
let mostra = true;
let audioMode = true;
let bTroca;////////////////botão que troca o mode audio para silêncio ou audio - modo de texto sem som ao pressionar teclas do teclado/////////
let midtopDir = document.getElementById('midtopDir');

// function setAudioMode(){
//  let vid = document.getElementById('videoCombo');
//  midtopDir.appendChild(vid);
// }
//
// setAudioMode();

// function trocaVideoAudio(){
//   audioUsersDiv = document.getElementById('audioCombo');
//   let bMenuVideo = document.getElementById('menuVideos');
//   let bVideo = document.getElementById('videoPlayer');
//   midtopDir.appendChild(bMenuVideo);
//   midtopDir.appendChild(bVideo);
//   console.log("porra!");
//   midtopDir.appendChild(audioUsersDiv);
//
//   }

  // jQuery methods go here...

///////////////////////////////////////////////////
let userContadorEx=0;
//////////////recebe audio de outro cliente externo e salva no div users
function guardaAudioUserEx(clienteData){
  ctx.resume();
  const blobEx = new Blob([clienteData.recBlob], { type: "audio/ogg" });
  var audUserEx = document.createElement('audio');
  audUserEx.className = "audUser";
  audUserEx.controls = true;
  audUserEx.id = "audUserEx";
  audUserEx.loop = true;
  audUserEx.src = URL.createObjectURL(blobEx);
  console.log("Acabei de receber audio blob do usuário:"+ clienteData.nome);
  console.log(audUserEx);
////////////////////////
////////// cria o div que recebe o audio e tem botão delete e butão com o nome do criador externo
  var usExDiv = document.createElement('div');
  usExDiv.className = "usExDiv";
  var capaUsExDiv = document.createElement('div');
  capaUsExDiv.id = "capaUsDiv";
  var usExBot = document.createElement('button');
  usExBot.className = "usBot";
  var delExBot = document.createElement('button');
  delExBot.className = "bDel";
  delExBot.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
  delExBot.onclick = function(){usExDiv.remove();};
  userContadorEx += 1;
  usExBot.innerHTML = clienteData.nome+ "</br> Gravação "+ userContadorEx;
  capaUsExDiv.append(usExBot, delExBot);
  usExDiv.append(capaUsExDiv, audUserEx);
  var midtopDir = document.getElementById('midtopDir');
  audioUsersDiv = document.getElementById('audioCombo');
  audioUsersDiv.append(usExDiv);


/////

  ////////// cria a track do cliente externo web audio api que se conecta no gravador
  var trackUsEx = ctx.createMediaElementSource(audUserEx);
  trackUsEx.connect(ctx.destination);
  trackUsEx.connect(dest);

}
//////////
function showTrilhaServ(){
  let jsn;
  fetch("./trilhas/a1_trilhaSonora1.json")
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.warn("Trilha de exemplo não encontrada:", err))
  }




//////////////
var userTrilhaExContador = 0;
function guardaTrilhaEx(trEx){
  console.log(trEx);
  let audTUserEx = document.createElement('audio');
  let trilhaEx = new Trilha();
  const blobTrilhaEx = new Blob([trEx.blob], { type: "audio/ogg" });
  trilhaEx.videosrc = trEx.videosrc;
  trilhaEx.criador = trEx.criador;
  trilhaEx.blob = trEx.blob;
  audTUserEx.src = URL.createObjectURL(blobTrilhaEx);
  // var trackUs = ctx.createMediaElementSource(audTUserEx);
  // trackUs.connect(ctx.destination);
  // trackUs.connect(dest);
  audTUserEx.controls = true;
  audTUserEx.loop = false;
  userTrilhaExContador+=1;
  console.log(cliente.nome +" Acabou de receber trilha sonora de "+trilhaEx.criador+" !");
  ////////////////// cria div para o botão do usuário e blob rec  wave
  var audioUsersDiv = document.getElementById('divTrilhaGaleria');
  let trilhaIconEx = document.createElement('img');
  trilhaIconEx.src = "./imgs/trilhaAlfa100.png";
  var usDivTrEx = document.createElement('div');
  var capaUsDivTrEx = document.createElement('div');
  capaUsDivTrEx.className= "capaUsTrilhaDiv";
  usDivTrEx.className = "usTrilhaDiv";
  usDivTrEx.id = "usDivTrEx"+ userTrilhaExContador;
  var usBotTrEx = document.createElement('button');
  usBotTrEx.className = "usBot";
  audTUserEx.className = "audUser";
  audTUserEx.style = "display:none";
  audTUserEx.id = "audTUserEx"+userTrilhaExContador;
  usBotTrEx.innerHTML = trilhaEx.criador + " </br> Trilha " + userTrilhaExContador;
  var botDeleteTrEx = document.createElement('button');
  botDeleteTrEx.className ="bDel";
  botDeleteTrEx.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
  capaUsDivTrEx.append(usBotTrEx);
  capaUsDivTrEx.append(trilhaIconEx);
  capaUsDivTrEx.append(botDeleteTrEx);
  usDivTrEx.append(capaUsDivTrEx);
  usDivTrEx.append(audTUserEx);
  botDeleteTrEx.onclick = function(){usDivTrEx.remove();};
  audioUsersDiv.append(usDivTrEx);
  trilhaIconEx.onclick = function(){playTrilha(audTUserEx, trilhaEx.videosrc);};

}

// function playTrilhaEx(audEx, vsrc){
//   let videobase = document.getElementById('videoBase');
//   videobase.src = "./videos/"+vsrc+".webm";
//   videobase.volume = 0;
//   showDivTrilhaSonora();
//   videobase.play();
//   audEx.play();
//
// }

// const setRandomButtonColor = (id) => {
// const randomColor = Math.floor(Math.random()*16777215).toString(16);
// document.getElementById(id).style.backgroundColor = "#"+ randomColor;
// user.hx = randomColor;
//
// }

///////////////
//
// function updateUsersDiv(user){
// console.log("Chegou coisa do usuário :"+ user.apelido);
// document.getElementById('usersDiv').innerHTML += "<button id ="+ user.id + " Style= background:#" + user.hx + ">"+ user.apelido +
// "<p> "+ user.nomeMix + "</p></button><audio ></audio>";
// console.log("#"+ user.hx  );
// users.push(user);
// }
/////////////  frases para o inicio do Tutorial
// var frases = {
//   k1:'Vamos fazer um som?',
//   k2:'Mesmo à distância?',
//   k3:'Sim!',
//   k4:'Existe um som para cada um dos 16 canais de áudio deste site.',
//   k5:'Divirta-se criando colaborativamente composições sonoras e musicais com seus amigos.',
//   k6:'E faça novas amizades!'
// };
///////////////



function showHome(){
  let homeDiv = document.getElementById("home");
  tiraJanelas();
  var displayHome = window.getComputedStyle(homeDiv).display;
  if (displayHome === "none") {
      homeDiv.style.display = "flex";
      homeDiv.style.position = "absolute";

  } else {
      homeDiv.style.display = "none";

  }
  console.log('Voltou pra Home!');
}

////////// função para mostrar os divs dos clientes e do chat

var galeriaGravinas = document.getElementById('galeriaCriacoes');

//////////função para retirar (dsplay:none) as janelas auxiliares
function tiraJanelas(){
  [].forEach.call(document.querySelectorAll('.auxJanelas'), function (el) {
    el.style.display = 'none';
  });
}

function tiraDivClientesMenu(){
  [].forEach.call(document.querySelectorAll('.auxJanelas'), function (el) {
    el.style.display = 'none';
});
}

function tiraDivArtefatos(){
  [].forEach.call(document.querySelectorAll('.canaisDiv'), function (el) {
    el.style.display = 'none';
  });
}
///////// funções para mostrar os divs de canais de cada artefato
let divArt1 = document.getElementById('canaisDiv1');
function showArt1(){
escondeDiv();
 var displaydivArt1 = window.getComputedStyle(divArt1).display;
 if (displaydivArt1 === "none") {
     tiraDivArtefatos();
     divArt1.style.display = "flex";


   } else {
            // tiraDivArtefatos();
           }

}

///////////função de mostrar os canais do artefato 2
let divArt2 = document.getElementById('canaisDiv2');
function showArt2(){
escondeDiv();
 var displaydivArt2 = window.getComputedStyle(divArt2).display;
 if (displaydivArt2 === "none") {
     tiraDivArtefatos();
     divArt2.style.display = "flex";


   } else {
            // tiraDivArtefatos();
           }

}




///////////função para mostrar o div dos clientes nas galerias.

function showClientes(){
 var displayGaleriaClientes = window.getComputedStyle(galeriaClientes).display;
 if (displayGaleriaClientes === "none") {
     tiraJanelas();
     galeriaClientes.style.display = "flex";
     galeriaClientes.style.position = "absolute";
     galeriaGravinas.style.display = "none";
     footer.style.display = "flex";

   } else {
            tiraJanelas();
           }

}

let galeriaSessões = document.getElementById('divSessões');

function showSessões(){
  var displayGaleriaSessões = window.getComputedStyle(galeriaSessões).display;
  if (displayGaleriaSessões === "none") {
      tiraJanelas();
      galeriaSessões.style.display = "flex";
      galeriaSessões.style.position = "absolute";
      galeriaSessões.style.display = "none";

    } else {
             tiraJanelas();
            }
}

function showGravinas(){
 var displayGaleriaGravinas = window.getComputedStyle(galeriaGravinas).display;
 if (displayGaleriaGravinas === "none") {
     tiraJanelas();
     galeriaGravinas.style.display = "flex";
     galeriaGravinas.style.position = "absolute";

     } else
      {
       tiraJanelas();
       }

}

function showdivChat() {
    var divChat = document.getElementById("chat");
    var displaydivchat = window.getComputedStyle(divChat).display;
    if (displaydivchat === "none") {
        tiraJanelas();
        divChat.style.display = "flex";
        divChat.style.position = "absolute";

    } else {
        tiraJanelas();
    }
}


function showDivIcons() {
    var clienteIconGaleria = document.getElementById("clientIconGaleria");
    var displayclienteIcGal = window.getComputedStyle(clienteIconGaleria).display;
    if (displayclienteIcGal === "none") {
      tiraJanelas();
      clienteIconGaleria.style.display = "flex";
      clienteIconGaleria.style.position = "absolute";

    } else {
      tiraJanelas();
    }
  console.log("teste divicons!!");
}

let icons = document.getElementsByClassName('icons');

function showDivMetronomo() {
    var metroDiv= document.getElementById("metroDiv");
    var displaymetroDiv = window.getComputedStyle(metroDiv).display;
    if (displaymetroDiv === "none") {
      tiraJanelas();
      metroDiv.style.display = "flex";
      metroDiv.style.position = "absolute";

    } else {
      tiraJanelas();
    }
  console.log("teste metrodiv!!");
}

////////////////////////////// função para enviar msns do cliente para o chat
////////////


function showdivCriadores() {
    var divChat = document.getElementById("chat");
    var displaydivchat = window.getComputedStyle(divChat).display;
    if (displaydivchat === "none") {
        tiraJanelas();
        divChat.style.display = "flex";
        divChat.style.position = "absolute";

    } else {
        tiraJanelas();
    }
}

//////////
function showDivTrilhaSonora() {
    trilhaRecMode = true;
    var divTrilha = document.getElementById('divTrilhaSonora');
    var displaydivTrilha = window.getComputedStyle(divTrilha).display;
    if (displaydivTrilha === "none") {
        tiraJanelas();
        divTrilha.style.display = "flex";
    } else {
        tiraJanelas();
    }
}

function tiraDivTrilha(){
  tiraJanelas();
  trilhaRecMode=false;
  audioPlaying=true;
}

////////////////
function sendChatMsn(){

var clMsn = null;
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = date+' '+time;
clMsn = document.getElementById('textArea').value;   //////////////////////////////// edição aqui para textArea
if (cliente.nome == null)
  {
  criaUser();
  clienteMode = true;
  } else
  {
    cliente.msn = clMsn;
    let mensagem = {
      hora: dateTime,
      nome: cliente.nome,
      texto: clMsn,
    }
    cliente.msns.push(mensagem);
    sessao.msns.push(mensagem);
    //////// cria a caixa de mensagens que recebe os divchatmsns de todos os usuários
    let msnBox = document.getElementById('msnBox');
    //msnBox.append(divChatMsn);
    msnBox.innerHTML += cliente.nome + ': ' + cliente.msn + '</br>' + dateTime + '</br>'+ '</br>';
    //document.getElementById('msnBox').innerHTML += dataUser.apelido + " : " + dataUser.text + "</br>"+dateTime+"</br></br>";
    let clMensagem = mensagem;
    socket.emit('chatMsg', clMensagem);
    cliente.msn = '';
    document.getElementById('textArea').value = '';
    document.getElementById('textArea').focus();
    console.log("o cliente "+cliente.nome+" tem as seguintes mensagens escritas: ");
    console.log(cliente.msns);
  }
}


async function sendLink(){
    let lk = await prompt("Copie seu link aqui.");
    socket.emit('mandaLinkCl', lk);

  }
////////// função que recebe links do servidor para atualizar as msns do cliente no chat
function botaLinkCl(lin){
  let a = document.createElement('a');
  a.href = lin;
  a.innerHTML = lin;
  a.target="_blank"
  document.getElementById('msnBox').appendChild(a);
  document.getElementById('msnBox').innerHTML+= '<br>';
  console.log("link criado!");
  console.log(lin);
}

////////// função que recebe links do servidor para atualizar as msns do cliente externo no chat
function botaLinkClEx(linEx){
  let ax = document.createElement('a');
  ax.href = linEx;
  ax.innerHTML = linEx;
  ax.target="_blank"
  document.getElementById('msnBox').appendChild(ax);
  document.getElementById('msnBox').innerHTML+= '<br>';
  console.log("link criado!");
  console.log(linEx);
}
/////////////////////
// function sendChatLink(){
// dataUser.link = document.getElementById('userMsn').value;
// document.getElementById('msnBox').innerHTML += "<a= href:></a>";
// socket.emit('chatMsg', dataUser);
// dataUser.text = '';
// document.getElementById('userMsn').value = '';
//
// }

/////// ao receber mensagens dos clientes ex e registra na lista de msns
  function registraMsn(clMensagem){
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;
    let clExMsn = clMensagem;
    sessao.msns.push(clExMsn);
    document.getElementById('msnBox').innerHTML += clExMsn.nome + ': ' + clExMsn.texto + '</br>' + dateTime + '</br>'+ '</br>';

  //msnBox.append(divChatMsn);
}


/////////////// trocar cor do bot quando pressiona botão de som.

// $(document).ready(function(){
//   $('.playBots').on('click', trocaCorBot);
// });

/////////////troca de som canal 1 pelo cliente
function trocaSom1(){
src1 = document.getElementById('menu1').value;
let sr1 = src1;
fetch("./sons/"+ src1 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio1 = decodedAudio;
    });
    document.getElementById('pb1').focus();
    socket.emit('trocaSom1', sr1);
}

/////////////troca de som canal 1 por um cliente externo na sessão

function trocaSom1Ex(sr1){
document.getElementById('menu1').value = sr1;
console.log(sr1);
fetch("./sons/"+ sr1 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio1 = decodedAudio;
    });
    document.getElementById('pb1').focus();
}

///////////toca de som canal 2

function trocaSom2(){
src2 = document.getElementById('menu2').value;
let sr2 = src2;
console.log(src2);
fetch("./sons/"+ src2 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio2 = decodedAudio;
    });
 document.getElementById('pb2').focus();
 socket.emit('trocaSom2', sr2);
}

/////////////troca de som canal 2 por um cliente externo na sessão

function trocaSom2Ex(sr2){
document.getElementById('menu2').value = sr2;
console.log(sr2);
fetch("./sons/"+ sr2 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio2 = decodedAudio;
    });
    document.getElementById('pb2').focus();
}

function trocaSom3(){
src3 = document.getElementById('menu3').value;
let sr3 = src3;
fetch("./sons/"+ src3 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio3 = decodedAudio;
    });
    document.getElementById('pb3').focus();
    socket.emit('trocaSom3', sr3);
}

function trocaSom3Ex(sr3){
document.getElementById('menu3').value = sr3;
console.log(sr3);
fetch("./sons/"+ sr3 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio3 = decodedAudio;
    });
    document.getElementById('pb3').focus();
}

function trocaSom4(){
src4 = document.getElementById('menu4').value;
let sr4 = src4;
console.log(src4);
fetch("./sons/"+ src4 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio4 = decodedAudio;
    });
    document.getElementById('pb4').focus();
    socket.emit('trocaSom4', sr4);
}

function trocaSom4Ex(sr4){
document.getElementById('menu4').value = sr4 ;
console.log(sr4);
fetch("./sons/"+ sr4 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio4 = decodedAudio;
    });
    document.getElementById('pb4').focus();
}

function trocaSom5(){
src5 = document.getElementById('menu5').value;
let sr5 = src5;
console.log(src5);
fetch("./sons/"+ src5 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio5 = decodedAudio;
    });
    document.getElementById('pb5').focus();
    socket.emit('trocaSom5', sr5);
}

function trocaSom5Ex(sr5){
document.getElementById('menu5').value = sr5;
console.log(sr5);
fetch("./sons/"+ sr5 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio5 = decodedAudio;
    });
    document.getElementById('pb5').focus();
}


function trocaSom6(){
src6 = document.getElementById('menu6').value;
let sr6 = src6;
console.log(src6);
fetch("./sons/"+ src6 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio6 = decodedAudio;
    });
    document.getElementById('pb6').focus();
    socket.emit('trocaSom6', sr6);
}

function trocaSom6Ex(sr6){
document.getElementById('menu6').value= sr6;
console.log(sr6);
fetch("./sons/"+ sr6 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio6 = decodedAudio;
    });
    document.getElementById('pb6').focus();
}


function trocaSom7(){
src7 = document.getElementById('menu7').value;
let sr7 = src7;
console.log(src7);
fetch("./sons/"+ src7 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio7 = decodedAudio;
    });
    document.getElementById('pb7').focus();
    socket.emit('trocaSom7', sr7);
}

function trocaSom7Ex(sr7){
document.getElementById('menu7').value= sr7  ;
console.log(sr7);
fetch("./sons/"+ sr7 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio7 = decodedAudio;
    });
    document.getElementById('pb7').focus();
}


function trocaSom8(){
src8 = document.getElementById('menu8').value;
let sr8 = src8;
console.log(src8);
fetch("./sons/"+ src8 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio8 = decodedAudio;
    });
    document.getElementById('pb8').focus();
    socket.emit('trocaSom8', sr8);
}

function trocaSom8Ex(sr8){
document.getElementById('menu8').value= sr8;
console.log(sr8);
fetch("./sons/"+ sr8 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio8 = decodedAudio;
    });
    document.getElementById('pb8').focus();
}


function trocaSom9(){
src9 = document.getElementById('menu9').value;
let sr9 = src9;
console.log(src9);
fetch("./sons/"+ src9 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio9 = decodedAudio;
    });
    document.getElementById('pb9').focus();
    console.log(sr9);
    socket.emit('trocaSom9', sr9);
}

function trocaSom9Ex(sr9){
document.getElementById('menu9').value= sr9 ;
console.log(sr9);
fetch("./sons/"+ sr9 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio9 = decodedAudio;
    });
    document.getElementById('pb9').focus();
}


function trocaSom10(){
src10 = document.getElementById('menu10').value;
let sr10 = src10;
console.log(src10);
fetch("./sons/"+ src10 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio10 = decodedAudio;
    });
    document.getElementById('pb10').focus();
    socket.emit('trocaSom10', sr10);
}

function trocaSom10Ex(sr10){
 document.getElementById('menu10').value= sr10 ;
console.log(sr10);
fetch("./sons/"+ sr10 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio10 = decodedAudio;
    });
    document.getElementById('pb10').focus();
}


function trocaSom11(){
src11 = document.getElementById('menu11').value;
let sr11 = src11;
console.log(src11);
fetch("./sons/"+ src11 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio11 = decodedAudio;
    });
    document.getElementById('pb11').focus();
    socket.emit('trocaSom11', sr11);
}

function trocaSom11Ex(sr11){
 document.getElementById('menu11').value = sr11;
console.log(sr11);
fetch("./sons/"+ sr11 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio11 = decodedAudio;
    });
    document.getElementById('pb11').focus();
}

function trocaSom12(){
src12 = document.getElementById('menu12').value;
let sr12 = src12;
console.log(src12);
fetch("./sons/"+ src12 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio12 = decodedAudio;
    });
    document.getElementById('pb12').focus();
    socket.emit('trocaSom12', sr12);
}

function trocaSom12Ex(sr12){
document.getElementById('menu12').value = sr12 ;
console.log(sr12);
fetch("./sons/"+ sr12 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio12 = decodedAudio;
    });
    document.getElementById('pb12').focus();
}

function trocaSom13(){
src13 = document.getElementById('menu13').value;
let sr13 = src13;
console.log(src13);
fetch("./sons/"+ src13 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio13 = decodedAudio;
    });
    document.getElementById('pb13').focus();
    socket.emit('trocaSom13', sr13);
}

function trocaSom13Ex(sr13){
document.getElementById('menu13').value = sr13;
console.log(sr13);
fetch("./sons/"+ sr13 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio13 = decodedAudio;
    });
    document.getElementById('pb13').focus();
}

function trocaSom14(){
src14 = document.getElementById('menu14').value;
let sr14 = src14;
console.log(src14);
fetch("./sons/"+ src14 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio14 = decodedAudio;
    });
    document.getElementById('pb14').focus();
    socket.emit('trocaSom14', sr14);
}

function trocaSom14Ex(sr14){
document.getElementById('menu14').value=sr14;
console.log(sr14);
fetch("./sons/"+ sr14 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio14 = decodedAudio;
    });
    document.getElementById('pb14').focus();
}


function trocaSom15(){
src15 = document.getElementById('menu15').value;
let sr15 = src15;
console.log(src15);
fetch("./sons/"+ src15 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio15 = decodedAudio;
    });
    document.getElementById('pb15').focus();
    socket.emit('trocaSom15', sr15);
}

function trocaSom15Ex(sr15){
document.getElementById('menu15').value= sr15;
console.log(sr15);
fetch("./sons/"+ sr15 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio15 = decodedAudio;
    });
    document.getElementById('pb15').focus();
}

function trocaSom16(){
src16 = document.getElementById('menu16').value;
let sr16 = src16;
console.log(src16);
fetch("./sons/"+ src16 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio16 = decodedAudio;
    });
    document.getElementById('pb16').focus();
    socket.emit('trocaSom16', sr16);
}

function trocaSom16Ex(sr16){
document.getElementById('menu16').value= sr16;
console.log(sr16);
fetch("./sons/"+ sr16 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio16 = decodedAudio;
    });
    document.getElementById('pb16').focus();
}

function trocaSom17(){
src17 = document.getElementById('menu17').value;
let sr17 = src17;
console.log(src17);
fetch("./sons/"+ src17 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio17 = decodedAudio;
    });
    document.getElementById('pb17').focus();
    console.log(sr17);
    socket.emit('trocaSom17', sr17);
}

function trocaSom17Ex(sr17){
console.log("Trocaram canal 17 o som para:"+sr17);
document.getElementById('menu17').value= sr17;
fetch("./sons/"+ sr17 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio17 = decodedAudio;
    });
    document.getElementById('pb17').focus();
}

function trocaSom18(){
src18 = document.getElementById('menu18').value;
let sr18 = src18;
console.log(src18);
fetch("./sons/"+ src18 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio18 = decodedAudio;
    });
    document.getElementById('pb18').focus();
    socket.emit('trocaSom18', sr18);
}

function trocaSom18Ex(sr18){
document.getElementById('menu18').value= sr18;
console.log(sr18);
fetch("./sons/"+ sr18 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio18 = decodedAudio;
    });
    document.getElementById('pb18').focus();
}

function trocaSom19(){
src19 = document.getElementById('menu19').value;
let sr19 = src19;
console.log(src19);
fetch("./sons/"+ src19 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio19 = decodedAudio;
    });
    document.getElementById('pb19').focus();
    socket.emit('trocaSom19', sr19);
}

function trocaSom19Ex(sr19){
document.getElementById('menu19').value= sr19;
console.log(sr19);
fetch("./sons/"+ sr19 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio19 = decodedAudio;
    });
    document.getElementById('pb19').focus();
}

function trocaSom20(){
src20 = document.getElementById('menu20').value;
let sr20 = src20;
console.log(src20);
fetch("./sons/"+ src20 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio20 = decodedAudio;
    });
    document.getElementById('pb20').focus();
    socket.emit('trocaSom20', sr20);
}

function trocaSom20Ex(sr20){
document.getElementById('menu20').value= sr20;
console.log(sr20);
fetch("./sons/"+ sr20 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio20 = decodedAudio;
    });
    document.getElementById('pb20').focus();
}

function trocaSom21(){
src21 = document.getElementById('menu21').value;
let sr21 = src21;
console.log(src21);
fetch("./sons/"+ src21 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio21 = decodedAudio;
    });
    document.getElementById('pb21').focus();
    socket.emit('trocaSom21', sr21);
}

function trocaSom21Ex(sr21){
document.getElementById('menu21').value= sr21;
console.log(sr21);
fetch("./sons/"+ sr21 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio21 = decodedAudio;
    });
    document.getElementById('pb21').focus();
}

function trocaSom22(){
src22 = document.getElementById('menu22').value;
let sr22 = src22;
console.log(src22);
fetch("./sons/"+ src22 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio22 = decodedAudio;
    });
    document.getElementById('pb22').focus();
    socket.emit('trocaSom22', sr22);
}

function trocaSom22Ex(sr22){
document.getElementById('menu22').value= sr22;
console.log(sr22);
fetch("./sons/"+ sr22 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio22 = decodedAudio;
    });
    document.getElementById('pb22').focus();
}

function trocaSom23(){
src23 = document.getElementById('menu23').value;
let sr23 = src23;
console.log(src23);
fetch("./sons/"+ src23 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio23 = decodedAudio;
    });
    document.getElementById('pb23').focus();
    socket.emit('trocaSom23', sr23);
}

function trocaSom23Ex(sr23){
document.getElementById('menu23').value= sr23;
console.log(sr23);
fetch("./sons/"+ sr23 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio23 = decodedAudio;
    });
    document.getElementById('pb23').focus();
}

function trocaSom24(){
src24 = document.getElementById('menu24').value;
let sr24 = src24;
console.log(src24);
fetch("./sons/"+ src24 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio24 = decodedAudio;
    });
    document.getElementById('pb22').focus();
    socket.emit('trocaSom24', sr24);
}

function trocaSom24Ex(sr24){
document.getElementById('menu24').value= sr24;
console.log(sr24);
fetch("./sons/"+ sr24 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio24 = decodedAudio;
    });
    document.getElementById('pb24').focus();
}

function trocaSom25(){
src25 = document.getElementById('menu25').value;
let sr25 = src25;
console.log(src25);
fetch("./sons/"+ src25 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio25 = decodedAudio;
    });
    document.getElementById('pb25').focus();
    socket.emit('trocaSom25', sr25);
}

function trocaSom25Ex(sr25){
document.getElementById('menu25').value= sr25;
console.log(sr25);
fetch("./sons/"+ sr25 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio25 = decodedAudio;
    });
    document.getElementById('pb25').focus();
}

function trocaSom26(){
src26 = document.getElementById('menu26').value;
let sr26 = src26;
console.log(src26);
fetch("./sons/"+ src26 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio26 = decodedAudio;
    });
    document.getElementById('pb26').focus();
    socket.emit('trocaSom26', sr26);
}

function trocaSom26Ex(sr26){
document.getElementById('menu26').value= sr26;
console.log(sr26);
fetch("./sons/"+ sr26 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio26 = decodedAudio;
    });
    document.getElementById('pb26').focus();
}

function trocaSom27(){
src27 = document.getElementById('menu27').value;
let sr27 = src27;
console.log(src27);
fetch("./sons/"+ src27 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio27 = decodedAudio;
    });
    document.getElementById('pb27').focus();
    socket.emit('trocaSom27', sr27);
}

function trocaSom27Ex(sr27){
document.getElementById('menu27').value= sr27;
console.log(sr27);
fetch("./sons/"+ sr27 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio27 = decodedAudio;
    });
    document.getElementById('pb27').focus();
}

function trocaSom28(){
src28 = document.getElementById('menu28').value;
let sr28 = src28;
console.log(src28);
fetch("./sons/"+ src28 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio28 = decodedAudio;
    });
    document.getElementById('pb28').focus();
    socket.emit('trocaSom28', sr28);
}

function trocaSom28Ex(sr28){
document.getElementById('menu28').value= sr28;
console.log(sr28);
fetch("./sons/"+ sr28 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio28 = decodedAudio;
    });
    document.getElementById('pb28').focus();
}

function trocaSom29(){
src29 = document.getElementById('menu29').value;
let sr29 = src29;
console.log(src29);
fetch("./sons/"+ src29 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio29 = decodedAudio;
    });
    document.getElementById('pb29').focus();
    socket.emit('trocaSom29', sr29);
}

function trocaSom29Ex(sr29){
document.getElementById('menu29').value= sr29;
console.log(sr29);
fetch("./sons/"+ sr29 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio29 = decodedAudio;
    });
    document.getElementById('pb29').focus();
}

function trocaSom30(){
src30 = document.getElementById('menu30').value;
let sr30 = src30;
console.log(src30);
fetch("./sons/"+ src30 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio30 = decodedAudio;
    });
    document.getElementById('pb30').focus();
    socket.emit('trocaSom30', sr30);
}

function trocaSom30Ex(sr30){
document.getElementById('menu30').value= sr30;
console.log(sr30);
fetch("./sons/"+ sr30 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio30 = decodedAudio;
    });
    document.getElementById('pb30').focus();
}

function trocaSom31(){
src31 = document.getElementById('menu31').value;
let sr31 = src31;
console.log(src31);
fetch("./sons/"+ src31 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio31 = decodedAudio;
    });
    document.getElementById('pb31').focus();
    socket.emit('trocaSom31', sr31);
}

function trocaSom31Ex(sr31){
document.getElementById('menu31').value= sr31;
console.log(sr31);
fetch("./sons/"+ sr31 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio31 = decodedAudio;
    });
    document.getElementById('pb31').focus();
}

function trocaSom32(){
src32 = document.getElementById('menu32').value;
let sr32 = src32;
console.log(src32);
fetch("./sons/"+ src32 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio32 = decodedAudio;
    });
    document.getElementById('pb32').focus();
    socket.emit('trocaSom32', sr32);
}

function trocaSom32Ex(sr32){
document.getElementById('menu32').value= sr32;
console.log(sr32);
fetch("./sons/"+ sr32 +".ogg")
     .then(data => data.arrayBuffer())
     .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
     .then(decodedAudio => {
       audio32 = decodedAudio;
    });
    document.getElementById('pb32').focus();
}

////////////////////////////
function trocaVideo(){
  var video = document.getElementById('videoBase');
  var src = document.getElementById('videoMenu').value;
  video.src = "videos/"+src+".webm";
  console.log(src);
}

function sincaAudVideo(){
  var v = document.getElementById('adown');
  var a = document.getElementById('videoPlayer');
  v.currentTime = a.currentTime;
}

///////////////  recorder do  synth

const recorderSynth = new Tone.Recorder();
/////////////synth tecla 1 a 8
function playSynth1(){
const synth1 = new Tone.Synth().toDestination();
const now = Tone.now();
// trigger the attack immediately
synth1.triggerAttack("C2", now);
synth1.triggerRelease(now + 0.05);
console.log(synth1);
}

function playSynth2(){
  const synth2 = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth2.triggerAttack("D2", now);
  synth2.triggerRelease(now + 0.05);

}
function playSynth3(){
  const synth3 = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth3.triggerAttack("E2", now);
  synth3.triggerRelease(now + 0.05);
}
function playSynth4(){
  const synth4 = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth4.triggerAttack("G2", now);
  synth4.triggerRelease(now + 0.05);
}
function playSynth5(){
  const synth5 = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth5.triggerAttack("A2", now);
  synth5.triggerRelease(now + 0.05);
}
function playSynth6(){
  const synth6 = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth6.triggerAttack("C3", now);
  synth6.triggerRelease(now + 0.05);
}
function playSynth7(){
const synth5 = new Tone.MembraneSynth().toDestination();
synth5.triggerAttackRelease("D3", "8n");
console.log(synth5);
}
function playSynth8(){
const synth5 = new Tone.MembraneSynth().toDestination();
synth5.triggerAttackRelease("E3", "8n");
console.log(synth5);
}
//////////////////////////////


function tocaUserAudio(){
  var audioUser = document.getElementById('auser');
  console.log("opa!");
  audioUser.play();

}

var bots = document.getElementsByClassName("button");
/////////////////////////////////////////
function trocaCorBot(id){
  b = document.getElementById(id);
  b.style.background = "grey";
  setTimeout(espera, 50);
}
function espera(){
  b.style.background = "#39BFF9";
}
/////////////////// set up do servidor e conexões

///////// toca a track ligada ao ctx.destination e ao dest
function playTrack (){

}
/////// escreve as msn dos outros clientes na timeline do cliente
function atu(user){
  document.getElementById('audioLab').innerHTML += "<button class=userSoundClass>"+ user.apelido + "</br>"+ user.nomeMix+"</button>";
}

function escreve(txt){
socket.emit('teste');
}


function botLuz(){
var b1 = document.getElementById('bot1');

}
/////////função que toca canal do cliente usando os keypresses e envia o
//       som para os outros clientes
function newToca(canal){

  if (canal === 'Canal 1'){
      ctx.resume();
      playSound1 = ctx.createBufferSource();
      v1 = document.getElementById('sld1').value;
      playSound1.buffer = audio1;
      var gain1 = ctx.createGain();
      playSound1.connect(gain1);
      gain1.connect(ctx.destination);
      gain1.connect(dest);
      gain1.gain.value = v1;
      playSound1.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 2'){
      ctx.resume();
      playSound2 = ctx.createBufferSource();
      v2 = document.getElementById('sld2').value;
      playSound2.buffer = audio2;
      var gain2 = ctx.createGain();
      playSound2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.connect(dest);
      gain2.gain.value = v2;
      playSound2.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 3'){
      ctx.resume();
      playSound3 = ctx.createBufferSource();
      v3 = document.getElementById('sld3').value;
      playSound3.buffer = audio3;
      var gain3 = ctx.createGain();
      playSound3.connect(gain3);
      gain3.connect(ctx.destination);
      gain3.connect(dest);
      gain3.gain.value = v3;
      playSound3.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 4'){
      ctx.resume();
      playSound4 = ctx.createBufferSource();
      v4 = document.getElementById('sld4').value;
      playSound4.buffer = audio4;
      var gain4 = ctx.createGain();
      playSound4.connect(gain4);
      gain4.connect(ctx.destination);
      gain4.connect(dest);
      gain4.gain.value = v4;
      playSound4.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 5'){
      ctx.resume();
      playSound5 = ctx.createBufferSource();
      v5 = document.getElementById('sld5').value;
      playSound5.buffer = audio5;
      var gain5 = ctx.createGain();
      playSound5.connect(gain5);
      gain5.connect(ctx.destination);
      gain5.connect(dest);
      gain5.gain.value = v5;
      playSound5.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 6'){
      ctx.resume();
      playSound6 = ctx.createBufferSource();
      v6 = document.getElementById('sld6').value;
      playSound6.buffer = audio6;
      var gain6 = ctx.createGain();
      playSound6.connect(gain6);
      gain6.connect(ctx.destination);
      gain6.connect(dest);
      gain6.gain.value = v6;
      playSound6.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 7'){
      ctx.resume();
      playSound7 = ctx.createBufferSource();
      v7 = document.getElementById('sld7').value;
      playSound7.buffer = audio7;
      var gain7 = ctx.createGain();
      playSound7.connect(gain7);
      gain7.connect(ctx.destination);
      gain7.connect(dest);
      gain7.gain.value = v7;
      playSound7.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 8'){
      ctx.resume();
      playSound8 = ctx.createBufferSource();
      v8 = document.getElementById('sld8').value;
      playSound8.buffer = audio8;
      var gain8 = ctx.createGain();
      playSound8.connect(gain8);
      gain8.connect(ctx.destination);
      gain8.connect(dest);
      gain8.gain.value = v8;
      playSound8.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 9'){
      ctx.resume();
      playSound9 = ctx.createBufferSource();
      v9 = document.getElementById('sld9').value;
      playSound9.buffer = audio9;
      var gain9 = ctx.createGain();
      playSound9.connect(gain9);
      gain9.connect(ctx.destination);
      gain9.connect(dest);
      gain9.gain.value = v9;
      playSound9.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 10'){
      ctx.resume();
      playSound10 = ctx.createBufferSource();
      v10 = document.getElementById('sld10').value;
      playSound10.buffer = audio10;
      var gain10 = ctx.createGain();
      playSound10.connect(gain10);
      gain10.connect(ctx.destination);
      gain10.connect(dest);
      gain10.gain.value = v10;
      playSound10.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 11'){
      ctx.resume();
      playSound11 = ctx.createBufferSource();
      v11 = document.getElementById('sld11').value;
      playSound11.buffer = audio11;
      var gain11 = ctx.createGain();
      playSound11.connect(gain11);
      gain11.connect(ctx.destination);
      gain11.connect(dest);
      gain11.gain.value = v11;
      playSound11.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 12'){
      ctx.resume();
      playSound12 = ctx.createBufferSource();
      v12 = document.getElementById('sld12').value;
      playSound12.buffer = audio12;
      var gain12 = ctx.createGain();
      playSound12.connect(gain12);
      gain12.connect(ctx.destination);
      gain12.connect(dest);
      gain12.gain.value = v12;
      playSound12.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 13'){
      ctx.resume();
      playSound13 = ctx.createBufferSource();
      v13 = document.getElementById('sld13').value;
      playSound13.buffer = audio13;
      var gain13 = ctx.createGain();
      playSound13.connect(gain13);
      gain13.connect(ctx.destination);
      gain13.connect(dest);
      gain13.gain.value = v13;
      playSound13.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 14'){
      ctx.resume();
      playSound14 = ctx.createBufferSource();
      v14 = document.getElementById('sld14').value;
      playSound14.buffer = audio14;
      var gain14 = ctx.createGain();
      playSound14.connect(gain14);
      gain14.connect(ctx.destination);
      gain14.connect(dest);
      gain14.gain.value = v14;
      playSound14.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 15'){
      ctx.resume();
      playSound15 = ctx.createBufferSource();
      v15 = document.getElementById('sld15').value;
      playSound15.buffer = audio15;
      var gain15 = ctx.createGain();
      playSound15.connect(gain15);
      gain15.connect(ctx.destination);
      gain15.connect(dest);
      gain15.gain.value = v15;
      playSound15.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
  if (canal === 'Canal 16'){
      ctx.resume();
      playSound16 = ctx.createBufferSource();
      v16 = document.getElementById('sld1').value;
      playSound16.buffer = audio16;
      var gain16 = ctx.createGain();
      playSound16.connect(gain16);
      gain16.connect(ctx.destination);
      gain16.connect(dest);
      gain16.gain.value = v16;
      playSound16.start(ctx.currentTime);
      console.log('recebi som do '+ canal);
  }
}



//////    função para replicar os sons tocados por botões em outro cliente externo
function newToca2(bot){
  if (bot === "Botão 1"){
    //ctx.resume();
    playSound1b = ctx.createBufferSource();
    v1b = document.getElementById('sld1').value;
    playSound1b.buffer = audio1;
    gain1b = ctx.createGain();
    playSound1b.connect(gain1b);
    gain1b.connect(ctx.destination);
    gain1b.connect(dest);
    gain1b.gain.value = v1b;
    playSound1b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 2"){
    //ctx.resume();
    playSound2b = ctx.createBufferSource();
    v2b = document.getElementById('sld2').value;
    playSound2b.buffer = audio2;
    gain2b = ctx.createGain();
    playSound2b.connect(gain2b);
    gain2b.connect(ctx.destination);
    gain2b.connect(dest);
    gain2b.gain.value = v2b;
    playSound2b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 3"){
    //ctx.resume();
    playSound3b = ctx.createBufferSource();
    v3b = document.getElementById('sld3').value;
    playSound3b.buffer = audio3;
    gain3b = ctx.createGain();
    playSound3b.connect(gain3b);
    gain3b.connect(ctx.destination);
    gain3b.connect(dest);
    gain3b.gain.value = v3b;
    playSound3b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 4"){
    //ctx.resume();
    playSound4b = ctx.createBufferSource();
    v4b = document.getElementById('sld4').value;
    playSound4b.buffer = audio4;
    gain4b = ctx.createGain();
    playSound4b.connect(gain4b);
    gain4b.connect(ctx.destination);
    gain4b.connect(dest);
    gain4b.gain.value = v4b;
    playSound4b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 5"){
    //ctx.resume();
    playSound5b = ctx.createBufferSource();
    v5b = document.getElementById('sld5').value;
    playSound5b.buffer = audio5;
    gain5b = ctx.createGain();
    playSound5b.connect(gain5b);
    gain5b.connect(ctx.destination);
    gain5b.connect(dest);
    gain5b.gain.value = v5b;
    playSound5b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 6"){
    //ctx.resume();
    playSound6b = ctx.createBufferSource();
    v6b = document.getElementById('sld6').value;
    playSound6b.buffer = audio6;
    gain6b = ctx.createGain();
    playSound6b.connect(gain6b);
    gain6b.connect(ctx.destination);
    gain6b.connect(dest);
    gain6b.gain.value = v6b;
    playSound6b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 7"){
    //ctx.resume();
    playSound7b = ctx.createBufferSource();
    v7b = document.getElementById('sld7').value;
    playSound7b.buffer = audio7;
    gain7b = ctx.createGain();
    playSound7b.connect(gain7b);
    gain7b.connect(ctx.destination);
    gain7b.connect(dest);
    gain7b.gain.value = v7b;
    playSound7b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 8"){
    //ctx.resume();
    playSound8b = ctx.createBufferSource();
    v8b = document.getElementById('sld8').value;
    playSound8b.buffer = audio8;
    gain8b = ctx.createGain();
    playSound8b.connect(gain8b);
    gain8b.connect(ctx.destination);
    gain8b.connect(dest);
    gain8b.gain.value = v8b;
    playSound8b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 9"){
    //ctx.resume();
    playSound9b = ctx.createBufferSource();
    v9b = document.getElementById('sld9').value;
    playSound9b.buffer = audio9;
    gain9b = ctx.createGain();
    playSound9b.connect(gain9b);
    gain9b.connect(ctx.destination);
    gain9b.connect(dest);
    gain9b.gain.value = v9b;
    playSound9b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 10"){
    //ctx.resume();
    playSound10b = ctx.createBufferSource();
    v10b = document.getElementById('sld10').value;
    playSound10b.buffer = audio10;
    gain10b = ctx.createGain();
    playSound10b.connect(gain10b);
    gain10b.connect(ctx.destination);
    gain10b.connect(dest);
    gain10b.gain.value = v10b;
    playSound10b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão11"){
    //ctx.resume();
    playSound11b = ctx.createBufferSource();
    v11b = document.getElementById('sld11').value;
    playSound11b.buffer = audio11;
    gain11b = ctx.createGain();
    playSound11b.connect(gain11b);
    gain11b.connect(ctx.destination);
    gain11b.connect(dest);
    gain11b.gain.value = v11b;
    playSound11b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 12"){
    //ctx.resume();
    playSound12b = ctx.createBufferSource();
    v12b = document.getElementById('sld12').value;
    playSound12b.buffer = audio12;
    gain12b = ctx.createGain();
    playSound12b.connect(gain12b);
    gain12b.connect(ctx.destination);
    gain12b.connect(dest);
    gain12b.gain.value = v12b;
    playSound12b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 13"){
    //ctx.resume();
    playSound13b = ctx.createBufferSource();
    v13b = document.getElementById('sld13').value;
    playSound13b.buffer = audio13;
    gain13b = ctx.createGain();
    playSound13b.connect(gain13b);
    gain13b.connect(ctx.destination);
    gain13b.connect(dest);
    gain13b.gain.value = v13b;
    playSound13b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 14"){
    //ctx.resume();
    playSound14b = ctx.createBufferSource();
    v14b = document.getElementById('sld14').value;
    playSound14b.buffer = audio14;
    gain14b = ctx.createGain();
    playSound14b.connect(gain14b);
    gain14b.connect(ctx.destination);
    gain14b.connect(dest);
    gain14b.gain.value = v14b;
    playSound14b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 15"){
    //ctx.resume();
    playSound15b = ctx.createBufferSource();
    v15b = document.getElementById('sld15').value;
    playSound15b.buffer = audio15;
    gain15b = ctx.createGain();
    playSound15b.connect(gain15b);
    gain15b.connect(ctx.destination);
    gain15b.connect(dest);
    gain15b.gain.value = v15b;
    playSound15b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
  if (bot === "Botão 16"){
    //ctx.resume();
    playSound16b = ctx.createBufferSource();
    v16b = document.getElementById('sld16').value;
    playSound16b.buffer = audio16;
    gain16b = ctx.createGain();
    playSound16b.connect(gain16b);
    gain16b.connect(ctx.destination);
    gain16b.connect(dest);
    gain16b.gain.value = v16b;
    playSound16b.start(ctx.currentTime);
    console.log('recebi sinal do '+ bot);
  }
}


function getScreenXY(){
  width = window.innerWidth;
  height = window.innerHeight;
  console.log(width, height);
}
getScreenXY();



////// variável que armazena o tempo do ctx.
let startTimeCtx, endTimeCtx;

////////////// toca canal 1 a 32 no cliente usando keypress
function playback(event){

///////////////   keypresses
/// canal 1
  if (event.keyCode == "65"){
    if (c1Press === false){
    playSound1 = ctx.createBufferSource();/// playsound criado dentro do if
    v1 = document.getElementById('sld1').value;
    playSound1.buffer = audio1;
    var gain1 = ctx.createGain();
    playSound1.connect(gain1);
    gain1.connect(ctx.destination);
    gain1.connect(dest);
    gain1.gain.value = v1;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 1';
    socket.emit('outrosom', canal);
    trocaCorBot("pb1");
    playSound1.start(ctx.currentTime);
    console.log("Recebido key press a - "+ canal);
    console.log("tecla a pressed!");
    c1Press = true;
    }
  }
/// canal 2
  if (event.keyCode == "83"){
      if (c2Press === false){
      playSound2 = ctx.createBufferSource();/// playsound criado dentro do if
      v2 = document.getElementById('sld2').value;
      playSound2.buffer = audio2;
      var gain2 = ctx.createGain();
      playSound2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.connect(dest);
      gain2.gain.value = v2;
      ///// emitir o evento 'toca() para todos ligados ao servidor'
      canal = 'Canal 2';
      socket.emit('outrosom', canal);
      trocaCorBot("pb2");
      playSound2.start(ctx.currentTime);
      console.log("Recebido key press s - "+ canal);
      console.log("tecla s pressed!");
      c2Press = true;
    }
  }
///canal 3
  if (event.keyCode == "68"){
    if (c3Press === false){
    playSound3 = ctx.createBufferSource();/// playsound criado dentro do if
    v3 = document.getElementById('sld3').value;
    playSound3.buffer = audio3;
    var gain3 = ctx.createGain();
    playSound3.connect(gain3);
    gain3.connect(ctx.destination);
    gain3.connect(dest);
    gain3.gain.value = v3;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 3';
    socket.emit('outrosom', canal);
    trocaCorBot("pb3");
    playSound3.start(ctx.currentTime);
    console.log("Recebido key press d - "+ canal);
    console.log("tecla d pressed!");
    c3Press = true;
   }
  }
  ///canal 4
  if (event.keyCode == "70"){
    if (c4Press === false){
    playSound4 = ctx.createBufferSource();/// playsound criado dentro do if
    v4 = document.getElementById('sld4').value;
    playSound4.buffer = audio4;
    var gain4 = ctx.createGain();
    playSound4.connect(gain4);
    gain4.connect(ctx.destination);
    gain4.connect(dest);
    gain4.gain.value = v4;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 4';
    socket.emit('outrosom', canal);
    trocaCorBot("pb4");
    playSound4.start(ctx.currentTime);
    console.log("Recebido key press f - "+ canal);
    console.log("tecla f pressed!");
    c4Press = true;
   }
  }
  ///canal 5
  if (event.keyCode == "71"){
    if (c5Press === false){
    playSound5 = ctx.createBufferSource();/// playsound criado dentro do if
    v5 = document.getElementById('sld5').value;
    playSound5.buffer = audio5;
    var gain5 = ctx.createGain();
    playSound5.connect(gain5);
    gain5.connect(ctx.destination);
    gain5.connect(dest);
    gain5.gain.value = v5;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 5';
    socket.emit('outrosom', canal);
    trocaCorBot("pb5");
    playSound5.start(ctx.currentTime);
    console.log("Recebido key press g - "+ canal);
    console.log("tecla g pressed!");
    c5Press = true;
   }
  }
  ///canal 6
  if (event.keyCode == "72"){
    if (c6Press === false){
    playSound6 = ctx.createBufferSource();/// playsound criado dentro do if
    v6 = document.getElementById('sld6').value;
    playSound6.buffer = audio6;
    var gain6 = ctx.createGain();
    playSound6.connect(gain6);
    gain6.connect(ctx.destination);
    gain6.connect(dest);
    gain6.gain.value = v6;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 6';
    socket.emit('outrosom', canal);
    trocaCorBot("pb6");
    playSound6.start(ctx.currentTime);
    console.log("Recebido key press h - "+ canal);
    console.log("tecla h pressed!");
    c6Press = true;
   }
 }
 ///canal 7
  if (event.keyCode == "74"){
    if (c7Press === false){
    playSound7 = ctx.createBufferSource();/// playsound criado dentro do if
    v7 = document.getElementById('sld7').value;
    playSound7.buffer = audio7;
    var gain7 = ctx.createGain();
    playSound7.connect(gain7);
    gain7.connect(ctx.destination);
    gain7.connect(dest);
    gain7.gain.value = v7;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 7';
    socket.emit('outrosom', canal);
    trocaCorBot("pb7");
    playSound7.start(ctx.currentTime);
    console.log("Recebido key press j - "+ canal);
    console.log("tecla j pressed!");
    c7Press = true;
   }
  }
  ///canal 8
  if (event.keyCode == "75"){
    if (c8Press === false){
    playSound8 = ctx.createBufferSource();/// playsound criado dentro do if
    v8 = document.getElementById('sld8').value;
    playSound8.buffer = audio8;
    var gain8 = ctx.createGain();
    playSound8.connect(gain8);
    gain8.connect(ctx.destination);
    gain8.connect(dest);
    gain8.gain.value = v8;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 8';
    socket.emit('outrosom', canal);
    trocaCorBot("pb8");
    playSound8.start(ctx.currentTime);
    console.log("Recebido key press k - "+ canal);
    console.log("tecla k pressed!");
    c8Press = true;
   }
 }
  ///canal 9
  if (event.keyCode == "90"){
    if (c9Press === false){
    playSound9 = ctx.createBufferSource();/// playsound criado dentro do if
    v9 = document.getElementById('sld9').value;
    playSound9.buffer = audio9;
    var gain9 = ctx.createGain();
    playSound9.connect(gain9);
    gain9.connect(ctx.destination);
    gain9.connect(dest);
    gain9.gain.value = v9;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 9';
    socket.emit('outrosom', canal);
    trocaCorBot("pb9");
    playSound9.start(ctx.currentTime);
    console.log("Recebido key press z - "+ canal);
    console.log("tecla z pressed!");
    c9Press = true;
   }
  }
  ///canal 10
  if (event.keyCode == "88"){
    if (c10Press === false){
    playSound10 = ctx.createBufferSource();/// playsound criado dentro do if
    v10 = document.getElementById('sld10').value;
    playSound10.buffer = audio10;
    var gain10 = ctx.createGain();
    playSound10.connect(gain10);
    gain10.connect(ctx.destination);
    gain10.connect(dest);
    gain10.gain.value = v10;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 10';
    socket.emit('outrosom', canal);
    trocaCorBot("pb10");
    playSound10.start(ctx.currentTime);
    console.log("Recebido key press x - "+ canal);
    console.log("tecla x pressed!");
    c10Press = true;
   }
  }
  ///canal 11
  if (event.keyCode == "67"){
    if (c11Press === false){
    playSound11 = ctx.createBufferSource();/// playsound criado dentro do if
    v11 = document.getElementById('sld11').value;
    playSound11.buffer = audio11;
    var gain11 = ctx.createGain();
    playSound11.connect(gain11);
    gain11.connect(ctx.destination);
    gain11.connect(dest);
    gain11.gain.value = v11;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 11';
    socket.emit('outrosom', canal);
    trocaCorBot("pb11");
    playSound11.start(ctx.currentTime);
    console.log("Recebido key press c - "+ canal);
    console.log("tecla c pressed!");
    c11Press = true;
   }
  }
  ///canal 12
  if (event.keyCode == "86"){
    if (c12Press === false){
    playSound12 = ctx.createBufferSource();/// playsound criado dentro do if
    v12 = document.getElementById('sld12').value;
    playSound12.buffer = audio12;
    var gain12 = ctx.createGain();
    playSound12.connect(gain12);
    gain12.connect(ctx.destination);
    gain12.connect(dest);
    gain12.gain.value = v12;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 12';
    socket.emit('outrosom', canal);
    trocaCorBot("pb12");
    playSound12.start(ctx.currentTime);
    console.log("Recebido key press v - "+ canal);
    console.log("tecla v pressed!");
    c12Press = true;
   }
  }
  ///canal 13
  if (event.keyCode == "66"){
    if (c13Press === false){
    playSound13 = ctx.createBufferSource();/// playsound criado dentro do if
    v13 = document.getElementById('sld13').value;
    playSound13.buffer = audio13;
    var gain13 = ctx.createGain();
    playSound13.connect(gain13);
    gain13.connect(ctx.destination);
    gain13.connect(dest);
    gain13.gain.value = v13;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 13';
    socket.emit('outrosom', canal);
    trocaCorBot("pb13");
    playSound13.start(ctx.currentTime);
    console.log("Recebido key press b - "+ canal);
    console.log("tecla b pressed!");
    c13Press = true;
   }
  }
  ///canal 14
  if (event.keyCode == "78"){
    if (c14Press === false){
    playSound14 = ctx.createBufferSource();/// playsound criado dentro do if
    v14 = document.getElementById('sld14').value;
    playSound14.buffer = audio14;
    var gain14 = ctx.createGain();
    playSound14.connect(gain14);
    gain14.connect(ctx.destination);
    gain14.connect(dest);
    gain14.gain.value = v14;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 14';
    socket.emit('outrosom', canal);
    trocaCorBot("pb14");
    playSound14.start(ctx.currentTime);
    console.log("Recebido key press n - "+ canal);
    console.log("tecla n pressed!");
    c14Press = true;
   }
  }
///canal 15
  if (event.keyCode == "77"){
    if (c15Press === false){
    playSound15 = ctx.createBufferSource();/// playsound criado dentro do if
    v15 = document.getElementById('sld15').value;
    playSound15.buffer = audio15;
    var gain15 = ctx.createGain();
    playSound15.connect(gain15);
    gain15.connect(ctx.destination);
    gain15.connect(dest);
    gain15.gain.value = v15;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 15';
    socket.emit('outrosom', canal);
    trocaCorBot("pb15");
    playSound15.start(ctx.currentTime);
    console.log("Recebido key press m - "+ canal);
    console.log("tecla m pressed!");
    c15Press = true;
   }
  }
  ///canal 16
  if (event.keyCode == "188"){
    if (c16Press === false){
    playSound16 = ctx.createBufferSource();/// playsound criado dentro do if
    v16 = document.getElementById('sld16').value;
    playSound16.buffer = audio16;
    var gain16 = ctx.createGain();
    playSound16.connect(gain16);
    gain16.connect(ctx.destination);
    gain16.connect(dest);
    gain16.gain.value = v16;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 16';
    socket.emit('outrosom', canal);
    trocaCorBot("pb16");
    playSound16.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c16Press = true;
   }
  }
///// key presses de 17 a 32   !!!!! continuar até o canal 32
///canal 17
if (event.keyCode == "49"){
  if (c17Press === false){
  playSound17 = ctx.createBufferSource();/// playsound criado dentro do if
  v17 = document.getElementById('sld17').value;
  playSound17.buffer = audio17;
  var gain17 = ctx.createGain();
  playSound17.connect(gain17);
  gain17.connect(ctx.destination);
  gain17.connect(dest);
  gain17.gain.value = v17;
  ///// emitir o evento 'toca() para todos ligados ao servidor'
  canal = 'Canal 17';
  socket.emit('outrosom', canal);
  trocaCorBot("pb17");
  playSound17.start(ctx.currentTime);
  console.log("Recebido key press , - "+ canal);
  console.log("tecla , pressed!");
  c17Press = true;
 }
}

if (event.keyCode == "50"){
    if (c18Press === false){
    playSound18 = ctx.createBufferSource();/// playsound criado dentro do if
    v18 = document.getElementById('sld18').value;
    playSound18.buffer = audio18;
    var gain18 = ctx.createGain();
    playSound18.connect(gain18);
    gain18.connect(ctx.destination);
    gain18.connect(dest);
    gain18.gain.value = v18;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 18';
    socket.emit('outrosom', canal);
    trocaCorBot("pb18");
    playSound18.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c18Press = true;
   }
}

if (event.keyCode == "51"){
    if (c19Press === false){
    playSound19 = ctx.createBufferSource();/// playsound criado dentro do if
    v19 = document.getElementById('sld19').value;
    playSound19.buffer = audio19;
    var gain19 = ctx.createGain();
    playSound19.connect(gain19);
    gain19.connect(ctx.destination);
    gain19.connect(dest);
    gain19.gain.value = v19;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 19';
    socket.emit('outrosom', canal);
    trocaCorBot("pb19");
    playSound19.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c19Press = true;
   }
}

if (event.keyCode == "52"){
    if (c20Press === false){
    playSound20 = ctx.createBufferSource();/// playsound criado dentro do if
    v20 = document.getElementById('sld20').value;
    playSound20.buffer = audio20;
    var gain20 = ctx.createGain();
    playSound20.connect(gain20);
    gain20.connect(ctx.destination);
    gain20.connect(dest);
    gain20.gain.value = v20;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 20';
    socket.emit('outrosom', canal);
    trocaCorBot("pb20");
    playSound20.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c20Press = true;
   }
}

if (event.keyCode == "53"){
    if (c21Press === false){
    playSound21 = ctx.createBufferSource();/// playsound criado dentro do if
    v21 = document.getElementById('sld21').value;
    playSound21.buffer = audio21;
    var gain21 = ctx.createGain();
    playSound21.connect(gain21);
    gain21.connect(ctx.destination);
    gain21.connect(dest);
    gain21.gain.value = v21;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 21';
    socket.emit('outrosom', canal);
    trocaCorBot("pb21");
    playSound21.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c21Press = true;
   }
}

if (event.keyCode == "54"){
    if (c22Press === false){
    playSound22 = ctx.createBufferSource();/// playsound criado dentro do if
    v22 = document.getElementById('sld22').value;
    playSound22.buffer = audio22;
    var gain22 = ctx.createGain();
    playSound22.connect(gain22);
    gain22.connect(ctx.destination);
    gain22.connect(dest);
    gain22.gain.value = v22;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 22';
    socket.emit('outrosom', canal);
    trocaCorBot("pb22");
    playSound22.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c22Press = true;
   }
}

if (event.keyCode == "55"){
    if (c23Press === false){
    playSound23 = ctx.createBufferSource();/// playsound criado dentro do if
    v23 = document.getElementById('sld23').value;
    playSound23.buffer = audio23;
    var gain23 = ctx.createGain();
    playSound23.connect(gain23);
    gain23.connect(ctx.destination);
    gain23.connect(dest);
    gain23.gain.value = v23;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 23';
    socket.emit('outrosom', canal);
    trocaCorBot("pb23");
    playSound23.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c23Press = true;
   }
}

if (event.keyCode == "56"){
    if (c24Press === false){
    playSound24 = ctx.createBufferSource();/// playsound criado dentro do if
    v24 = document.getElementById('sld24').value;
    playSound24.buffer = audio24;
    var gain24 = ctx.createGain();
    playSound24.connect(gain24);
    gain24.connect(ctx.destination);
    gain24.connect(dest);
    gain24.gain.value = v24;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 24';
    socket.emit('outrosom', canal);
    trocaCorBot("pb24");
    playSound24.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c24Press = true;
   }
}

if (event.keyCode == "57"){
    if (c25Press === false){
    playSound25 = ctx.createBufferSource();/// playsound criado dentro do if
    v25 = document.getElementById('sld25').value;
    playSound25.buffer = audio25;
    var gain25 = ctx.createGain();
    playSound25.connect(gain25);
    gain25.connect(ctx.destination);
    gain25.connect(dest);
    gain25.gain.value = v25;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 25';
    socket.emit('outrosom', canal);
    trocaCorBot("pb25");
    playSound25.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c25Press = true;
   }
}

if (event.keyCode == "48"){
    if (c26Press === false){
    playSound26 = ctx.createBufferSource();/// playsound criado dentro do if
    v26 = document.getElementById('sld26').value;
    playSound26.buffer = audio26;
    var gain26 = ctx.createGain();
    playSound26.connect(gain26);
    gain26.connect(ctx.destination);
    gain26.connect(dest);
    gain26.gain.value = v26;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 26';
    socket.emit('outrosom', canal);
    trocaCorBot("pb26");
    playSound26.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c26Press = true;
   }
}

if (event.keyCode == "81"){
    if (c27Press === false){
    playSound27 = ctx.createBufferSource();/// playsound criado dentro do if
    v27 = document.getElementById('sld27').value;
    playSound27.buffer = audio27;
    var gain27 = ctx.createGain();
    playSound27.connect(gain27);
    gain27.connect(ctx.destination);
    gain27.connect(dest);
    gain27.gain.value = v27;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 27';
    socket.emit('outrosom', canal);
    trocaCorBot("pb27");
    playSound27.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c27Press = true;
   }
}

if (event.keyCode == "87"){
    if (c28Press === false){
    playSound28 = ctx.createBufferSource();/// playsound criado dentro do if
    v28 = document.getElementById('sld28').value;
    playSound28.buffer = audio28;
    var gain28 = ctx.createGain();
    playSound28.connect(gain28);
    gain28.connect(ctx.destination);
    gain28.connect(dest);
    gain28.gain.value = v28;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 28';
    socket.emit('outrosom', canal);
    trocaCorBot("pb28");
    playSound28.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c28Press = true;
   }
}

if (event.keyCode == "69"){
    if (c29Press === false){
    playSound29 = ctx.createBufferSource();/// playsound criado dentro do if
    v29 = document.getElementById('sld29').value;
    playSound29.buffer = audio29;
    var gain29 = ctx.createGain();
    playSound29.connect(gain29);
    gain29.connect(ctx.destination);
    gain29.connect(dest);
    gain29.gain.value = v29;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 29';
    socket.emit('outrosom', canal);
    trocaCorBot("pb29");
    playSound29.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c29Press = true;
   }
}

if (event.keyCode == "82"){
    if (c30Press === false){
    playSound30 = ctx.createBufferSource();/// playsound criado dentro do if
    v30 = document.getElementById('sld30').value;
    playSound30.buffer = audio30;
    var gain30 = ctx.createGain();
    playSound30.connect(gain30);
    gain30.connect(ctx.destination);
    gain30.connect(dest);
    gain30.gain.value = v30;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 30';
    socket.emit('outrosom', canal);
    trocaCorBot("pb30");
    playSound30.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c30Press = true;
   }
}

if (event.keyCode == "84"){
    if (c31Press === false){
    playSound31 = ctx.createBufferSource();/// playsound criado dentro do if
    v31 = document.getElementById('sld31').value;
    playSound31.buffer = audio31;
    var gain31 = ctx.createGain();
    playSound31.connect(gain31);
    gain31.connect(ctx.destination);
    gain31.connect(dest);
    gain31.gain.value = v31;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 31';
    socket.emit('outrosom', canal);
    trocaCorBot("pb31");
    playSound31.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c31Press = true;
   }
}

if (event.keyCode == "89"){
    if (c32Press === false){
    playSound32 = ctx.createBufferSource();/// playsound criado dentro do if
    v32 = document.getElementById('sld32').value;
    playSound32.buffer = audio32;
    var gain32 = ctx.createGain();
    playSound32.connect(gain32);
    gain32.connect(ctx.destination);
    gain32.connect(dest);
    gain32.gain.value = v32;
    ///// emitir o evento 'toca() para todos ligados ao servidor'
    canal = 'Canal 32';
    socket.emit('outrosom', canal);
    trocaCorBot("pb32");
    playSound32.start(ctx.currentTime);
    console.log("Recebido key press , - "+ canal);
    console.log("tecla , pressed!");
    c32Press = true;
   }
}


}
/////// final da função playback
// ////////canais em botões de acionamento sonoro
function bPlay1(){

bot="Botão 1";
var playSound1b = ctx.createBufferSource();
var vb1 = document.getElementById('sld1').value;
playSound1b.buffer = audio1;
var gain1b = ctx.createGain();
playSound1b.connect(gain1b);
gain1b.connect(ctx.destination);
gain1b.connect(dest);
gain1b.gain.value = vb1;
socket.emit('outrosom2', bot);
playSound1b.start(ctx.currentTime);
console.log(bot +' acionado.');
trocaCorBot("pb1");

}

function bPlay2(){
ctx.resume();
bot = "Botão 2";
var playSound2b = ctx.createBufferSource();
var vb2 = document.getElementById('sld2').value;
playSound2b.buffer = audio2;
var gain2b = ctx.createGain();
playSound2b.connect(gain2b);
gain2b.connect(ctx.destination);
gain2b.connect(dest);
gain2b.gain.value = vb2;
socket.emit('outrosom2', bot);
playSound2b.start(ctx.currentTime);
console.log(bot+ ' acionado ');
trocaCorBot("pb2");
}

function bPlay3(){
ctx.resume();
bot = "Botão 3";
var playSound3b = ctx.createBufferSource();
var vb3 = document.getElementById('sld3').value;
playSound3b.buffer = audio3;
var gain3b = ctx.createGain();
playSound3b.connect(gain3b);
gain3b.connect(ctx.destination);
gain3b.connect(dest);
gain3b.gain.value = vb3;
socket.emit('outrosom2', bot);
playSound3b.start(ctx.currentTime);
console.log('Canal 3 acionado botão');
trocaCorBot("pb3");
}

function bPlay4(){
ctx.resume();
bot = "Botão 4";
var playSound4b = ctx.createBufferSource();
var vb4 = document.getElementById('sld4').value;
playSound4b.buffer = audio4;
var gain4b = ctx.createGain();
playSound4b.connect(gain4b);
gain4b.connect(ctx.destination);
gain4b.connect(dest);
gain4b.gain.value = vb4;
socket.emit('outrosom2', bot);
playSound4b.start(ctx.currentTime);
console.log('Canal 4 acionado botão');
trocaCorBot("pb4");
}

function bPlay5(){
ctx.resume();
bot = "Botão 5";
var playSound5b = ctx.createBufferSource();
var vb5 = document.getElementById('sld5').value;
playSound5b.buffer = audio5;
var gain5b = ctx.createGain();
playSound5b.connect(gain5b);
gain5b.connect(ctx.destination);
gain5b.connect(dest);
gain5b.gain.value = vb5;
socket.emit('outrosom2', bot);
playSound5b.start(ctx.currentTime);
console.log('Canal 5 acionado botão');
trocaCorBot("pb5");
}

function bPlay6(){
ctx.resume();
bot = "Botão 6";
var playSound6b = ctx.createBufferSource();
var vb6 = document.getElementById('sld6').value;
playSound6b.buffer = audio6;
var gain6b = ctx.createGain();
playSound6b.connect(gain6b);
gain6b.connect(ctx.destination);
gain6b.connect(dest);
gain6b.gain.value = vb6;
socket.emit('outrosom2', bot);
playSound6b.start(ctx.currentTime);
console.log('Canal 6 acionado botão');
trocaCorBot("pb6");
}

function bPlay7(){
ctx.resume();
bot = "Botão 7";
var playSound7b = ctx.createBufferSource();
var vb7 = document.getElementById('sld7').value;
playSound7b.buffer = audio7;
var gain7b = ctx.createGain();
playSound7b.connect(gain7b);
gain7b.connect(ctx.destination);
gain7b.connect(dest);
gain7b.gain.value = vb7;
socket.emit('outrosom2', bot);
playSound7b.start(ctx.currentTime);
console.log('Canal 7 acionado botão');
trocaCorBot("pb7");
}

function bPlay8(){
ctx.resume();
bot = "Botão 8";
var playSound8b = ctx.createBufferSource();
var vb8 = document.getElementById('sld8').value;
playSound8b.buffer = audio8;
var gain8b = ctx.createGain();
playSound8b.connect(gain8b);
gain8b.connect(ctx.destination);
gain8b.connect(dest);
gain8b.gain.value = vb8;
socket.emit('outrosom2', bot);
playSound8b.start(ctx.currentTime);
console.log('Canal 8 acionado botão');
trocaCorBot("pb8");
}

function bPlay9(){
ctx.resume();
bot = "Botão 9";
var playSound9b = ctx.createBufferSource();
var vb9 = document.getElementById('sld9').value;
playSound9b.buffer = audio9;
var gain9b = ctx.createGain();
playSound9b.connect(gain9b);
gain9b.connect(ctx.destination);
gain9b.connect(dest);
gain9b.gain.value = vb9;
socket.emit('outrosom2', bot);
playSound9b.start(ctx.currentTime);
console.log('Canal 9 acionado botão');
trocaCorBot("pb9");
}

function bPlay10(){
ctx.resume();
bot = "Botão 10";
var playSound10b = ctx.createBufferSource();
var vb10 = document.getElementById('sld10').value;
playSound10b.buffer = audio10;
var gain10b = ctx.createGain();
playSound10b.connect(gain10b);
gain10b.connect(ctx.destination);
gain10b.connect(dest);
gain10b.gain.value = vb10;
socket.emit('outrosom2', bot);
playSound10b.start(ctx.currentTime);
console.log('Canal 10 acionado botão');
trocaCorBot("pb10");
}

function bPlay11(){
ctx.resume();
bot = "Botão 11";
var playSound11b = ctx.createBufferSource();
var vb11 = document.getElementById('sld11').value;
playSound11b.buffer = audio11;
var gain11b = ctx.createGain();
playSound11b.connect(gain11b);
gain11b.connect(ctx.destination);
gain11b.connect(dest);
gain11b.gain.value = vb11;
socket.emit('outrosom2', bot);
playSound11b.start(ctx.currentTime);
console.log('Canal 11 acionado botão');
trocaCorBot("pb11");
}

function bPlay12(){
ctx.resume();
bot = "Botão 12";
var playSound12b = ctx.createBufferSource();
var vb12 = document.getElementById('sld12').value;
playSound12b.buffer = audio12;
var gain12b = ctx.createGain();
playSound12b.connect(gain12b);
gain12b.connect(ctx.destination);
gain12b.connect(dest);
gain12b.gain.value = vb12;
socket.emit('outrosom2', bot);
playSound12b.start(ctx.currentTime);
console.log('Canal 12 acionado botão');
trocaCorBot("pb12");
}

function bPlay13(){
ctx.resume();
bot = "Botão 13";
var playSound13b = ctx.createBufferSource();
var vb13 = document.getElementById('sld13').value;
playSound13b.buffer = audio13;
var gain13b = ctx.createGain();
playSound13b.connect(gain13b);
gain13b.connect(ctx.destination);
gain13b.connect(dest);
gain13b.gain.value = vb13;
socket.emit('outrosom2', bot);
playSound13b.start(ctx.currentTime);
console.log('Canal 13 acionado botão');
trocaCorBot("pb13");
}

function bPlay14(){
ctx.resume();
bot = "Botão 14";
var playSound14b = ctx.createBufferSource();
var vb14 = document.getElementById('sld14').value;
playSound14b.buffer = audio14;
var gain14b = ctx.createGain();
playSound14b.connect(gain14b);
gain14b.connect(ctx.destination);
gain14b.connect(dest);
gain14b.gain.value = vb14;
socket.emit('outrosom2', bot);
playSound14b.start(ctx.currentTime);
console.log('Canal 14 acionado botão');
trocaCorBot("pb14");
}

function bPlay15(){
ctx.resume();
bot = "Botão 15";
var playSound15b = ctx.createBufferSource();
var vb15 = document.getElementById('sld15').value;
playSound15b.buffer = audio15;
var gain15b = ctx.createGain();
playSound15b.connect(gain15b);
gain15b.connect(ctx.destination);
gain15b.connect(dest);
gain15b.gain.value = vb15;
socket.emit('outrosom2', bot);
playSound15b.start(ctx.currentTime);
console.log('Canal 15 acionado botão');
trocaCorBot("pb15");
}

function bPlay16(){
ctx.resume();
bot = "Botão 16";
var playSound16b = ctx.createBufferSource();
var vb16 = document.getElementById('sld16').value;
playSound16b.buffer = audio16;
var gain16b = ctx.createGain();
playSound16b.connect(gain16b);
gain16b.connect(ctx.destination);
gain16b.connect(dest);
gain16b.gain.value = vb16;
socket.emit('outrosom2', bot);
playSound16b.start(ctx.currentTime);
console.log('Canal 16 acionado botão');
trocaCorBot("pb16");
}

function bPlay17(){
ctx.resume();
bot = "Botão 17";
var playSound17b = ctx.createBufferSource();
var vb17 = document.getElementById('sld17').value;
playSound17b.buffer = audio17;
var gain17b = ctx.createGain();
playSound17b.connect(gain17b);
gain17b.connect(ctx.destination);
gain17b.connect(dest);
gain17b.gain.value = vb17;
socket.emit('outrosom2', bot);
playSound17b.start(ctx.currentTime);
console.log('Canal 17 acionado botão');
trocaCorBot("pb17");
}

function bPlay18(){
ctx.resume();
bot = "Botão 18";
var playSound18b = ctx.createBufferSource();
var vb18 = document.getElementById('sld18').value;
playSound18b.buffer = audio18;
var gain18b = ctx.createGain();
playSound18b.connect(gain18b);
gain18b.connect(ctx.destination);
gain18b.connect(dest);
gain18b.gain.value = vb18;
socket.emit('outrosom2', bot);
playSound18b.start(ctx.currentTime);
console.log('Canal 18 acionado botão');
trocaCorBot("pb18");
}

function bPlay19(){
ctx.resume();
bot = "Botão 19";
var playSound19b = ctx.createBufferSource();
var vb19 = document.getElementById('sld19').value;
playSound19b.buffer = audio19;
var gain19b = ctx.createGain();
playSound19b.connect(gain19b);
gain19b.connect(ctx.destination);
gain19b.connect(dest);
gain19b.gain.value = vb19;
socket.emit('outrosom2', bot);
playSound19b.start(ctx.currentTime);
console.log('Canal 19 acionado botão');
trocaCorBot("pb19");
}

function bPlay20(){
ctx.resume();
bot = "Botão 20";
var playSound20b = ctx.createBufferSource();
var vb20 = document.getElementById('sld20').value;
playSound20b.buffer = audio20;
var gain20b = ctx.createGain();
playSound20b.connect(gain20b);
gain20b.connect(ctx.destination);
gain20b.connect(dest);
gain20b.gain.value = vb20;
socket.emit('outrosom2', bot);
playSound20b.start(ctx.currentTime);
console.log('Canal 20 acionado botão');
trocaCorBot("pb20");
}

function bPlay21(){
ctx.resume();
bot = "Botão 21";
var playSound21b = ctx.createBufferSource();
var vb21 = document.getElementById('sld21').value;
playSound21b.buffer = audio21;
var gain21b = ctx.createGain();
playSound21b.connect(gain21b);
gain21b.connect(ctx.destination);
gain21b.connect(dest);
gain21b.gain.value = vb21;
socket.emit('outrosom2', bot);
playSound21b.start(ctx.currentTime);
console.log('Canal 21 acionado botão');
trocaCorBot("pb21");
}

function bPlay22(){
ctx.resume();
bot = "Botão 22";
var playSound22b = ctx.createBufferSource();
var vb22 = document.getElementById('sld22').value;
playSound22b.buffer = audio22;
var gain22b = ctx.createGain();
playSound22b.connect(gain22b);
gain22b.connect(ctx.destination);
gain22b.connect(dest);
gain22b.gain.value = vb22;
socket.emit('outrosom2', bot);
playSound22b.start(ctx.currentTime);
console.log('Canal 22 acionado botão');
trocaCorBot("pb22");
}

function bPlay23(){
ctx.resume();
bot = "Botão 23";
var playSound23b = ctx.createBufferSource();
var vb23 = document.getElementById('sld23').value;
playSound23b.buffer = audio23;
var gain23b = ctx.createGain();
playSound23b.connect(gain23b);
gain23b.connect(ctx.destination);
gain23b.connect(dest);
gain23b.gain.value = vb23;
socket.emit('outrosom2', bot);
playSound23b.start(ctx.currentTime);
console.log('Canal 23 acionado botão');
trocaCorBot("pb23");
}

function bPlay24(){
ctx.resume();
bot = "Botão 24";
var playSound24b = ctx.createBufferSource();
var vb24 = document.getElementById('sld24').value;
playSound24b.buffer = audio24;
var gain24b = ctx.createGain();
playSound24b.connect(gain24b);
gain24b.connect(ctx.destination);
gain24b.connect(dest);
gain24b.gain.value = vb24;
socket.emit('outrosom2', bot);
playSound24b.start(ctx.currentTime);
console.log('Canal 24 acionado botão');
trocaCorBot("pb24");
}

function bPlay25(){
ctx.resume();
bot = "Botão 25";
var playSound25b = ctx.createBufferSource();
var vb25 = document.getElementById('sld25').value;
playSound25b.buffer = audio25;
var gain25b = ctx.createGain();
playSound25b.connect(gain25b);
gain25b.connect(ctx.destination);
gain25b.connect(dest);
gain25b.gain.value = vb25;
socket.emit('outrosom2', bot);
playSound25b.start(ctx.currentTime);
console.log('Canal 25 acionado botão');
trocaCorBot("pb25");
}

function bPlay26(){
ctx.resume();
bot = "Botão 26";
var playSound26b = ctx.createBufferSource();
var vb26 = document.getElementById('sld26').value;
playSound26b.buffer = audio26;
var gain26b = ctx.createGain();
playSound26b.connect(gain26b);
gain26b.connect(ctx.destination);
gain26b.connect(dest);
gain26b.gain.value = vb26;
socket.emit('outrosom2', bot);
playSound26b.start(ctx.currentTime);
console.log('Canal 26 acionado botão');
trocaCorBot("pb26");
}

function bPlay27(){
ctx.resume();
bot = "Botão 27";
var playSound27b = ctx.createBufferSource();
var vb27 = document.getElementById('sld27').value;
playSound27b.buffer = audio27;
var gain27b = ctx.createGain();
playSound27b.connect(gain27b);
gain27b.connect(ctx.destination);
gain27b.connect(dest);
gain27b.gain.value = vb27;
socket.emit('outrosom2', bot);
playSound27b.start(ctx.currentTime);
console.log('Canal 27 acionado botão');
trocaCorBot("pb27");
}

function bPlay28(){
ctx.resume();
bot = "Botão 28";
var playSound28b = ctx.createBufferSource();
var vb28 = document.getElementById('sld28').value;
playSound28b.buffer = audio28;
var gain28b = ctx.createGain();
playSound28b.connect(gain28b);
gain28b.connect(ctx.destination);
gain28b.connect(dest);
gain28b.gain.value = vb28;
socket.emit('outrosom2', bot);
playSound28b.start(ctx.currentTime);
console.log('Canal 28 acionado botão');
trocaCorBot("pb28");
}

function bPlay29(){
ctx.resume();
bot = "Botão 29";
var playSound29b = ctx.createBufferSource();
var vb29 = document.getElementById('sld29').value;
playSound29b.buffer = audio29;
var gain29b = ctx.createGain();
playSound29b.connect(gain29b);
gain29b.connect(ctx.destination);
gain29b.connect(dest);
gain29b.gain.value = vb29;
socket.emit('outrosom2', bot);
playSound29b.start(ctx.currentTime);
console.log('Canal 29 acionado botão');
trocaCorBot("pb29");
}

function bPlay30(){
ctx.resume();
bot = "Botão 30";
var playSound30b = ctx.createBufferSource();
var vb30 = document.getElementById('sld30').value;
playSound30b.buffer = audio30;
var gain30b = ctx.createGain();
playSound30b.connect(gain30b);
gain30b.connect(ctx.destination);
gain30b.connect(dest);
gain30b.gain.value = vb30;
socket.emit('outrosom2', bot);
playSound30b.start(ctx.currentTime);
console.log('Canal 30 acionado botão');
trocaCorBot("pb30");
}

function bPlay31(){
ctx.resume();
bot = "Botão 31";
var playSound31b = ctx.createBufferSource();
var vb31 = document.getElementById('sld31').value;
playSound31b.buffer = audio31;
var gain31b = ctx.createGain();
playSound31b.connect(gain31b);
gain31b.connect(ctx.destination);
gain31b.connect(dest);
gain31b.gain.value = vb31;
socket.emit('outrosom2', bot);
playSound31b.start(ctx.currentTime);
console.log('Canal 31 acionado botão');
trocaCorBot("pb31");
}

function bPlay32(){
ctx.resume();
bot = "Botão 32";
var playSound32b = ctx.createBufferSource();
var vb32 = document.getElementById('sld32').value;
playSound32b.buffer = audio32;
var gain32b = ctx.createGain();
playSound32b.connect(gain32b);
gain32b.connect(ctx.destination);
gain32b.connect(dest);
gain32b.gain.value = vb32;
socket.emit('outrosom2', bot);
playSound32b.start(ctx.currentTime);
console.log('Canal 32 acionado botão');
trocaCorBot("pb32");
}

////////////  acionar a gravação com keypress da tecla 3

////função para mudar cor de botão quando for clicado.

//
// function clicado(){
//
// }
//
//
// topBots.addEventListener('click', clicado);
//
// function startrec(event) {
// 	/// tecla 3
// 	if (event.keyCode == "51") {
//     console.log("Gravando ....");
// 		recorder.start();
//     chunks1.lenght =0;
// 	}
// }
//
// ///////////  parar de gravar  com keypress da tecla 4
// function stoprec(event) {
// 	//// tecla 4
// 	if (event.keyCode == "52") {
//     console.log("stop!");
// 		recorder.stop();
//
//     //chunks.length = 0;
//     // document.getElementById('adown').controls = true;
//     // document.getElementById('adown').loop = true;
//     // document.getElementById('adown').autoplay = true;
// 	}
// }

let botRec = document.getElementById('recordBtn');
let clienteMode = false;
var recGravinaMode = true;
let setId;

function recBtn (){
  if (clienteMode == false){
    criaUser();
  } else {
    chunks1=[];
    recorder.start();
    botRec.innerHTML = "Gravando...";
    botRec.style.backgroundColor = "red";
    //playVideo();
    console.log("Gravando ....");
    audioPlaying=false;


  }
}
////////////gravação de trilha sonora
function recBtnTrilha (){
  if (clienteMode == false){
    criaUser();
    var video = document.getElementById('videoBase');
    //var a = document.getElementById('adown');
    video.pause();
    video.currentTime = 0;
  } else {
    chunks1=[];
    recorder.start();
    botRec.innerHTML = "Gravando...";
    botRec.style.backgroundColor = "red";
    //playVideo();
    console.log("Gravando ....");

  }
}
/////////////////  função que da feedback visual de que está gravando o audio do cliente no botão de gravar.


let trilhaRecMode = false;
////////////////////
function salvaBtn(){
  recorder.stop();
  botRec.innerHTML = "<ion-icon name=recording-sharp size=large></ion-icon>";
  audioPlaying = true;
  trilhaRecMode = false;
}

////////////////////
function salvaBtnTrilha(){
  let recTrilhaBot = document.getElementById('gravaTrilhaBtn');
  recorder.stop();
  recTrilhaBot.innerHTML = "<ion-icon name=recording-sharp size=large></ion-icon>";
}
//////////////////////////////////

///////// teste para ver o problema de gravar errado quando usa botão para acionar o som dos canais.
function playTrilhaMaster(){
  let vd = document.getElementById('videoBase');
  vd.play();
  console.log("Apresentando a trilha master do momento.");
}

///////////////////////

var aMixElem1;
//gravador
recorder.ondataavailable = evt => {
chunks1.push(evt.data);
}

let wavesurfer;
//////////////////////////// gravador ligado ao ctx pelo mediarecorder dest object
let userGravContador = 0;
let userTrilhaContador = 0;
////////// cria a track do web
//      audio api que se conecta no gravador fora do stop recorder
//      serve como um canal geral da mix de todos os nodes conectados em dest. Coloquei fora
//      do stop recorder porque a primeira gravação não estava captando os espaços sem som. Bug.
//   a apartir da segunda operava certo devia ser algum problema com a criação da instância do trackUs
//   não ter tempo de receber o audUs direito na primeira gravação. Talvez usa uma async function dentro do
//   stop recorder possa resolver, mas colocando a trackMix fora do stop recorder funcionou...
var audUserMix = document.createElement('audio');
audUserMix.className = "audUser";
audUserMix.controls = true;
//audUser.id = "audUser";
audUserMix.loop = true;
var trackMix = ctx.createMediaElementSource(audUserMix);
trackMix.connect(ctx.destination);
trackMix.connect(dest);
//////////////////////////////////////////////////////////////////
let clienteAudios = [];

function playTrilha(audi, sr){
  let videobase = document.getElementById('videoBase');
  videobase.src = "./videos/"+sr+".webm";
  videobase.volume = 0;
  showDivTrilhaSonora();
  videobase.play();
  audi.play();
  trilhaPlaying=true;
  document.getElementById('divTrilhaSonora').style = "display:flex";

}

recorder.onstop = evt => {
var blob1 = new Blob(chunks1, {type : 'audio/ogg; codecs=opus'});

//var file = new File(audioFile, "testeRecBlob.ogg", {type: 'audio/ogg; codecs=opus', lastModified: d})

if (trilhaRecMode == true){
  ///////////// cria audio para o blob gravado no cliente
  userTrilhaContador+=1;
  let audTUser = document.createElement('audio');
  console.log("olha a id do audio element de trilha local:");
  audTUser.id = "audioTrilha"+userTrilhaContador+cliente.id;
  console.log(audTUser.id);
  let trilha = new Trilha();
  let vsrc = document.getElementById('videoMenu').value;
  console.log(vsrc);
  trilha.videosrc = vsrc;
  trilha.criador = cliente.nome;
  cliente.trilhas.push(trilha);
  audTUser.src = window.URL.createObjectURL(blob1);
  trilha.audio = audTUser;
  console.log(trilha.audio);
  trilha.blob = blob1;
  var trackUs = ctx.createMediaElementSource(audTUser);
  trackUs.connect(ctx.destination);
  trackUs.connect(dest);
  audTUser.className = "audTUser";
  audTUser.style = "display:none";
  audTUser.controls = true;
  audTUser.loop = false;
  cliente.recBlob = blob1;
  cliente.recBlobs.push(blob1);
  cliente.gravinas = userTrilhaContador;
  console.log(cliente.nome +" Acabou de gravar trilha sonora e enviar!");

  ////////////////// cria div para o botão do usuário e blob rec  wave
  var divTrilhaGaleria = document.getElementById('divTrilhaGaleria');
  ////////////////////////////////////////////////////
  let trilhaIcon = document.createElement('img');
  trilhaIcon.src = "./imgs/trilhaAlfa100.png";
  var usTrilhaDiv = document.createElement('div');
  var capaUsDiv = document.createElement('div');
  capaUsDiv.className = "capaUsTrilhaDiv";
  usTrilhaDiv.className = "usTrilhaDiv";
  usTrilhaDiv.id = "usDiv"+ userTrilhaContador;
  var usBot = document.createElement('button');
  usBot.className = "usBot";
  usBot.innerHTML = cliente.nome + " </br> Trilha " + userTrilhaContador;

  //usDiv.append(ondaDiv);
  var botDelete = document.createElement('button');
  botDelete.className ="bDel";
  botDelete.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
  capaUsDiv.append(usBot);
  capaUsDiv.append(trilhaIcon);
  capaUsDiv.append(botDelete);
  usTrilhaDiv.append(capaUsDiv);
  usTrilhaDiv.append(audTUser);
  { const nDelT = userTrilhaContador; botDelete.onclick = function(){usTrilhaDiv.remove(); window.Armazenamento && Armazenamento.apagaTrilha(nDelT);}; }
  divTrilhaGaleria.append(usTrilhaDiv);
  trilhaIcon.onclick = function(){playTrilha(audTUser, trilha.videosrc);};
  let tri = trilha;
  tri.nome = "Trilha_" + userTrilhaContador;
  tri.contador = userTrilhaContador;
  socket.emit('serveTrilha', tri);

} else {
  ///////////// cria audio para o blob gravado no cliente
  userGravContador+=1;
  let newBlob = new RecBlob();
  var time = new Date();
  var date = time.getDate()+'-'+(time.getMonth()+1)+'-'+time.getFullYear()+"- "+ time.getHours()+" hr: "+time.getMinutes()+":min ";
  console.log("O criador "+ cliente.nome+" acaba de gravar um áudio.");
  newBlob.time = date;
  newBlob.blob = blob1;
  newBlob.criador = cliente.nome;
  newBlob.avatar = cliente.avatar;
  console.log("olha aqui a hora da gravação do blob: ");
  console.log(newBlob.time);
  var audUser = document.createElement('audio');
  audUser.src = window.URL.createObjectURL(blob1);
  var trackUs = ctx.createMediaElementSource(audUser);
  trackUs.connect(ctx.destination);
  trackUs.connect(dest);
  audUser.className = "audUser";
  audUser.controls = true;
  audUser.loop = true;
  cliente.recBlob = blob1;
  cliente.recBlobs.push(blob1);
  cliente.gravinas = userGravContador;
  socket.emit('updateBlob', cliente);
  socket.emit('sendObjBlob', newBlob);
  let cl = cliente;
  socket.emit('recBlob', cl);// envia o cliente.blob para gravação e contagem no servidor.
  console.log(cliente.nome +" Acabou de gravar um som e enviar!");
  console.log(cliente);
  ////////////////// cria div para o botão do usuário e blob rec  wave
  var audioUsersDiv = document.getElementById('audioCombo');
  //var ondaDiv = document.createElement('div');
  //ondaDiv.id = "blobWave";
  ////////////////////////////////////////////////////
  var usDiv = document.createElement('div');
  var capaUsDiv = document.createElement('div');
  capaUsDiv.id = "capaUsDiv";
  usDiv.className = "usDiv";
  usDiv.id = "usDiv"+ userGravContador;
  var usBot = document.createElement('button');
  usBot.className = "usBot";
  usBot.innerHTML = cliente.nome + " </br> Gravação " + userGravContador+": at "+ date;
  audUser.id = "audio"+userGravContador+cliente.id;
  //usDiv.append(ondaDiv);
  var botDelete = document.createElement('button');
  botDelete.className ="bDel";
  botDelete.innerHTML ="<ion-icon name=trash-sharp size=large></ion-icon>";
  capaUsDiv.append(usBot);
  capaUsDiv.append(botDelete);
  usDiv.append(capaUsDiv);
  usDiv.append(audUser);
  { const nDel = userGravContador; botDelete.onclick = function(){usDiv.remove(); window.Armazenamento && Armazenamento.apagaGravacao(nDel);}; }
  audioUsersDiv.append(usDiv);
  clienteAudios.push(audUser);
  console.log("Aqui estão os audios num array:");

  }


}


//////////////////listener para click toca o blob gravado quando clica a onda.




///////////////////////////////////////
function playVideo(){
  var video = document.getElementById('videoBase');
  video.play();

}

function gravaTrilha(){
  trilhaRecMode = true;
  trilhaPlaying = false;
  var video = document.getElementById('videoBase');
  var brectrilha = document.getElementById('gravaTrilhaBtn');
  video.volume = 0;
  chunks1=[];
  recorder.start();
  brectrilha.innerHTML = "Gravando...";
  brectrilha.style.backgroundColor = "red";
  //playVideo();
  console.log("Gravando trilha sonora....");
  video.play();

}


function stopAudiosTrilhas(){
  let vide = document.getElementById('videoBase');
  vide.pause();
  vide.currentTime=0;
  let audiosTrilhas = document.getElementsByClassName('audTUser');
  for (var i = 0; i<= audiosTrilhas.length; i++){
       audiosTrilhas[i].pause();
       audiosTrilhas[i].currentTime=0;
    }
  console.log("trilhas aqui : ");
}

/// função para ao parar uma gravação pare também o audio base voltando a time=0
function stopAudiosGravinas(){
  let audiosGravinas = document.getElementsByClassName('audUser');
    for (var i = 0; i<=audiosGravinas.length; i++){
       audiosGravinas[i].pause();
       audiosGravinas[i].currentTime=0;
      }
console.log("Aqui vão as gravinas que foram mutadas agora.");
console.log(audiosGravinas);
}

var trilhaPlaying = false;
var audioPlaying = false;
// função para salvar uma trilha ou para parar uma trilha que esteja passando.
function stopVideo()  {
  if (trilhaRecMode == true && trilhaPlaying==false){
    var video2 = document.getElementById('videoBase');
    //var a = document.getElementById('adown');
    video2.pause();
    video2.currentTime = 0;
    console.log();
  //  a.pause();
  //  a.currentTime=0;
    salvaBtnTrilha();
    trilhaPlaying = true;



  } else {
    stopAudiosTrilhas();
    }
}

function stopGrav()  {
  if (trilhaRecMode == false && audioPlaying==false){
    salvaBtn();
    audioPlaying = true;
    stopAudiosGravinas();

  } else {
    stopAudiosGravinas();

  }
}


function stopAudio(){
  var audio = document.getElementById('adown');
  audio.pause();
  audio.currentTime =0;
}

function playAudio(){
  var audio = document.getElementById('adown');
  audio.play();
}

///////////botão de play sincronizado audio e video
function playAudVideo(){
 var video = document.getElementById('videoPlayer');
 var aud = document.getElementById('adown');
  video.currentTime=0;
  aud.currentTime=0;
  video.play();
  aud.play();
}

/////////////////////função que para de tocar audio com o keyup event nas teclas
//////////////////// para evitar o efeito de metralhadora nas amostras de audio acionadas com keypres
//
function paraSom(event) {
  if (event.keyCode == "65"){
      c1Press = false;
    } else if (event.keyCode == "83"){
      c2Press = false;
    }else if (event.keyCode == "68"){
      c3Press = false;
    }else if (event.keyCode == "70"){
      c4Press = false;
    }else if (event.keyCode == "71"){
      c5Press = false;
    }else if (event.keyCode == "72"){
      c6Press = false;
    }else if (event.keyCode == "74"){
      c7Press = false;
    }else if (event.keyCode == "75"){
      c8Press = false;
    }else if (event.keyCode == "90"){
      c9Press = false;
    }else if (event.keyCode == "88"){
      c10Press = false;
    }else if (event.keyCode == "67"){
      c11Press = false;
    }else if (event.keyCode == "86"){
      c12Press = false;
    }else if (event.keyCode == "66"){
      c13Press = false;
    }else if (event.keyCode == "78"){
      c14Press = false;
    }else if (event.keyCode == "77"){
      c15Press = false;
    }else if (event.keyCode == "188"){
      c16Press = false;
    }else if (event.keyCode == "49"){
      c17Press = false;
    }else if (event.keyCode == "50"){
      c18Press = false;
    }else if (event.keyCode == "51"){
      c19Press = false;
    }else if (event.keyCode == "52"){
      c20Press = false;
    }else if (event.keyCode == "53"){
      c21Press = false;
    }else if (event.keyCode == "54"){
      c22Press = false;
    }else if (event.keyCode == "55"){
      c23Press = false;
    }else if (event.keyCode == "56"){
      c24Press = false;
    }else if (event.keyCode == "57"){
      c25Press = false;
    }else if (event.keyCode == "48"){
      c26Press = false;
    }else if (event.keyCode == "81"){
      c27Press = false;
    }else if (event.keyCode == "87"){
      c28Press = false;
    }else if (event.keyCode == "69"){
      c29Press = false;
    }else if (event.keyCode == "82"){
      c30Press = false;
    }else if (event.keyCode == "84"){
      c31Press = false;
    }else if (event.keyCode == "89"){
      c32Press = false;
    }

}


////listenner para as teclas pressionadas
window.addEventListener("keydown", playback);
////listenner para as teclas soltas
window.addEventListener("keyup", paraSom);




//começa a gravar apertando a tecla3
//window.addEventListener("keydown", startrec);
//para gravação apertando a tecla4
//window.addEventListener("keydown", stoprec);
