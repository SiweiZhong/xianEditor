import store from '../reducers'

import {addKey, setRowsIndex, setLocation} from '../actions'
import {text, placeholder, enter, style, closed} from '../util/nodeTypes'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function addSpace(){
  store.dispatch(addKey(placeholder('space')));
  store.dispatch(setLocation(tree.editorState.location+1));
}
export function addEnter(){
  store.dispatch(setRowsIndex(tree.editorState.location));
  store.dispatch(addKey(enter('br')));
  store.dispatch(setLocation(tree.editorState.location+1));
}