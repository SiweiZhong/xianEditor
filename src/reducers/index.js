import {combineReducers, createStore} from 'redux'

import {words} from './inputReducer'
import {editorState} from './stateReducer'

function app(state={}, action){
  const _editorState = editorState(state.editorState, action)

  return {
    editorState: _editorState,
    words : words(state.words, action, _editorState),
  }
}

export default createStore(app)