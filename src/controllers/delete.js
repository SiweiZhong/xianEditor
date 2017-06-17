import store from '../reducers'
import {removeRowsIndex, setLocation, backspace} from '../actions'

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function delBackspace(){
  while(1){
    let {location} = tree.editorState;
    if(location <= 0) break;
    let word = tree.words[location-1];
    
    if(word.type != 'style' && word.type != 'closed'){
      if(word.type == 'enter'){
        store.dispatch(removeRowsIndex(location-1));
      }
      store.dispatch(setLocation(location-1));
      store.dispatch(backspace());
    
      word = tree.words[tree.editorState.location-1];
      if(!word){
        break;
      }
      if(word.type != 'style' && word.type != 'closed'){
        break;
      }
      if(tree.words[tree.editorState.location] == 'closed'){ //遇到空的样式结点就删除
        if(tree.words[tree.editorState.location-1] == 'style'){
          store.dispatch(setLocation(tree.editorState.location-1));
          store.dispatch(backspace());
          store.dispatch(setLocation(tree.editorState.location-1));
          store.dispatch(backspace());
        }
      }else if(word.type == 'style'){
        break;
      }
    }else{
      store.dispatch(setLocation(tree.editorState.location-1));
    }
  }
}
