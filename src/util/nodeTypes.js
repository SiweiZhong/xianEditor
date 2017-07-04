import {getFontWidth} from './index'

class Identifier {
  constructor (){
    
  }
  end (){
    const ident = new Identifier();
    ident.header = this;
    this.end = ident;
    return ident;
  }
}
class Style extends Identifier {
  constructor (style={}){
    super();
    this.name == 'span';
    this.style = style;
    this.init()
  }
  init (){
    this.width = this.style.width;
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
  constructor (attrs={}, style={}, value){
    super();

    this.attrs = attrs;
    this.style = style;
    this.value = value;
    this.real = value;
    
    this.init()
  }
  init (){
    getFontWidth(this.real);
  }
}

class Space extends Text {
  constructor (){
    super();

    this.value = '&nbsp';
    this.real = '\b';

    this.init()
  }
}

class Tab extends Text {
  constructor (){
    super();
    
    this.value = '&nbsp&nbsp&nbsp&nbsp';
    this.real = '\b\b\b\b';

    this.init()
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