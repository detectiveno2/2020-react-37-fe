import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';

import UploadPostForm from '../components/UploadPostForm';

import Post from '../components/Post';

import '../css/Newfeeds.css';

class Newfeeds extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [], userName: '' };

    this.onPost = this.onPost.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5400/api/newfeeds')
      .then((res) => {
        const { posts, user } = res.data;
        this.setState({ posts, userName: user.userName });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onPost(posts) {
    this.setState({ posts });
  }

  render() {
    const { posts, userName } = this.state;

    return (
      <div className="Newfeeds py-3">
        <Container>
          <UploadPostForm onPost={this.onPost} userName={userName} />
          <div className="PostsArea">
            {posts.map((post) => (
              <Post
                post={post}
                liked={post.likes.includes(userName) ? true : false}
                userName={userName}
                key={post.id}
              />
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Newfeeds;
