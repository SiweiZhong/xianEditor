import store from '../reducers'
import {setLocation, setOrigin, backspace} from '../actions'
import {nodeTypes, getFontWidth} from '../util/'
import {updateWordsProps} from './public'

const {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} = nodeTypes;

let tree = {};

const unsubscribe = store.subscribe(()=>{
  tree = store.getState();
})

export function delBackspace(){
  while(1){
    let {location} = tree.editorState;
    if(location <= 0) break;
    let word = tree.words[location-1];
    
    if(word instanceof Placeholder){

      store.dispatch(setLocation(location-1));
      store.dispatch(backspace());
    
      word = tree.words[tree.editorState.location-1];
      if(!word){
        break;
      }
      if(word instanceof Placeholder){
        break;
      }
      word = tree.words[tree.editorState.location];
      if(word instanceof Style && word.header){ //遇到空的样式节点就删除
        const last = tree.words[tree.editorState.location-1];
        if(word.header === last){
          store.dispatch(setLocation(tree.editorState.location-1));
          store.dispatch(backspace());
          store.dispatch(setLocation(tree.editorState.location-1));
          store.dispatch(backspace());
        }
      }else if(word instanceof Style){
        break;
      }
    }else{
      store.dispatch(setLocation(tree.editorState.location-1));
    }
  }
  store.dispatch(setOrigin(tree.editorState.location));
  updateWordsProps(tree.editorState.location)
}