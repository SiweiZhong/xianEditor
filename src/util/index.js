import * as nodeTypes from './nodeTypes'

function whereAmI(arr, loc){
  let x=0,y=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i] >= loc){
      break;
    }
    y++;
    x = arr[i];
  }
  x = x == 0 ? loc : loc - x - 1;
  
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

export {nodeTypes, whereAmI, setData, getFontWidth}