<script>
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
      autoBreak: true,
      input: undefined,
      isFocused: false,
    }
  },
  computed: {
    lineHeight (){
      return this.fontSize * this.hheadAscent;
    },
    x (){
      let {location} = this.state;

      const y = this.y;
      let width = 0;
      while(1){
        if(location == 0){
          break;
        }
        let word = this.words[--location];
        if(word.rowNum == y){
          if(!word.width) continue;
          width = word.width;
          break;
        }
      }
      return width - 1;
    },
    y (){
      const {words} = this;
      let {location} = this.state;

      let i = 0;
      while(1){
        if(location == 0 && !words[location]) {
          return 0;
        };
        let word = words[location--];
        if(word){
          if(word.rowNum >= 0){
            if(word.type=='enter' && i > 0){ //光标左边是换行时y+1
              i += word.rowNum;
            }else{
              i = word.rowNum;
            }
            break;
          }
          continue;
        }else{ // location是最后一位
          i = 1;
        }
      }
      return i;
    },
    offsetY (){
      const a = Math.floor(this.height / this.lineHeight);
      const b = this.y;
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
      let words = this.words.slice();

      let text = ''
      let width = 0;
      let rowNum = 0;
      for(let i=0;i<words.length;i++){
        let w = words[i];
        if(w.type == 'text'){
          if(this.autoBreak && getFontWidth(text + w.value) > this.width){
            text = '';
            rowNum++
          }
          text += w.value;
          let width = getFontWidth(text);
          
          w.width  = width;
          w.rowNum = rowNum;
        }else if(w.type == 'enter'){
          text = '';
          w.width  = width;
          w.rowNum = rowNum++;
        }
      }

      if(origin == location){
        return words;
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
      words.splice(a, b-a, ...arr);

      return words;
    }
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
    editorFocus (event){
      this.$refs.back.focus();
    },
  },


  created (){
    const unsubscribe = store.subscribe(()=>{
      setData(this, store.getState())
    })
    store.dispatch(setLocation(0))
    
    // 获得文字渲染后的实际行高
    
  },

  mounted (){
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
  
  render (h){
    const data = renderContent.call(this, h, 0);

    return (
      <div class="xianEditor" onClick={this.editorFocus}>
        <div class="icons">
          <span class="icon" onClick={this.clickB}>B</span>
          <span class="icon">I</span>
          <span class="icon">U</span>
          <span class="icon">link</span>
          <div style={{display: this.link || 'none'}}></div>
        </div>
        <div class="wrap" style={{'width': this.width+'px', 'height': this.height+'px'}} >
          <div
            ref="back"
            class="back" contenteditable="true"
            onKeydown={this.keydown}
            onFocus = {()=>this.isFocused = true}
            onBlur = {()=>this.isFocused = false}
          >
          </div>
          <div class={["editor", this.isFocused?'isFocused':'']}
            style={{
              'line-height': this.lineHeight + 'px',
              '--x': this.x + 'px', 
              '--y': this.y * this.lineHeight + 'px',
              'top': this.offsetY + 'px',
              'word-break': this.autoBreak ? 'break-all' : 'normal',
            }}>
            {
              data.length || this.isFocused ? "" : <span style={{color: '#ccc'}}>请输出内容...</span>
            }
            {
              data
            }
          </div>
        </div>
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
  
}
.xianEditor{
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  
  display: inline-block;
  position: relative;

  --border-color: #cfcfcf;
}
.wrap{
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}
.editor{
  position: relative;
  min-height: 100%;
  background: #fff;
  pointer-events: none;
}
.isFocused::before{
  content: '|';
  position: absolute;
  top: var(--y);
  left: var(--x);
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-name: slidein;
}
.back{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.icons{
  border: 1px solid var(--border-color);
  border-bottom-width: 0px;
  background: #f3f3f3;
}
.icon{
  line-height: 1.6em;
  min-width: 1.42em;
  display: inline-block;
  box-sizing: border-box;

  margin-right: 4px;
  /*border: 1px solid #bababa;*/
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