import React from 'react'
import {renderToString} from 'react-dom/server'
import Index from './index'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

module.exports = function render(locals, callback) {
  const store = createStore(reducer, locals)

  let html = renderToString(
    <Provider store={store}>
      <Index />
    </Provider>
  )
  callback(null, '<!DOCTYPE html>' + html)
}
