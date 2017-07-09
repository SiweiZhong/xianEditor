import * as constants from '../constants'
function moveLeft(span=1){
  return {type: constants.MOVE_LEFT, span}
}
function moveRight(span=1){
  return {type: constants.MOVE_RIGHT, span}
}
function moveUp(span=1){
  return {type: constants.MOVE_UP, span}
}
function moveDown(span=1){
  return {type: constants.MOVE_DOWN, span}
}
function setLocation (location){
  return {type: constants.SET_LOCATION, value: location}
}
function setOrigin (location){
  return {type: constants.SET_ORIGIN, value: location}
}
function scaKey (shiftKey, ctrlKey, altKey){
  return {type: constants.S_C_A_KEY, value: {shiftKey, ctrlKey, altKey}}
}
function setWidth (width){
  return {type: constants.SET_WIDTH, value: width}
}
function setHeight (height){
  return {type: constants.SET_HEIGHT, value: height}
}
function setAutoLinefeed (v){
  return {type: constants.AUTO_LINEFEED, value: v}
}
export {moveLeft, moveRight, moveUp, moveDown, setLocation, setOrigin, removeRowsIndex, scaKey, setWidth, setHeight, setAutoLinefeed}