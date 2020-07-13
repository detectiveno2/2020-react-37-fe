import React, { Component } from 'react';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import axios from 'axios';

import '../css/UploadPostForm.css';

class UploadPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      image: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFileChange(event) {
    this.setState({
      image: event.target.files[0],
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const { caption, image } = this.state;
    const { onPost } = this.props;

    data.append('caption', caption);
    data.append('image', image);

    axios
      .post('http://localhost:5400/api/post', data)
      .then((res) => {
        const posts = res.data;
        this.setState({ caption: '', image: '' });
        onPost(posts);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const { caption } = this.state;
    const { userName } = this.props;

    return (
      <div className="UploadPostForm ">
        <div className="Form-title">
          <p>Create post</p>
        </div>
        <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <FormGroup>
            <Label for="caption">Caption</Label>
            <Input
              type="textarea"
              name="caption"
              id="caption"
              value={caption}
              onChange={this.handleChange}
              placeholder={`How do you feel, ${userName}?`}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={this.handleFileChange}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Upload
          </Button>
        </Form>
      </div>
    );
  }
}

export default UploadPostForm;
