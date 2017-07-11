export default class Identifier {
  constructor (){
    
  }
  createEndIdentifier (...arg){
    const ident = new this.constructor(...arg);
    ident.header = this;
    this.end = ident;
    return ident;
  }
}