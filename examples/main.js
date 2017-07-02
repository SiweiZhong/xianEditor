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
      console.log(text)
      this.showDialog = true;
    },
    hidingDialog (){
      this.showDialog = false;
    }
  },
})