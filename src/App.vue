<script>
import Vue from 'vue'

import store from './reducers'
import actions from './actions'
const {addKey, setLocation, setRowsIndex, removeRowsIndex, backspace} = actions

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
ctx.font = '16px Microsoft YaHei';

function getFontWidth(text){
  return ctx.measureText(text).width;
}
function setData(self, state){
  self.state = state.editorState;
  self.words = state.words;
}

function text(s){
  return {
    type: 'text',
    value: s,
  }
}
function placeholder(s){
  return {
    type: 'placeholder',
    value: s,
  }
}
function enter(s){
  return {
    type: 'enter',
    value: s,
  }
}
function style(s){
  return {
    type: 'style',
    value: s,
  }
}
function closed(){
  return {
    type: 'closed',
  }
}
function renderContent (h, i){
  let _children = [];
  for(;i<this.words.length;i++){
    let w = this.words[i];
    if(w.type == 'style'){
      let {children, index} = renderContent.call(this, h, i+1);
      _children[_children.length] = (h(w.value,{}, children));
      i = index;
    }else if(w.type == 'closed'){
      return {children:_children, index: i};
    }else{
      _children[_children.length] = w.value;
    }
  }
  return _children;
}
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

export default {
  name: 'app',
  data () {
    return {
      state: {},
      words: [],
      lineHeight: 16,
    }
  },
  computed: {
    x (){
      let last = 0;
      const {rowsIndex} = this.state;

      for(let i=0;i<rowsIndex.length;i++){
        const index = rowsIndex[i];
        if(index >= this.state.location) break;
        
        last = index;
      }
      let text = ''
      for(;last<this.state.location;last++){
        const w = this.words[last];
        if(w.type == 'text'){
          text += w.value;
        }
      }

      return getFontWidth(text)-1;
    },
    y (){
      let i=0;
      const {rowsIndex, location} = this.state;

      for(;i<rowsIndex.length;i++){
        if(rowsIndex[i] >= location){
          break;
        }
      }
      // console.log(rowsIndex.length, location, i)
      return i * 16;
    }
  },
  created (){
    const unsubscribe = store.subscribe(()=>{
      setData(this, store.getState())
    })
    store.dispatch(setLocation(0))
  },
  methods: {
    keydown (event){
      let {key, code, shiftKey, target} = event;
      let {state, words} = this
      let {location, rowsIndex} = state

      if(key != 'Process'){
        if(code.charAt(0) == 'K' || code.charAt(0) == 'D'){
          store.dispatch(addKey(text(key)));
          store.dispatch(setLocation(location+1));
        }
        switch(key){
        case ' ':
          store.dispatch(addKey(placeholder(' ')));
          store.dispatch(setLocation(location+1));

          break;
        case 'Enter':
          store.dispatch(setRowsIndex(location));
          store.dispatch(addKey(enter(<br />)));
          store.dispatch(setLocation(location+1));

          break
        case 'Backspace':
          while(1){
            const {location} = this.state;
            if(location == 0) break;
            const word = words[location-1]
            if(word == 'style' || word == 'closed'){
              store.dispatch(setLocation(location-1));
            }else{
              break;
            }
          }

          if(words[this.state.location-1].type == 'enter'){
            store.dispatch(removeRowsIndex(this.state.location-1));
          }
          
          if(this.state.location > 0){
            store.dispatch(setLocation(this.state.location-1));
            store.dispatch(backspace(this.state.location));
          }

          break;
        case 'ArrowUp':
          let {x, y} = whereAmI(rowsIndex, state.location);
          if(y == 0){
            break;
          }
          
          let a = rowsIndex[y-2] || 0;
          let b = rowsIndex[y-1] - a;

          //本行长度比上一行长时，定位到上行结尾, b是个数x是下标
          if(x > b-1){
            x = b; //a==0是边界情况
            if(a > 0) x--; 
          }
          const loc = a == 0 ? x : a + x + 1;
          store.dispatch(setLocation(loc));
          
          break;
        case 'ArrowDown':{
          let {x, y} = whereAmI(rowsIndex, state.location);
          if(y == rowsIndex.length){
            break;
          }
          let a = rowsIndex[y+1] || words.length; //相当于最后一位补了换行符
          let b = a - rowsIndex[y];

          if(x > b-1){
            x = b-1
          }
          const loc = rowsIndex[y] + x + 1;
          store.dispatch(setLocation(loc));
          
          break;
        }
        case 'ArrowLeft':
          while(1){
            if(state.location == 0){
              break;
            }
            const x = this.state.location-1
            const word = words[x];

            if(word.type=='style' || word.type=='closed'){
              store.dispatch(setLocation(x));
            }else{
              store.dispatch(setLocation(x));
              break
            }
          }
          break;
        case 'ArrowRight':
          while(1){
            if(location == words.length){
              break;
            }
            const x = this.state.location + 1
            let word = words[x];

            if(word.type=='style' || word.type=='closed'){
              store.dispatch(setLocation(x));
            }else{
              store.dispatch(setLocation(x));
              break
            }
          }
          break;
        }

      }else{

      }
      
      event.preventDefault();
    },
  },
  render (h){
    let _words = renderContent.call(this, h, 0);

    return (
      <div>
        <div class="editor" style={{'line-height': this.lineHeight+'px','--x': this.x+'px', '--y': this.y+'px'}}>
          {
            _words
          }
        </div>
        <input onKeydown={this.keydown} />
      </div>
    )
  },
}
</script>

<style>
body{
  font-family: 'Microsoft YaHei';
  font-size: 16px;
}
.editor{
  width: 500px;
  height: 200px;
  border: 1px solid;
  float: left;
  margin: 10px;
  box-sizing: border-box;
  position: relative;
}
.editor::before{
  content: '|';
  position: absolute;
  top: var(--y);
  left: var(--x);
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-name: slidein;
}
.row{
  height: 1.2em;
  line-height: 1.2em;
  width: 100%;
  display: inline-block;
  background: #eee;
}
p{
  margin: 1px;
  background: #f1f1f1;
}
@keyframes slidein {
  0%{
    opacity: 1;
  }
  49%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 0;
  }
}
</style>