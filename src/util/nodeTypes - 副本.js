function text (value){
  return {
    type: 'text',
    value
  }
}
function placeholder (content, className, style={}, attrs={}){
  return {
    type: 'placeholder',
    name: 'span',
    value: ' ',
    attrs:{
      attrs: Object.assign({
        class: 'placeholder ' + className,
      }, attrs),
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
function style (name, attrs={}){
  return {
    type: 'style',
    name,
    attrs
  }
}
function closed(){
  return {
    type: 'closed',
  }
}

export {text, placeholder, enter, style, closed}