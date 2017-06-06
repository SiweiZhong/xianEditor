<template>
<div>
  <textarea id="edit" class="editor" @keydown.stop="keydown">
  </textarea>
  <div class="editor">
    
    <div 
      class="row" :class="{'editing': index == y}" 
      :style="{'--offsetLeft': location+'px'}" 
      v-if="line && key != 'length'" 
      v-for="(line, key, index) in words"
    >
      <template v-for="word in line.values"><template v-if="word.value=='&nbsp;'" v-html="'&nbsp;'"></template><template v-else>{{word.value}}</template>
      </template>
    </div>
  </div>
</div>

</template>

<script>
import Vue from 'vue'
let arr = [
  'int', 'float', 'function'
]

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
ctx.font = '16px Microsoft YaHei';
function getFontWidth(text){
  return ctx.measureText(text).width;
}

function word(w){
  return {
    width: getFontWidth(w),
    height: 0,
    value: w,
  }
}
function newLine(){
  return {
    width: 0,
    height: 0,
    x: 0,
    values: [],
  }
}

export default {
  name: 'app',
  filters: {
    
  },
  data () {
    return {
      edit: 'true',
      
      y: 0,
      ox: undefined,
      oy: undefined,

      words: {
        '0': newLine(),
        'length': 1,
      },

      inner: '',
      naiveText: '',
      processTest: '',
      keystr: '',
      index: 0,
      lastLength: 0,
      isProcess: false,
    }
  },
  computed: {
    location (){
      let line = this.words[this.y];
      if(line == undefined){
        return 0;
      }
      let text = line.values.slice(0, line.x).reduce((a, b) => a + b.value, '');
      
      return getFontWidth(text)-1;
    }
  },
  methods: {
    keydown (event){
      let {key, code, shiftKey, target} = event;
      let {words, y} = this;
      let line = words[y];
      let {x} = line;
      // console.log(key)
      if(key != 'Process'){
        if(shiftKey){
          if(this.ox == undefined){
            this.ox = x;
            this.oy = y;
          }
        }

        if(code.charAt(0) == 'K' || code.charAt(0) == 'D'){
          if(!words[y]) {
            Vue.set(words, y, newLine());
            words.length++;
          }
          words[y].values.splice(x, 0, word(key));
          line.x++;
        }else if(key == 'Enter'){
          if(y == 0){
            Vue.set(words, y+1, newLine());
            this.y++;
            words.length++;
          }else{
            let len = words.length;
            if(y != len-1){
              for(let i=0;i<len-y;i++){
                Vue.set(words, len-i, words[len-i-1]);
              }
            }
            
            Vue.set(words, y+1, newLine());
            
            this.y++;
            words.length++;
          }
        }else if(key == ' '){
          if(this.processTest.length === 0){
            Vue.set(words[y].values, x, word('&nbsp;'));
            line.x++;
          }
        }else if(key == 'ArrowUp'){
          if(y > 0) this.y--;
        }else if(key == 'ArrowDown'){
          if(y < words.length-1) this.y++;
        }else if(key == 'ArrowLeft'){
          if(x > 0) line.x--;
        }else if(key == 'ArrowRight'){
          if(x < line.values.length) line.x++;
        }else if(key == 'Backspace'){
          if(this.ox == undefined){
            if(line.x > 0){
              line.values.splice(x-1, 1);
              line.x--;
            }
          }else{
            let a = this.oy, b = y;
            if(a > b){
              a = y;
              b = this.oy;
            }
            
            for(let i=a;i<=b;i++){
              let line = words[i];
              if(i == a){
                if(a == b){ // 同一行时
                  line.values.splice(this.ox>x?x:this.ox, Math.abs(this.ox-x));
                }else if(i == this.oy){ // 如果从上向下选择
                  let arr = words[b].values.slice(x);
                  line.values.splice(this.ox, line.values.length, ...arr);
                  this.y = this.oy;
                }else{
                  let l = words[b];
                  let arr = line.values.slice(this.ox);
                  l.values.splice(l.x, l.values.length, ...arr);
                }
              }else {
                words[i] = undefined;
                words.length--;
              }
            }
            let n = b-a;
            if(n > 0){
              for(let i=b+1;i<words.length;i++){
                words[i-n] = words[i];
                words[i] = undefined;
              }
            }
          }

        }
        target.value = '';
        this.processTest = '';
      }else{
        setTimeout(()=>{
          let l = this.processTest.length;
          this.processTest = target.value;

          words[y].values.splice(x-l, l, ...[...target.value].map(s => word(s)));
          line.x += target.value.length - l;
        }, 100);
      }
      if(!shiftKey){
        this.ox = undefined;
        this.oy = undefined;
      }
      
      event.preventDefault();
    },
  }
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
.editing::before{
  content: '|';
  position: absolute;
  left: var(--offsetLeft);
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