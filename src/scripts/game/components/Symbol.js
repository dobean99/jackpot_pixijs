export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;
  }
  static get symbols() {
    return ["Jk", "Kg", "Ac", "P1", "P2", "P3", "P4", "P5", "WX", "SC"];
  }
  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
