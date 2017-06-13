<script>
import Vue from 'vue'

import store from './reducers'
import actions from './actions'
const {addKey, backspace, setLocation, setOrigin, setRowsIndex, removeRowsIndex, scaKey} = actions

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

function text(value){
  return {
    type: 'text',
    value
  }
}
function placeholder(value){
  return {
    type: 'placeholder',
    value
  }
}
function enter(value){
  return {
    type: 'enter',
    value
  }
}
function style(value){
  return {
    type: 'style',
    value,
  }
}
function closed(){
  return {
    type: 'closed',
  }
}
function renderContent (h, i){
  let _children = [];
  for(;i<this._words.length;i++){
    let w = this._words[i];
    if(w.type == 'style'){
      let {children, index} = renderContent.call(this, h, i+1);
      _children[_children.length] = (h(w.value.name ,{style:w.value.style}, children));
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
      fontPercentage: 0,
      fontSize: 16,
    }
  },
  computed: {
    lineHeight (){
      return this.fontSize * this.fontPercentage;
    },
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
      return i * this.lineHeight;
    },
    _words (){
      const {origin, location} = this.state
      if(origin == location){
        return this.words;
      }
      let a = origin, b = location;
      if(a > b){
        let c = b;
        b = a;
        a = c;
      }
      let arr = this.words.slice(a, b+1);
      arr.unshift(style({name:'span', 
        style: {
          'line-height': this.lineHeight + 'px',
          background: '#3390ff',
        }
      }))
      arr.push(closed())

      let words = this.words.slice();
      words.splice(a, b+1, ...arr);

      return words;
    }
  },
  created (){
    const unsubscribe = store.subscribe(()=>{
      setData(this, store.getState())
    })
    store.dispatch(setLocation(0))
    
    // 获得文字渲染后的实际行高
    const sp = document.createElement('span');
    sp.style.fontSize = '1000px';
    sp.style.visibility = 'hidden';
    sp.style.position = 'absolute';
    sp.style.top = '0px';
    sp.style.left = '0px';
    sp.innerHTML = 'Test';
    document.body.appendChild(sp);
    
    this.fontPercentage = sp.offsetHeight / 1000;
    console.log(this.fontPercentage)
  },
  methods: {
    keydown (event){
      let {key, code, shiftKey, ctrlKey, altKey, target} = event;
      let {state, words} = this
      let {location, rowsIndex} = state

      if(key != 'Process'){
        store.dispatch(scaKey(shiftKey, ctrlKey, altKey));        
        
        if(code.charAt(0) == 'K' || code.charAt(0) == 'D'){
          store.dispatch(addKey(text(key)));
          store.dispatch(setLocation(location+1));
        }

        switch(key){
          case 'ArrowUp': {
            let {x, y} = whereAmI(rowsIndex, state.location);
            if(y !== 0){
              let a = rowsIndex[y-2] || 0;
              let b = rowsIndex[y-1] - a;

              //本行长度比上一行长时，定位到上行结尾, b是个数,x是下标
              if(x > b-1){
                x = b; //a==0是边界情况
                if(a > 0) x--; 
              }
              const loc = a == 0 ? x : a + x + 1;
              store.dispatch(setLocation(loc));
            }
            break;
          }
          case 'ArrowDown':{
            let {x, y} = whereAmI(rowsIndex, state.location);
            if(y !== rowsIndex.length){
              let a = rowsIndex[y+1] || words.length; //相当于最后一位补了换行符
              let b = a - rowsIndex[y];

              if(x > b-1){
                x = b-1
              }
              const loc = rowsIndex[y] + x + 1;
              store.dispatch(setLocation(loc));
            }
            break;
          }
          case 'ArrowLeft':
            while(1){
              if(this.state.location == 0){
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
              if(this.state.location == words.length){
                break;
              }
              const x = this.state.location + 1
              let word = words[x];
              if(word && (word.type=='style' || word.type=='closed')){
                store.dispatch(setLocation(x));
              }else{
                store.dispatch(setLocation(x));
                break
              }
            }
            break;
        }
        if(!shiftKey){
          store.dispatch(setOrigin(this.state.location));
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
        }

      }else{

      }
      
      event.preventDefault();
    },
  },
  render (h){
    const data = renderContent.call(this, h, 0);
    console.log(data)
    return (
      <div>
        <div class="editor" style={{'line-height': this.lineHeight+'px','--x': this.x+'px', '--y': this.y+'px'}}>
          {
            data
          }
        </div>
        <input onKeydown={this.keydown} />
        <span>qweasd</span>
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