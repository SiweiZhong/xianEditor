import store from '../reducers'
import {setLocation, setOrigin} from '../actions'
import {whereAmI} from '../util/'

import {Identifier, Style, Group, Placeholder, MathTag, Text, Space, Tab, Enter} from '../nodeTypes'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})


export function moveUp(){
  if(tree.words.length == 0) return;

  let {x, y} = whereAmI(tree.words, tree.editorState.location);//x y是下标从零计数
  
  let loc = tree.editorState.location;
  let n = 0;
  let i = loc > 0 ? loc-1 : 0;
  for(;i>=0;i--){
    if(tree.words[i] instanceof Style){
      loc--;
      continue;
    }
    if(tree.words[i].rowNum < y-1){
      break;
    }

    loc--;
    if(tree.words[i].rowNum == y-1){
      n++;
    }
    
  }
  loc += n > x ? x : n-1;
  loc = loc < 0 ? 0 : loc;

  store.dispatch(setLocation(loc));
  if(!tree.editorState.shiftKey){
    store.dispatch(setOrigin(tree.editorState.location));
  }
}
export function moveDown(){
  if(tree.words.length == 0) return;

  let {x, y} = whereAmI(tree.words, tree.editorState.location);

  let loc = tree.editorState.location;
  let n = 0;

  const length = tree.words.length;
  let i = loc == length-1 ? length : loc;
  for(;i<length;i++){
    if(tree.words[i] instanceof Style){
      loc++;
      continue;
    }
    if(tree.words[i].rowNum > y+1){
      break;
    }

    if(tree.words[i].rowNum == y+1){
      if(n == x){
        break;
      }
      n++;
    }
    loc++;
  }
  store.dispatch(setLocation(loc));

  if(!tree.editorState.shiftKey){
    store.dispatch(setOrigin(tree.editorState.location));
  }
}
export function moveLeft(){
  while(tree.editorState.location > 0){
    const x = tree.editorState.location-1;
    const word = tree.words[x];

    if(word instanceof Style){
      store.dispatch(setLocation(x));
    }else{
      store.dispatch(setLocation(x));
      if(!tree.editorState.shiftKey){
        store.dispatch(setOrigin(tree.editorState.location));
      }
      break
    }
  }
}
export function moveRight(){
  while(tree.editorState.location < tree.words.length){
    const x = tree.editorState.location + 1
    let word = tree.words[x];
    if(word instanceof Style){
      store.dispatch(setLocation(x));
    }else{
      store.dispatch(setLocation(x));
      if(!tree.editorState.shiftKey){
        store.dispatch(setOrigin(tree.editorState.location));
      }
      break
    }
  }
}