<script>
import store from './reducers'

import {setData} from './util'
import {Identifier, Style, Group, Placeholder, MathTag, Text, Space, Tab, Enter} from './nodeTypes'

import {addKey, addB, backspace, setLocation, setOrigin, scaKey, setWidth, setHeight, setAutoLinefeed} from './actions'
import {
  addWord, addEnter, addPlaceholder, addMath,
  moveUp, moveDown, moveLeft, moveRight,
  delBackspace,
} from './controllers'

function renderContent (h, i){
  let _children = [];
  for(;i<this._words.length;i++){
    let w = this._words[i];
    const len = _children.length;
    if(w instanceof Style){
      if(w.end){
        const {children, index} = renderContent.call(this, h, i+1);
        const attrs = {style: w.style};
        _children[len] = h(w.name , attrs, children);
        i = index;
      }else{
        return {children:_children, index: i};
      }
    }else if(w instanceof Group){
      if(w.end){
        const {children, index} = renderContent.call(this, h, i+1);
        const attrs = {style: w.style};
        _children[len] = h(w.name , attrs, children);
        i = index;
      }else{
        return {children:_children, index: i};
      }
    }else if(w instanceof Placeholder){
      if(w instanceof Text){
        if(w.constructor.name == 'Text'){
          _children[len] = w.value
        }else{
          _children[len] = h(w.name, {domProps:{innerHTML:w.value}});
        }
      }else{
        const attrs = {attrs: w.attrs, style: w.style};
        _children[len] = h(w.name, attrs, w.value);
      }
    }
  }
  return _children;
}

export default {
  name: 'editor',
  props: ['width', 'height'],
  data (){
    return{
      state: {},
      words: [],
      hheadAscent: 0, //文字渲染后行高与文字高度比
      fontSize: 16,
      head: 0,
      autoLinefeed: true,
      isFocused: false,
      isProcess: false,
      start: 0,
    }
  },
  computed: {
    lineHeight (){
      return this.fontSize * this.hheadAscent;
    },
    offsetY (){
      const a = Math.floor(this.height / this.lineHeight);
      const b = this.y();
      const m = b - this.head;
      if(m >= a){
        this.head += m - a + 1;
      }else if(m < 0){
        this.head += m;
      }
      return -this.head * this.lineHeight;
    },
    _words (){
      const {origin, location} = this.state

      if(origin == location){
        return this.words;
      }
      let words = this.words.slice();
      
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

      arr.unshift(start);
      arr.push(start.createEndIdentifier());
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
      while(location >= 0){
        if(location == 0 && !words[location]) { //没有任何输入时
          return 0;
        };
        
        let word = words[--location];
        if(word instanceof Placeholder){
          i = word.rowNum;
          if(word instanceof Enter){ //光标左边是换行时y+1
            i++
          }else if(words[location+1]){
            if(words[location+1].rowNum > word.rowNum){
              i++
            }
          }
          break;
        }
      }
      return i;
    },
    keydown (event){
      let {key, code, shiftKey, ctrlKey, altKey, target} = event;
      let {state, words} = this
      let {location, rowsIndex} = state

      if(key != 'Process'){
        this.isProcess = false;
        store.dispatch(scaKey(shiftKey, ctrlKey, altKey));

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
          case 'Backspace':
            delBackspace();
            break;
          case 'NumpadEnter': //Enter
          case 'Enter': //Enter
            addEnter(key)
            break;
          case 'ShiftLeft':
          case 'ControlLeft':
          case 'AltLeft':
          case 'ShiftRight':
          case 'ControlRight':
          case 'AltRight':
            break;
          default:
            addWord(key)
        }
        event.preventDefault();
      }else{
        this.isProcess = true;
      }
      // event.preventDefault();
    },
    oninput (event){
      const {selectionStart, selectionEnd} = event.target
      
      console.log(event.selectionStart )


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
    compositionstart (event){
      this.start = this.state.location;
      // console.log(event)
    },
    compositionend (event){
      // console.log(event)
      this.start = this.state.location;
      event.target.innerHTML = '';
    },
    inputting (event){
      const {location} = this.state;
      let text = event.target.innerHTML || '';
      for(let v of Array(location-this.start).keys()){
        delBackspace()
      };
      [...text].forEach(s => addWord(s=="'"?"`":s)); //单引号替换成 ` 
      
    },
    editorFocus (event){
      this.$refs.back.focus();
    },
  },
  created (){
    const unsubscribe = store.subscribe(()=>{
      setData(this, store.getState())
    })
    store.dispatch(setLocation(0));
    store.dispatch(setWidth(this.width));
    store.dispatch(setHeight(this.height));
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
  render (){
    const data = renderContent.call(this, h, 0);
    console.log(this._words.map(w => w.value ? w.value+'=>'+w.rowNum+'-'+w.width : undefined))
    // console.log(this._words)
    return (
      <div class="wrap" onClick={this.editorFocus} style={{'width': this.width+'px', 'height': this.height+'px'}} >
        <div
          ref="back"
          contenteditable="true"
          class="back"
          style={{
            left: this.x() + 'px',
            top: this.y() * this.lineHeight + 'px',
          }}
          onKeydown={this.keydown}
          onCompositionstart = {this.compositionstart}
          onCompositionend = {this.compositionend}  
          onInput = {this.inputting}

          onFocus = {()=>this.isFocused = true}
          onBlur = {()=>this.isFocused = false}
        >
        </div>
        <div 
          class={["editor", this.isFocused?'isFocused':'']}
          style={{
            'line-height': this.lineHeight + 'px',
            '--x': this.x() + 'px', 
            '--y': this.y() * this.lineHeight + 'px',
            'top': this.offsetY + 'px',
            'word-break': this.autoLinefeed ? 'break-all' : 'normal',
          }}
        >
          {
            data.length || this.isFocused ? "" : <span style={{color: '#ccc'}}>请输入内容...</span>
          }
          {
            data
          }
        </div>
      </div>
    )
  }
}
</script>
<style scoped>
.wrap{
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  background: #fff;
}
.editor{
  position: absolute;
  left: 0px;
  width: 100%;
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
  width: 1px;
  height: 1px;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
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