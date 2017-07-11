import Identifier from './Identifier.js'
export default class Style extends Identifier {
  constructor (style={}){
    super();
    this.name = 'span';
    this.style = style;
    this.init()
  }
  init (){
    this.width = this.style.width || 0;
  }
  replace (width){
    this.width = width;
  }
}