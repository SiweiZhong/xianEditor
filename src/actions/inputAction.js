import * as constants from '../constants'
function addKey(word){
  return {type: constants.ADD_KEY, value: word}
}
function backspace(){
  return {type: constants.BACKSPACE}
}
function addB(){
  return {type: constants.ADD_B}
}
export {addKey, backspace, addB}
