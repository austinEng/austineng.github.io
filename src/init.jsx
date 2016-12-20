import React from 'react'
import {renderToString} from 'react-dom/server'
import { match, RouterContext } from 'react-router'  
import routes from './routes'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducer'

module.exports = function render(locals, callback) {
  var {posts, tagged} = locals;
  var post_data = {posts, tagged};
  const store = createStore(reducer, {post_data})

  match({
    routes,
    location: locals.path
  }, (error, redirectLocation, renderProps) => {

    callback(null, `<!DOCTYPE html>${renderToString(
      <RouterContext 
        {...renderProps}
        createElement={(Component, props) => {
          return (
          <Provider store={store}>
            <Component {...props} />
          </Provider>
          )
        }} 
      />
    )}`)
  })
}
