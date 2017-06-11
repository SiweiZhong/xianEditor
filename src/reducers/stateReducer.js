import constants from '../constants'

const initEditorState = {
  location: 0,
}
export function editorState(state=initEditorState, action){
  switch(action.type){
    case constants.SET_LOCATION:
      return Object.assign({}, state, {
        location: action.value
      })
    default:
      return state;
  }
}