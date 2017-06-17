function text (value){
  return {
    type: 'text',
    value
  }
}
function placeholder (className){
  return {
    type: 'placeholder',
    value: {
      name: 'span',
      attr: {
        class: className,
      }
    }
  }
}
function enter (value){
  return {
    type: 'enter',
    value:{
      name: 'br',
    }
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