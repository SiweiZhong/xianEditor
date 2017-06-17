<script>
import Vue from 'vue'
import store from './reducers'

import {nodeTypes, getFontWidth, whereAmI, setData} from './util'
import {addKey, addB, backspace, setLocation, setOrigin, setRowsIndex, removeRowsIndex, scaKey} from './actions'

import {
  addSpace, addEnter, 
  moveUp, moveDown, moveLeft, moveRight,
  delBackspace,
} from './controllers'

const {text, placeholder, enter, style, closed} = nodeTypes;

function renderContent (h, i){
  let _children = [];
  for(;i<this._words.length;i++){
    let w = this._words[i];
    if(w.type == 'style'){
      const {children, index} = renderContent.call(this, h, i+1);
      const attr = Object.assign({}, w.value.attr)

      _children[_children.length] = h(w.value.name , attr, children);
      i = index;
    }else if(w.type == 'closed'){
      return {children:_children, index: i};
    }else if(w.type == 'placeholder' || w.type == 'enter'){
      const attr = Object.assign({}, w.value.attr)
      _children[_children.length] = h(w.value.name , attr)
    }else{
      _children[_children.length] = w.value;
    }
  }
  return _children;
}

export default {
  name: 'app',
  props: ['width', 'height'],
  data () {
    return {
      data: [],
      state: {},
      words: [],
      hheadAscent: 0, //文字渲染后行高与文字高度比
      fontSize: 16,
      head: 0,
    }
  },
  
  computed: {
    lineHeight (){
      return this.fontSize * this.hheadAscent;
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
    offsetY (){
      const a = Math.floor(this.height / this.lineHeight);
      const b = Math.round(this.y / this.lineHeight);
      const m = b - this.head;

      if(m >= a){
        this.head += m - a + 1;
        return -this.head * this.lineHeight; 
      }else if(m < 0){
        this.head += m;
        return -this.head * this.lineHeight;
      }
      return -this.head * this.lineHeight;
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
      let arr = this.words.slice(a, b);
      arr.unshift(style('span', 
        {
          style: {
            'line-height': this.lineHeight + 'px',
            background: '#3390ff',
          }
        }
      ))
      arr.push(closed())
      let words = this.words.slice();
      words.splice(a, b-a, ...arr);

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
    sp.innerHTML = 'a';
    document.body.appendChild(sp);
    
    this.hheadAscent = sp.offsetHeight / 1000;
  },
  methods: {
    clickB(){
      if(this.state.location == this.state.origin){
        return;
      }
      store.dispatch(addB());
      
      store.dispatch(setLocation(this.state.location+1));
      store.dispatch(setOrigin(this.state.origin + 1));
    },
    keydown (event){
      let {key, code, shiftKey, ctrlKey, altKey, target} = event;
      let {state, words} = this
      let {location, rowsIndex} = state

      if(key != 'Process'){
        store.dispatch(scaKey(shiftKey, ctrlKey, altKey));        
        
        if(code.slice(0, 3) == 'Key' || code.slice(0, 3) == 'Dig'){ // 主键盘字母&数字
          store.dispatch(addKey(text(key)));
          store.dispatch(setLocation(location+1));
        }

        switch(code){
          case 'Backquote':     // `
          case 'Minus':         // -
          case 'Equal':         // +
          
          case 'BracketLeft':   // [
          case 'BracketRight':  // ]
          
          case 'Backslash':     // \
          case 'Semicolon':     // ;
          case 'Quote':         // '

          case 'Comma':         // ,
          case 'Period':        // .
          case 'Slash':         // /

          case 'Numpad0':
          case 'Numpad1':
          case 'Numpad2':
          case 'Numpad3':
          case 'Numpad4':
          case 'Numpad5':
          case 'Numpad6':
          case 'Numpad7':
          case 'Numpad8':
          case 'Numpad9':
          
          case 'NumpadDecimal':   // .
          case 'NumpadAdd':       // +
          case 'NumpadSubtract':  // -
          case 'NumpadMultiply':  // *
          case 'NumpadDivide':    // /
            store.dispatch(addKey(text(key)));
            store.dispatch(setLocation(location+1));
        }

        switch(code){
          case 'ArrowUp': 
            moveUp();
            break;
          case 'ArrowDown':
            moveDown();
            break;
          case 'ArrowLeft':
            moveLeft();
            break;
          case 'ArrowRight':
            moveRight();
            break;
          case 'Space':
            addSpace();
            break;
          case 'Backspace':
            delBackspace();
            break;
          case 'NumpadEnter': //Enter
          case 'Enter': //Enter
            addEnter();
            break
        }

        if(!shiftKey){
          store.dispatch(setOrigin(this.state.location));
        }
      }else{

      }
      
      event.preventDefault();
    },
  },
  render (h){
    const data = renderContent.call(this, h, 0);

    return (
      <div>
        <div>
          <span class="icon" onClick={this.clickB}>B</span>
          <span class="icon">I</span>
          <span class="icon">U</span>
          <span class="icon">link</span>
          <div style={{display: this.link || 'none'}}></div>
        </div>
        <div class="wrap" style={{'width': this.width+'px', 'height': this.height+'px'}}>
          <div class="editor" 
            style={{
              'line-height': this.lineHeight+'px',
              '--x': this.x+'px', 
              '--y': this.y+'px',
              'top': this.offsetY + 'px',
            }}>
            {
              data
            }
          </div>
        </div>
          
        <input onKeydown={this.keydown} />
      </div>
    )
  },
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  font-family: 'Microsoft YaHei';
  font-size: 16px;
}
.wrap{
  border: 1px solid;
  float: left;
  margin: 10px;
  position: relative;
  overflow: hidden;
}
.editor{
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

.icons{
  background: #eee;
}
.icon{
  line-height: 1.6em;
  min-width: 1.42em;
  display: inline-block;
  box-sizing: border-box;

  margin-right: 4px;
  border: 1px solid #bababa;
  padding: 0 0.4em;
  
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