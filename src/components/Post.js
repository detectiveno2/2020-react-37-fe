import React, { Component } from 'react';
import axios from 'axios';

import like from '../assets/icons/notification.png';
import heart from '../assets/icons/heart.png';
import commentIcon from '../assets/icons/comment.png';
import share from '../assets/icons/share.png';

import '../css/Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { post: {}, liked: false, userName: '', content: '' };

    this.inputComment = React.createRef();

    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.doComment = this.doComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { post, liked, userName } = this.props;
    this.setState({ post, liked, userName });
  }

  handleLike(idPost) {
    return (event) => {
      axios
        .post(`http://localhost:5400/api/post/${idPost}/like`, idPost)
        .then((res) => {
          const { post, liked } = res.data;
          this.setState({ post, liked });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  handleComment(idPost) {
    return (event) => {
      event.preventDefault();

      const { content } = this.state;
      axios
        .post(`http://localhost:5400/api/post/${idPost}/comment`, { content })
        .then((res) => {
          const post = res.data;
          this.setState({ post, content: '' });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  doComment() {
    this.inputComment.current.focus();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { liked, post, userName, content } = this.state;

    return (
      <div className="Post">
        <div className="PostTitle">
          <p className="PostPara ParaTitle">{post.author}</p>
        </div>
        <div className="PostImage">
          <img src={post.imageUrl} alt={post.caption} />
        </div>
        <div className="PostAction">
          <div>
            <button onClick={this.handleLike(post.id)}>
              <img src={liked ? heart : like} alt="like" width="26" />
            </button>
            <button onClick={this.doComment}>
              <img src={commentIcon} alt="comment" width="26" />
            </button>
            <button>
              <img src={share} alt="share" width="26" />
            </button>
          </div>
        </div>
        <div className="PostLikes">
          <p className="PostPara">{`${
            post.likes ? post.likes.length : 0
          } likes.`}</p>
        </div>
        <div className="PostCaptionArea">
          <p className="PostPara">
            <span>{post.author}</span>
            {` ${post.caption}`}
          </p>
        </div>
        <div className="PostCommentArea">
          {!post.comments ? (
            <p>Something is wrong, please try again.</p>
          ) : (
            post.comments.map((comment) => (
              <div className="PersonalComment" key={comment.id}>
                <p className="PostPara">
                  <span>{comment.author}</span> {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="PostComment">
          <form onSubmit={this.handleComment(post.id)}>
            <input
              type="text"
              name="content"
              value={content}
              onChange={this.handleChange}
              placeholder={`${userName}...`}
              ref={this.inputComment}
              required
            />
            <button type="submit" disabled={!content ? true : false}>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Post;
