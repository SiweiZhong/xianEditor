function text (value){
  return {
    type: 'text',
    value
  }
}
function placeholder (content, className, style={}, attr={}){
  return {
    type: 'placeholder',
    name: 'span',
    value: content,
    attrs:{
      attrs: Object.assign({
        class: 'placeholder ' + className,
      }, attr),
      style,
    }
  }
}
function enter (name){
  return {
    type: 'enter',
    name,
  }
}
function style (name, attr){
  return {
    type: 'style',
    value: {
      name, attr
    },
  }
}
function closed(){
  return {
    type: 'closed',
  }
}

export {text, placeholder, enter, style, closed}