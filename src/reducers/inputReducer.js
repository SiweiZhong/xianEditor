import constants from '../constants'

export function words(state=[], action, editorState){
  const {location} = editorState;
  switch(action.type){
  case constants.ADD_KEY:
    state = [...state];
    state.splice(location, 0, action.value);
    return state
  case constants.BACKSPACE:{
    state = [...state];
    state.splice(location, 1);
    return state;
  }
  default:
    return state
  }
}

export function rowsIndex(state=[], action, location){
  switch(action.type){
  case constants.ADD_ROW:
    return [
      ...state,
      {
        value: action.key
      }
    ]
  default:
    return state
  }
}