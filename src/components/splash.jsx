import React from 'react'
require('../style/splash.less')

export default class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: '100vh'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setHeight.bind(this))
    window.addEventListener('load', this.setHeight.bind(this))

    let email_link = document.createElement('a')
    email_link.setAttribute('href', 'mailto:' + 'austineng' + '.' + 'inr' + '@' + 'gmail' + '.' + 'com')
    email_link.setAttribute('id', 'email')
    this.refs.contactBar.appendChild(email_link)
  }

  componentWillUmmount() {
    window.removeEventListener('resize', requestAnimationFrame(this.setHeight.bind(this)))
    window.removeEventListener('load', this.setHeight.bind(this))
  }

  setHeight() {
    requestAnimationFrame(() => {
      this.setState({
        height: `${window.innerHeight}px`
      })
    })
  }

  render() {
    return (
      <div id='splash' style={{'height': this.state.height}}>
        <div className='title container'>
          <img id='logo' src={require('../public/logo.png')} />
          <h1>Austin Eng</h1>
          <h2>Software Engineer <span style={{'color':'#d3d3d3'}}>&#183;</span> University of Pennsylvania &#39;18</h2>
          <div ref='contactBar' className='contact-bar'>
            <a id='linkedin' href='//www.linkedin.com/in/austineng'>
            </a>
            <a id='git' href='//github.com/austinEng'>
            </a>
          </div>
          <br />
          <a href='/resume.pdf' style={{'textDecoration': 'none', 'fontSize':'20px'}}>Resume</a>
        </div>
      </div>
    )
  }
}
