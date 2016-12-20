import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import Index from './components/index'
import Resume from './components/resume'
import BlogPost from './components/blog/post'
import BlogPage from './components/blog/page'

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Index} />
    <Route path="/resume" component={Resume} />
    <Route path="/blog/tagged(/:tag)" component={BlogPage} />
    <Route path="/blog/post(/:post)" component={BlogPost} />
    <Route path="/blog" component={BlogPage} />
  </Router>
);

export default routes