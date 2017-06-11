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
}