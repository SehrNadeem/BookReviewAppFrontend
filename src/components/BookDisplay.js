import React, { Component} from "react";
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import BooKService from "../services/book-service";
import BookContent from "./BookContent";

class BookDisplay extends Component {

  constructor() {
    super()
    this.state = {
      book: {},
      coverPhoto: {}
    }
  }

  componentDidMount() {
    let id;
    if (this.props.match){
      id = this.props.match.params.id;
    }
    else{
      id = '1'; //for testing purpose only
    } 
    
    BooKService.getBook(id).then(result => {
      this.setState({
        book: result.data.book,
        coverPhoto: result.data.book.cover_photo.url
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render() {
    return (
      <div className="card">

        <BookContent book = {this.state.book} coverPhoto = { this.state.coverPhoto }/>

        <footer className="card-footer">
          <a id='test' href={`/review/${this.state.book.id}`} className="card-footer-item">Post a Review</a>
          <a href={`/bookreviews/${this.state.book.id}`} className="card-footer-item">See All Reviews</a>
        </footer>
        
      </div>
    )
  }
}

export default withAuth(withRouter(BookDisplay));
export { BookDisplay };