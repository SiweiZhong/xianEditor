import * as constants from '../constants'

const initEditorState = {
  location: 0,
  origin: 0,
  rowsIndex: [],
  shiftKey: false,
  ctrlKey: false,
  altKey: false,
  autoLinefeed: true,
}
export function editorState(state=initEditorState, action){
  switch(action.type){

    case constants.SET_LOCATION:
      return Object.assign({}, state, {
        location: action.value
      })

    case constants.SET_ORIGIN:
      return Object.assign({}, state, {
        origin: action.value
      })

    case constants.S_C_A_KEY: {
      const {shiftKey, ctrlKey, altKey} = action.value;
      return Object.assign({}, state, {
        shiftKey, ctrlKey, altKey
      })
    }

    case constants.SET_WIDTH:
      return Object.assign({}, state, {
        width: action.value
      })

    case constants.SET_HEIGHT:
      return Object.assign({}, state, {
        height: action.value
      })

    case constants.AUTO_LINEFEED:
      return Object.assign({}, state, {
        autoLinefeed: action.value
      })

    default:
      return state;
  }
}