import constants from '../constants'

export function words(state=[], action, editorState){
  const {location, origin} = editorState;
  switch(action.type){
  case constants.ADD_KEY:
    state = [...state];
    state.splice(location, 0, action.value);
    return state
  case constants.BACKSPACE: {
    state = [...state];
    state.splice(location, 1);
    return state;
  }
  case constants.ADD_B: {
    let a = origin, b = location;
    if(a > b){
      let c = b;
      b = a;
      a = c;
    }
    if(a == b) return state;

    state = [...state];
    
    state.splice(a, 0, {type:'style', value:{name:'b'}});
    state.splice(b+2, 0, {type:'closed'});

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