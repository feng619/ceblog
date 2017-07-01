// @flow
import React, { Component } from 'react';
import marked from 'marked';
import p14 from './14';
import p15 from './15';
import p16 from './16';
import p19 from './19';
import p20 from './20';

const posts = {
  14: p14,
  15: p15,
  16: p16,
  19: p19,
  20: p20,
};

class Post extends Component {
  componentDidMount() {
    this.refs.post.innerHTML = marked(posts[this.props.id]);
  }

  render() {
    return <div className="theme" ref="post" />;
  }
}

export default Post;
