import * as constants from '../constants'
import {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} from '../util/nodeTypes'

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
    if(a == b) return state;

    if(a > b){
      let c = b;
      b = a;
      a = c;
    }
    state = [...state];

    const w = new Style({'font-weight': 'bold'});
    state.splice(a, 0, w);
    state.splice(b+1, 0, w.createEndIdentifier());
    return state;
  }

  default:
    return state
  }
}