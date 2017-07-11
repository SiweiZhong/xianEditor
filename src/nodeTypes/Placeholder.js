import Identifier from './Identifier'
export default class Placeholder extends Identifier {
  constructor (name, attrs={}, style={}, value){
    super();
    
    this.name = name;
    this.attrs = attrs;
    this.style = style;
    this.value = value;
    
    this.init();
  }
  init (){
    const {width, height} = this.style;
    this.width = 0;
    this.height = 0;
    if(width){
      this.width = +width.match(/\d+/)[0] || 0;
    }
    if(height){
      this.height = +height.match(/\d+/)[0] || 0;
    }
    this._w = this.width;
    this._h = this.height;
  }
  replace (width){
    this.width = width;
  }
}