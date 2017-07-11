import store from '../reducers'

import {getFontWidth} from '../util'
import {updateWordsProps} from './public'

import {addKey, setLocation, setOrigin} from '../actions'
import {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} from '../nodeTypes'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function addWord (key){
  let word;
  if(key == ' '){
    word = new Space()
  }else if(key == 'Tab'){
    word = new Tab()
  }else{
    word = new Text(key)
  }
  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
  
  updateWordsProps(tree.editorState.location);
}

export function addPlaceholder (node){
  store.dispatch(addKey(node));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));

  updateWordsProps(tree.editorState.location);
}

export function addMath (){
  const start = new MathTag({class:"math_tag"});
  
  store.dispatch(addKey(new Text('$')));
  store.dispatch(addKey(start));
  
  store.dispatch(setLocation(tree.editorState.location+2));
  store.dispatch(addKey(start.createEndIdentifier()));
  store.dispatch(addKey(new Text('$')));
  
  store.dispatch(setOrigin(tree.editorState.location));

  updateWordsProps(tree.editorState.location-2);
}

export function addEnter (){
  const word = new Enter();

  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
  updateWordsProps(tree.editorState.location);
}
