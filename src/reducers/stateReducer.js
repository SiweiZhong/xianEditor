import constants from '../constants'

const initEditorState = {
  location: 0,
  rowsIndex: [],
}
export function editorState(state=initEditorState, action){
  switch(action.type){
    case constants.SET_LOCATION:
      return Object.assign({}, state, {
        location: action.value
      })
    case constants.SET_ROWS_INDEX: {
      let rows = [...state.rowsIndex];
      rows.push(action.value);
      return Object.assign({}, state, {
        rowsIndex: rows.sort((a, b) => a - b)
      })
    }
    case constants.REMOVE_ROWS_INDEX: {
      let rows = [...state.rowsIndex];
      action.value.forEach(v => rows.splice(rows.indexOf(v), 1));
      return Object.assign({}, state, {
        rowsIndex: rows
      })
    }
    default:
      return state;
  }
}