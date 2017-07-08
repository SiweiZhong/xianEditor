import * as nodeTypes from './nodeTypes'

function whereAmI(words, location){
  let x = 0;
  let loc = location;

  if(words.length == 0){
    return {x:0, y:0};
  }else if(loc == words.length){ // 光标在结尾处时
    loc--;
    x++;
    if(words[loc] instanceof nodeTypes.Enter){
      return {x:0, y:words[loc].rowNum+1};
    }
  }

  const word = words[loc];
  const y = word.rowNum;
  for(let i=loc;i>=0;i--){
    const w = words[i];
    if(w.rowNum == word.rowNum){
      x++;
    }else{
      break;
    }
  }
  x--;

  return {x, y};
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const fontSize = '16px';
const fontWeight = 'normal';
const fontFamily = 'Microsoft YaHei';

ctx.font = `${fontSize} ${fontWeight} ${fontFamily}`;

function getFontWidth(text='', size=fontSize, weight=fontWeight, family=fontFamily){
  ctx.save();
  ctx.font = `${size} ${weight} ${family}`;
  let w = ctx.measureText(text).width;
  ctx.restore();
  return w;
}

function setData(self, state){
  self.state = state.editorState;
  self.words = state.words;
}


function updateWordsProps (){
  let {location} = tree.editorState;
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
      text += last.real;

      if(loc < 0) break;
    }
    word.rowNum = rowNum || 0;
    
    let width = getFontWidth(text + word.real);
    if(width > tree.editorState.width){
      width = getFontWidth(word.real);
      word.rowNum++;
    }
    word.width = width;

    location++;
  }
}



export {nodeTypes, whereAmI, setData, getFontWidth, updateWordsProps}