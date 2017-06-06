<template>
<div>
  <button @click="fn">点我</button>

  <div v-for="v in todos">
    {{v}}
  </div>
</div>

</template>

<script>
import {combineReducers, createStore} from 'redux'

const 
  ADD_TODO = 'ADD_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

const { SHOW_ALL } = VisibilityFilters;

function addTodo(text) {
  return { type: ADD_TODO, text }
}

function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

const store = createStore(todoApp)

let unsubscribe = store.subscribe(function(){console.log(store.getState())});

export default {
  name: 'app',
  data () {
    return {
      todos: store.getState().todos,
      i: 0,
    }
  },
  computed: {
  },
  methods: {
    fn (){
      
      store.dispatch(addTodo(this.i++))
      const state = store.getState();
      this.todos = state.todos;
    }
  }
}
</script>

<style>

</style>