import Identifier from './Identifier'
export default class Group extends Identifier {
  constructor (style={}){
    super();
    this.name = 'div';
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