import React, {Component} from 'react'

export default class BlogPost extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.post_data)
    return (
      <div className="blog-post" />
    )
  }
}