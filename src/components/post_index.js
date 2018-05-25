import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    console.log(this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">Add a Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
  
  renderPosts() {
    const posts = this.props.posts;
    return Object.keys(posts).map(id => {
      const post = posts[id];
      if (post.title) {
        return(
          <li className="list-group-item" key={id}>
            {post.title} <br/>
            {post.content}

          </li>
        );
      }
      
    });
  }
  /* renderLPosts() { // Using Lodash to map over posts object
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title} 
          {post.categories} 
          {post.content} 
        </li>
      );
    });
  } */
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostIndex);