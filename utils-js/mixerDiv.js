
export function mixerDiv(arrTeclas, arrOptions, conteiner, arrayCanais) {

  //array com os nomes das teclas que estarão nos botões de cada canal na interface
const teclasBots = ["a", "s", "d", "f", "g", "h", "j", "k","z","x", "c", "v","b", "n", "m", "Bases"];

const canais = function(nCanais) {


};

const canaisDiv = arr.map((item,index) => `
    <div class=canal-div>
      <h2 >canal ${index+1}</h2>
      <select name="sons" id="menu${index+1}" class="menus" onchange="trocaSom${index+1}()">
        <option value=${item} selected="selected">${index+1}</option>
        <button id=pb${index+1} class="play-bots" onclick="bPlay${index+1}()">${teclasBots[i]}</button>
        <input type="range" class="sliders" id=type="range" min="0" max=1.0 step="0.1"/>
    </div>
    `
    );
   conteiner.innerHTML = canaisDiv.join("");
   console.log(`Eis os canais em seu conteiner 
                 ${conteiner}`);

}

