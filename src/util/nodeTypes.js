import {getFontWidth} from './index'
import * as nodeStyle from '../nodeStyle'

class Identifier {
  constructor (){
    
  }
  createEndIdentifier (...arg){
    const ident = new this.constructor(...arg);
    ident.header = this;
    this.end = ident;
    return ident;
  }
}
class Style extends Identifier {
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

class Placeholder extends Identifier {
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

class Text extends Placeholder {
  constructor (value){
    super();
    this.name = 'span';
    this.value = value;
    this.real = value;
    this.width = 0;
  }
  setWidth (){
    
  }
}

class Space extends Text {
  constructor (){
    super();

    this.value = '&nbsp';
    this.real = '\x20';
  }
}

class Tab extends Text {
  constructor (){
    super();
    
    this.value = '&nbsp&nbsp&nbsp&nbsp';
    this.real = '\x20\x20\x20\x20';
  }
}

class Enter extends Text {
  constructor (){
    super();
    this.name = 'br';
    this.value = '<br>';
    this.real = '\n';
  }
}

class Group extends Identifier {
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

class MathTag extends Group {
  constructor (attrs={}){
    super();
    this.name = 'div';
    this.attrs = attrs;
    this.style = Object.assign({}, nodeStyle.mathTag);

    this.init()
  }
  // init (){

  // }
}


export {Identifier, Style, Group, Placeholder, MathTag, Text, Space, Tab, Enter}