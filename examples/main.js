const {App} = xianEditor;

new Vue({
  el: '#app',
  render: h => h(App, 
    {
      props: {
        width: 600,
        height: 200,
      }
    }
  )
})