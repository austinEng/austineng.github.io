import React from 'react'
import {render} from 'react-dom'
import Index from '../components/index'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../redux/reducer'

const store = createStore(reducer, {})

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <Index />
    </Provider>,
    document
  )
}
