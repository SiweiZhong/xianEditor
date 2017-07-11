import store from '../reducers'
import {getFontWidth} from '../util/'

import {Identifier, Style, Group, Placeholder, MathTag, Text, Space, Tab, Enter} from '../nodeTypes'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function updateWordsProps (location){
  // let {location} = tree.editorState;
  if(tree.words.length == 0){
    return;
  }
  
  while(location <= tree.words.length){
    let loc = location
    let word = tree.words[--loc];
    
    if(!word){
      location++;
      continue;
    }

    let rowNum;
    let text = word.real || '';
    let width = word._w || 0;

    while(loc > 0){
      let last = tree.words[--loc];
      if(last instanceof Style){
        continue;
      }
      if(rowNum == undefined){
        rowNum = last.rowNum;
      }
      if(last.rowNum != rowNum){
        break;
      }
      if(last instanceof Enter){
        rowNum++;
        break
      }
      text += last.real || '';
      width += last._w || 0;

      if(loc < 0) break;
    }
    word.rowNum = rowNum || 0;
    
    width += getFontWidth(text);
    if(tree.words[location-2] instanceof Enter){ 
      width = getFontWidth(word.real);
    }else if(tree.editorState.autoLinefeed && width > tree.editorState.width){
      width = getFontWidth(word.real);
      word.rowNum++;
    }
    word.width = width;

    location++;
  }
}