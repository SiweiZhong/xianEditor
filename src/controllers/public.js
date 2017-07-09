import store from '../reducers'
import {nodeTypes, getFontWidth} from '../util/'

const {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} = nodeTypes

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
    let rowNum;
    let text = '';

    if(!word){
      location++;
      continue;
    }

    while(loc > 0){
      let last = tree.words[--loc];
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
      text += last.real;

      if(loc < 0) break;
    }
    word.rowNum = rowNum || 0;
    
    let width = getFontWidth(text + word.real);
    console.log(tree.editorState.autoLinefeed)
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