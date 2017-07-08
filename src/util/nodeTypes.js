import {getFontWidth} from './index'

class Identifier {
  constructor (){
    
  }
  createEndIdentifier (){
    const ident = new this.constructor();
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
    this.width = width || 0;
    this.height = height || 0;
  }
  replace (width){
    this.width = width;
  }
}

class MathTag extends Placeholder {
  constructor (attrs={}, style={}){
    super();
    this.name = name;
    this.attrs = attrs;
    this.style = style;
    this.value = 'M';
    
    this.init()
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
    this.value = '';
    this.real = '\n';
  }
}

export {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter}