<template> 
  <div class="icons">
    <span class="icon" @click="clickingBold">B</span>
    <span class="icon" @click="clickingAutoLinefeed">Linefeed</span>
    <span class="icon" @click="clickingMath">Math</span>
    <!--<span class="icon">I</span>
    <span class="icon">U</span>
    <span class="icon">link</span>-->
    <!--<div style={{display: this.link || 'none'}}></div>-->
  </div>
</template>
<script>
import store from './reducers'
export default {
  data (){
    return{
      autoLinefeed: false,
    }
  },
  methods: {
    clickingBold (event){
      this.$emit('clickingTools', 'bold');
    },
    clickingAutoLinefeed (event){
      this.$emit('clickingTools', 'autoLinefeed', this.autoLinefeed);
      this.autoLinefeed = !this.autoLinefeed;
    },
    clickingMath (event){
      this.$emit('clickingTools', 'math');
    },
  },
}
</script>
<style scoped>
.icons * {
  box-sizing: border-box;
}
.icons {
  border: 1px solid var(--border-color);
  border-bottom-width: 0px;
  background: #f3f3f3;
}
.icon {
  line-height: 1.6em;
  min-width: 1.42em;
  text-align: center;
  user-select: none;
  display: inline-block;
  box-sizing: border-box;

  margin-right: 4px;
  cursor: pointer;
}
</style>