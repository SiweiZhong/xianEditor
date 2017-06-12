import constants from '../constants'

export default {
  addKey(word){
    return {type: constants.ADD_KEY, value: word}
  },
  backspace(){
    return {type: constants.BACKSPACE}
  },
}
