import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

import Index from './index'
import Resume from './resume'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

export default function render(locals, callback) {
  const store = createStore(reducer, locals)

  let html
  switch(locals.path) {
    case '/':
      html = renderToString(
        <Provider store={store}>
          <Index />
        </Provider>
      )
      callback(null, '<!DOCTYPE html>' + html)
      break;
    case '/resume':
      html = renderToStaticMarkup(
        <Resume />
      )
      callback(null, '<!DOCTYPE html>' + html)
      break;
  }

}
