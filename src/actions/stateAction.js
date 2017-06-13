import constants from '../constants'

export default {
  moveLeft(span=1){
    return {type: constants.MOVE_LEFT, span}
  },
  moveRight(span=1){
    return {type: constants.MOVE_RIGHT, span}
  },
  moveUp(span=1){
    return {type: constants.MOVE_UP, span}
  },
  moveDown(span=1){
    return {type: constants.MOVE_DOWN, span}
  },
  setLocation (location){
    return {type: constants.SET_LOCATION, value: location}
  },
  setOrigin (location){
    return {type: constants.SET_ORIGIN, value: location}
  },
  setRowsIndex (location){
    return {type: constants.SET_ROWS_INDEX, value: location}
  },
  removeRowsIndex (values){
    if(!(values instanceof Array)){
      values = [values]
    }
    return {type: constants.REMOVE_ROWS_INDEX, value: values}
  },
  scaKey (shiftKey, ctrlKey, altKey){
    return {type: constants.S_C_A_KEY, value: {shiftKey, ctrlKey, altKey}}
  }
}