import React, { Component } from "react";
import API from '../services/api';
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import { getLocalStorage } from '../services/local-storage-service';

class Book extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      shortDescription: '',
      coverPhoto: {},
      error: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileChange = (event) => {
    this.setState({
      coverPhoto: event.target.files[0]
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let token = getLocalStorage("token")

    const formData = new FormData()
    formData.append("cover_photo", this.state.coverPhoto)
    formData.append("title", this.state.title)
    formData.append("author", this.state.author)
    formData.append("short_description", this.state.shortDescription)

    API.post(`books`, formData, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
      console.log(result)
      this.props.history.push("/bookslist");
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Enter Book Details</h1>
          <label>Title :</label>
          <input name='title' value={this.state.title} onChange={this.handleChange} />
          <label>Author :</label>
          <input name='author' value={this.state.author} onChange={this.handleChange} />
          <label>Short Description :</label>
          <input name='shortDescription' value={this.state.shortDescription} onChange={this.handleChange} />
          <label>Upload Cover Photo</label>
          <input type="file" onChange={this.handleFileChange} />
          {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
          <input type='submit' value='Add Book' />
        </form>
      </div>
    )
  }
  
}

export default withAuth(withRouter(Book));