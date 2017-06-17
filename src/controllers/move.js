import store from '../reducers'
import {whereAmI} from '../util/'
import {setLocation} from '../actions'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})


export function moveUp(){
  let {x, y} = whereAmI(tree.editorState.rowsIndex, tree.editorState.location);
  if(y !== 0){
    let a = tree.editorState.rowsIndex[y-2] || 0;
    let b = tree.editorState.rowsIndex[y-1] - a;

    //本行长度比上一行长时，定位到上行结尾, b是个数,x是下标
    if(x > b-1){
      x = b; //a==0是边界情况
      if(a > 0) x--; 
    }
    const loc = a == 0 ? x : a + x + 1;
    store.dispatch(setLocation(loc));
  }
}
export function moveDown(){
  let {x, y} = whereAmI(tree.editorState.rowsIndex, tree.editorState.location);
  if(y !== tree.editorState.rowsIndex.length){
    let a = tree.editorState.rowsIndex[y+1] || tree.words.length; //相当于最后一位补了换行符
    let b = a - tree.editorState.rowsIndex[y];

    if(x > b-1){
      x = b-1
    }
    const loc = tree.editorState.rowsIndex[y] + x + 1;
    store.dispatch(setLocation(loc));
  }
}
export function moveLeft(){
  while(1){
    if(tree.editorState.location == 0){
      break;
    }
    const x = tree.editorState.location-1
    const word = tree.words[x];

    if(word.type=='style' || word.type=='closed'){
      store.dispatch(setLocation(x));
    }else{
      store.dispatch(setLocation(x));
      break
    }
  }
}
export function moveRight(){
  while(1){
    if(tree.editorState.location == tree.words.length){
      break;
    }
    const x = tree.editorState.location + 1
    let word = tree.words[x];
    if(word && (word.type=='style' || word.type=='closed')){
      store.dispatch(setLocation(x));
    }else{
      store.dispatch(setLocation(x));
      break
    }
  }
}