// @flow
import React, { Component } from 'react';
import Post from './posts/post';
import '../style/components/posts/post-theme.css';

class Blogpost extends Component {
  renderPost() {
    const id = this.props.match.params.postid;
    return <Post id={id} />;
  }

  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

export default Blogpost;
