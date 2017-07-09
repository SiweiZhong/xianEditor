import store from '../reducers'

import {getFontWidth} from '../util'
import {updateWordsProps} from './public'

import {addKey, setLocation, setOrigin} from '../actions'
import {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} from '../util/nodeTypes'

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
  // setWordProps(word);
  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
  
  updateWordsProps();
}

export function addPlaceholder (node){
  store.dispatch(addKey(node));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
}

export function addEnter (){
  const word = new Enter()
  // setWordProps(word);

  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location+1));
  store.dispatch(setOrigin(tree.editorState.location));
  updateWordsProps();
}

function setWordProps (word){
  let loc = tree.editorState.location-1;
  loc = loc == -1 ? 0 : loc;

  if(word instanceof Style){
    return;
  }

  let rowNum = 0;
  while(loc > 0){
    const _word = tree.words[loc--];
    if(typeof _word.rowNum == 'number'){
      rowNum = _word.rowNum;
      if(_word instanceof Enter){
        rowNum++;
      }
      break;
    }
  }
  word.rowNum = rowNum;

  const len = tree.editorState.location;
  const arr = [word.real];
  for(let i=1;i<=len;i++){
    const _word = tree.words[len-i];
    if(_word.rowNum == rowNum){
      if(_word.real) arr.push(_word.real)
    }else{
      break;
    }
  }

  const text = arr.join('');
  let width = getFontWidth(text);
  if(width > tree.editorState.width){
    width = getFontWidth(word.real);
    word.rowNum++
  }
  word.width = width;
}