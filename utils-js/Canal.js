export default class Canal {
  constructor(nome, tecla, volume, src) {
    this.nome = nome;
    this.tecla = tecla;
    this.volume = volume;
    this.src = src;
  }

  falar() {
    console.log(`Olá, meu nome é ${this.nome}.`);
  }
}