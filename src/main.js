import Vue from 'vue'
import App from './App.vue'


new Vue({
  el: '#app',
  render: h => h(App, 
    {
      props: {
        width: 400,
        height: 200,
      }
    }
  )
})

