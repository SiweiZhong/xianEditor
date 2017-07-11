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
      setTimeout(() => {
        const els = this.$refs.dialog.querySelectorAll('.math_tag')
        Array.from(els).forEach(el => {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, el]);
        })
      })
    },
    hidingDialog (){
      this.showDialog = false;
    }
  },
})