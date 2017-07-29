import React from 'react'
import mainStyles from './style/main.less'
import styles from './style/splash.less'

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
    email_link.setAttribute('id', styles.email)
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
      <div id={styles.splash} style={{'height': this.state.height}}>
        <div className={`${styles.title} ${mainStyles.container}`}>
          <img id={styles.logo} src='logo.png' />
          <h1>Austin Eng</h1>
          <h2>Software Engineer <span style={{'color':'#d3d3d3'}}>&#183;</span> University of Pennsylvania &#39;18</h2>
          <div ref='contactBar' className={styles['contact-bar']}>
            <a id={styles.linkedin} href='//www.linkedin.com/in/austineng'>
            </a>
            <a id={styles.git} href='//github.com/austinEng'>
            </a>
          </div>
          <br />
          <a href='/resume.pdf' style={{'textDecoration': 'none', 'fontSize':'20px'}}>Resume</a>
        </div>
      </div>
    )
  }
}
