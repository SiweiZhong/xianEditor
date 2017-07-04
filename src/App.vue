<script>
import store from './reducers'

import Preview from './Preview.vue'

import {nodeTypes, getFontWidth, whereAmI, setData} from './util'
import {addKey, addB, backspace, setLocation, setOrigin, removeRowsIndex, scaKey} from './actions'

import {
  addWord, addEnter, 
  moveUp, moveDown, moveLeft, moveRight,
  delBackspace,
} from './controllers'

const {Identifier, Style, Placeholder, MathTag, Text, Space, Tab, Enter} = nodeTypes;

function renderContent (h, i){
  let _children = [];
  for(;i<this._words.length;i++){
    let w = this._words[i];
    const len = _children.length;
    if(w instanceof Style){
      if(w.end){
        const {children, index} = renderContent.call(this, h, i+1);
        const attrs = Object.assign({}, w.attrs);

        _children[len] = h(w.name , attrs, children);
        i = index;
      }else{
        return {children:_children, index: i};
      }
    }else if(w instanceof Placeholder){
      if(w instanceof MathTag){
        const attrs = Object.assign({}, w.attrs, w.style)
        _children[len] = h(w.name, attrs, w.value);
      }else{
        _children[len] = h(w.name, {domProps:{innerHTML:w.value}});
      }
    }
  }
  console.log(_children)
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
      autoLinefeed: true,
      input: undefined,
      isFocused: false,
      isProcess: false,
    }
  },
  computed: {
    lineHeight (){
      return this.fontSize * this.hheadAscent;
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
      let offsetWidth = 0;
      let width = 0;
      let rowNum = 0;
      /*
      for(let i=0;i<words.length;i++){
        let w = words[i];
        if(w.type == 'text'){
          if(this.autoLinefeed && offsetWidth + getFontWidth(text + w.value) > this.width){
            text = '';
            offsetWidth = 0;
            rowNum++
          }
          text += w.value;
          let width = getFontWidth(text);
          
          w.width  = offsetWidth + width;
          w.rowNum = rowNum;
        }else if(w.type == 'enter'){
          text = '';
          w.width  = width;
          w.rowNum = rowNum++;
        }else if(w.type == 'placeholder'){
          if(this.autoLinefeed && offsetWidth + getFontWidth(text + w.value) > this.width){
            text = '';
            offsetWidth = 0;
            rowNum++
          }
          let width = getFontWidth(text);
          offsetWidth += w.attrs.attrs.width
          w.width  = offsetWidth + width;
          
          w.rowNum = rowNum;
        }
      }
      // console.log(words.map(o=>o.value))
      */

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
      const start = new Style({
        'line-height': this.lineHeight + 'px',
        background: '#3390ff',
      });

      arr.unshift(start)
      arr.push(start.end())
      words.splice(a, b-a, ...arr);
      
      return words;
    }
  },
  methods: {
    x (){ //Vue2取消了computed cache ,使用方法调用计算x y的值
      let {location} = this.state;
      const y = this.y();
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
    
    clickingTools (name, ...arg){
      if(name == 'bold'){
        if(this.state.location == this.state.origin){
          return;
        }
        store.dispatch(addB());
        
        store.dispatch(setLocation(this.state.location+1));
        store.dispatch(setOrigin(this.state.origin + 1));
      }else if(name == 'autoLinefeed'){
        this.autoLinefeed = arg[0];
      }else if(name == 'math'){
        let width = getFontWidth('M') * 1.4;
        const start = new Math({width}, {width:width+'px'}, 'M');
        addPlaceholder(start);
        addPlaceholder(start.end());
        moveLeft();
      }
    },
    keydown (event){
      let {key, code, shiftKey, ctrlKey, altKey, target} = event;
      let {state, words} = this
      let {location, rowsIndex} = state
      if(key != 'Process'){
        this.isProcess = false;
        store.dispatch(scaKey(shiftKey, ctrlKey, altKey));
        
        if(code.slice(0, 3) == 'Key' || code.slice(0, 3) == 'Dig'){ // 主键盘字母&数字
          addWord(key)
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
            addWord(key)
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

        event.preventDefault();
      }else{
        this.isProcess = true;
      }
      
      // event.preventDefault();
    },
    oninput (event){
      const {selectionStart, selectionEnd} = event.target
      
      if(this.isProcess && selectionStart == selectionEnd){
        let text = [...event.target.innerHTML];
        window.el = event.target
        
        text.forEach(s=>{
          addWord(s);
        })
        this.isProcess = false;
        // event.target.innerHTML = '';
      }
      
    },
    editorFocus (event){
      this.$refs.back.focus();
    },
    submit (event){
      const text = this.words
        .map(w => {
          if(w.constructor.name == 'Text'){
            return w.value
          }
        })
        .join('');
      this.$emit('submit-content', text);
    }
  },

  created (){
    const unsubscribe = store.subscribe(()=>{
      setData(this, store.getState())
    })
    store.dispatch(setLocation(0))
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
    
    this.hheadAscent = sp.offsetHeight / 1000; // 获取真实行高比
    
  },
  
  render (h){
    const data = renderContent.call(this, h, 0);
    console.log(data)
    return (
      <div class="xianEditor" onClick={this.editorFocus}>
        <Preview onClickingTools={this.clickingTools}></Preview>
        <div class="wrap" style={{'width': this.width+'px', 'height': this.height+'px'}} >
          <textarea
            ref="back"
            class="back" contenteditable="true"
            onKeydown={this.keydown}
            onInput={this.oninput}
            onFocus = {()=>this.isFocused = true}
            onBlur = {()=>this.isFocused = false}
          >
          </textarea>
          <div class={["editor", this.isFocused?'isFocused':'']}
            style={{
              'line-height': this.lineHeight + 'px',
              '--x': this.x() + 'px', 
              '--y': this.y() * this.lineHeight + 'px',
              'top': this.offsetY + 'px',
              'word-break': this.autoLinefeed ? 'break-all' : 'normal',
            }}>
            {
              data.length || this.isFocused ? "" : <span style={{color: '#ccc'}}>请输入内容...</span>
            }
            {
              data
            }
          </div>
        </div>
        <button onClick={this.submit}>预览</button>
      </div>
    )
  },
}
</script>

<style scoped>
.xianEditor > *{
  box-sizing: border-box;
}
.xianEditor{
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  text-align: left;

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
.placeholder{
  display: inline-block;
  text-align: center;
}
.math_tag{
  color: #595959;
  background: #cecece;
  border-radius: 0.2em;
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