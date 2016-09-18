
import * as Actions from './actions'

export default function root(state={}, action) {
  switch(action.type) {
    case Actions.OPEN_PROJECT:
      return Object.assign({}, state, {
        open: action.name
      })
    case Actions.CLOSE_PROJECT:
      if (state.open != action.name) return state
      return Object.assign({}, state, {
        open: null
      })
    default:
      return state
  }
}
