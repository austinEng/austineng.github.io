import React from 'react'
import {connect} from 'react-redux'
import Splash from './splash'
import Projects from './projects'
import classnames from 'classnames'
import {openProject} from './actions'
import styles from './style/main.less'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(openProject(location.hash.substring(1)))
    window.addEventListener('hashchange', () => {
      this.props.dispatch(openProject(location.hash.substring(1)))
    })
  }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,600|Raleway:100,300" rel="stylesheet" />
          <link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' />
          <link rel='stylesheet' type='text/css' href='main.css' />
          <link rel='icon' href='logo.png' />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </head>
        <body className={classnames({[styles.open]: this.props.open})}>
          <Splash />
          {/* <Projects /> */}
          <script src='main.js'></script>
        </body>
      </html>
    )
  }
}

export default connect(function(state, ownProps) {
  return {
    title: state.title,
    open: state.open
  }
})(Index)
