import React, { Component} from "react";
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import API from '../services/api';
import { getLocalStorage } from '../services/local-storage-service';

class BookDisplay extends Component {

  constructor(){
    super()
    this.state = {
      book: {},
      averageRating: 0,
      coverPhoto: {}
    }
  }

  componentDidMount() {
    let token = getLocalStorage("token")
    let id = this.props.match.params.id;
    API.get(`books/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
      this.setState({
        book: result.data.book,
        averageRating: result.data.average_rating,
        coverPhoto: result.data.book.cover_photo.url
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render(){
    let ratingAvailable = false;
    if (this.state.averageRating > 0){
      ratingAvailable = true
    }
    return(
      <div className="card">
        <header className="card-header">
          <p className="card-header-title is-centered">
            Book Details
          </p>
        </header>

        <div className="card-image has-text-centered">
          <figure className="image is-128x128 is-inline-block">
            <img src={`${process.env.REACT_APP_SERVER_URL}${this.state.coverPhoto}`} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.state.book.title}</p>
              <p className="subtitle is-6">By: {this.state.book.author}</p>
              <p className="subtitle is-6"><i>{ratingAvailable ? 'Average Rating:' + this.state.averageRating : "There are no reviews posted for this book"}</i></p>
            </div>
          </div>
          <div className="content">
            <p><i>Short Description: </i>{this.state.book.short_description}</p>
          </div>
        </div>
        <footer className="card-footer">
          <a href={`/review/${this.state.book.id}`} className="card-footer-item">Post a Review</a>
          <a href={`/bookreviews/${this.state.book.id}`} className="card-footer-item">See All Reviews</a>
          <a href="/bookslist" className="card-footer-item">Remove</a>
        </footer>
      </div>
    )
  }
}

export default withAuth(withRouter(BookDisplay));