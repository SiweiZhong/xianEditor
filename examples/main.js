const {App} = xianEditor;

new Vue({
  el: '#app',
  components: {
    'v-xian-editor': App,
  },
  data: {
    width: 500,
    height: 200,
    text: '测试文本',
    showDialog: false,
  },
  methods: {
    preview (text){
      this.showDialog = true;
      this.text = text;
      
      setTimeout(function(){
        const els = document.querySelectorAll('.math_tag')
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, Array.from(els)]);
      })
      // MathJax.Hub.Queue(["Typeset", MathJax.Hub, Array.from(els)]);
    },
    hidingDialog (){
      this.showDialog = false;
    }
  },
})