import React from 'react'
import {render} from 'react-dom'
import Index from './index'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, require('./data'))
console.log(store.getState())

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <Index />
    </Provider>,
    document
  )
}
