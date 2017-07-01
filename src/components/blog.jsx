// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import * as actions from '../actions';
import POSTS_LIST from './posts/_list';
import '../style/components/blog.css';

class Blog extends Component {
  paginateButton() {
    const numPerPage = 3,
      postsNum = POSTS_LIST.length,
      pageNum = Math.ceil(postsNum / numPerPage);

    return [...new Array(pageNum)].map((cv, i) => (
      <div
        key={i}
        className="page-btn"
        onClick={() => this.context.store.dispatch(push(`${i + 1}`))}
      >
        {i + 1}
      </div>
    ));
  }

  renderPostsList() {
    const numPerPage = 3,
      pageIdx = this.props.match.params.pageid,
      PartialPosts = POSTS_LIST.slice(
        (pageIdx - 1) * numPerPage,
        pageIdx * numPerPage,
      );

    return PartialPosts.map((cv) => {
      const { id, title, discription, postDate } = cv;
      return (
        <div
          key={title}
          className="post-container"
          onClick={() => this.context.store.dispatch(push(`${pageIdx}/${id}`))}
        >
          <div className="line" />
          <div className="post">
            <div className="post-left">{id}</div>
            <div className="post-right">
              <div className="title">{title}</div>
              <div className="post-date">{postDate}</div>
              <div className="discription">{discription}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div id="blog">
        <div id="btn-container">
          {this.paginateButton()}
        </div>
        <div id="list-container">
          {this.renderPostsList()}
        </div>
      </div>
    );
  }
}

Blog.contextTypes = {
  store: PropTypes.object.isRequired,
};
export default Blog;
