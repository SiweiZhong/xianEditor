import store from '../reducers'

import {addKey, setLocation, setOrigin} from '../actions'
import {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} from '../util/nodeTypes'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function addWord (key){
  if(key == ' '){
    store.dispatch(addKey(new Space()));
  }else if(key == 'Tab'){
    store.dispatch(addKey(new Tab()));
  }else{
    store.dispatch(addKey(new Text(key)));
  }
  
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
}

export function addPlaceholder (node){
  store.dispatch(addKey(node));
  tore.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
}

export function addEnter (){
  store.dispatch(addKey(new Enter()));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
}