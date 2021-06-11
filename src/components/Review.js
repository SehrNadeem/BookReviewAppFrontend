import React, { Component } from "react";
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import BooKService from "../services/book-service";
import ReviewService from "../services/review-service";

class Review extends Component {

  constructor() {
    super()
    this.state = {
      book: {},
      details: '',
      rating: 1,
      error: ''
    }
  }

  componentDidMount(){
    let bookId = this.props.match.params.book_id;
    BooKService.getBook(bookId).then(result => {
      this.setState({
        book: result.data.book
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let bookId = this.props.match.params.book_id;

    ReviewService.createReview({
      book_id: bookId,
      details: this.state.details,
      rating: this.state.rating
    }).then(result => {
      console.log(result)
      this.props.history.push(`/bookreviews/${bookId}`);
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
          <h1>Post a Review for <b>{this.state.book.title}</b> by <b>{this.state.book.author}</b></h1>
          <label>Rating (1 to 5) :</label>
          <input name='rating' value={this.state.rating} type="number" min="1" max="5" onChange={this.handleChange} />
          <label>Details :</label>
          <input name='details' value={this.state.details} onChange={this.handleChange} />
          {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
          <input type='submit' value='Post Review' />
        </form>
      </div>
    )
  }
  
}

export default withAuth(withRouter(Review));