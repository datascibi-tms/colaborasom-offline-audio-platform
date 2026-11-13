import Canal from './Canal.js';

export default function criaCanais(arr){
 const canais = arr.map((som, index) => {
  const canal = new Canal();
  canal.nome = `canal ${index+1}`;
  canal.volume = 0.6;
  canal.src = `${som}.ogg`;
  return canal;
 });
 console.log(`Eis os canais gerados`,canais);
 return canais;
}

