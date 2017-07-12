<script>
import store from './reducers'

import Preview from './Preview.vue'
import Editor from './Editor.vue'

import {setData} from './util'
import {Identifier, Style, Group, Placeholder, MathTag, Text, Space, Tab, Enter} from './nodeTypes'
import {addKey, addB, backspace, setLocation, setOrigin, scaKey, setWidth, setHeight, setAutoLinefeed} from './actions'

import {
  addWord, addEnter, addPlaceholder, addMath,
  moveUp, moveDown, moveLeft, moveRight,
  delBackspace,
} from './controllers'

export default {
  name: 'app',
  props: ['width', 'height'],
  data () {
    return {
      state: {},
      words: [],
    }
  },
  computed: {
  },
  methods: {
    clickingTools (name, ...arg){
      if(name == 'bold'){
        if(this.state.location == this.state.origin){
          return;
        }
        store.dispatch(addB());
        
        store.dispatch(setLocation(this.state.location+1));
        store.dispatch(setOrigin(this.state.origin + 1));
      }else if(name == 'math'){
        addMath()
      }
    },
    submit (event){
      const text = this.words
        .map(w => {
          if(w instanceof Placeholder){
            return w.value
          }else{
            if(w.end){
              // return `<span style="font-weight:bold">`
              if(w instanceof Style){
                return `<${w.name} style="${stringify(w.style)}">`
              }else if (w instanceof Group){
                return `<${w.name} class="${w.attrs.class}">`
              }
              
            }else if(w.header){
              return `</${w.name}>`
            }
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
  },
  render (h){
    return (
      <div class="xianEditor" >
        <Preview onClickingTools={this.clickingTools}></Preview>
        <Editor width={this.width} height={this.height}></Editor>
        <button onClick={this.submit}>预览</button>
      </div>
    )
  },
}
</script>

<style>
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

</style>