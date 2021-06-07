import React, { Component } from "react";
import API from '../services/api';
import { withRouter } from "react-router-dom";
import { getLocalStorage } from '../services/local-storage-service';

class Book extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      shortDescription: '',
      error: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let token = getLocalStorage("token")

    API.post(`books`, {
      title: this.state.title,
      author: this.state.author,
      short_description: this.state.shortDescription
    }, {
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
          {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
          <input type='submit' value='Add Book' />
        </form>

      </div>
    )
  }
  
}

export default withRouter(Book);