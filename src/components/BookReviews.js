import React, { Component} from "react";
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import BooKService from "../services/book-service";
import ReviewService from "../services/review-service";

class BookReviews extends Component {

  constructor(props){
    super(props)
    this.state = {
      book: {},
      reviews: [],
      postedBy: []
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    BooKService.getBook(id).then(result => {
      console.log(result.data.book)
      this.setState({
        book: result.data.book
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })

    ReviewService.getBookReviews(id).then(result => {
      this.setState({
        reviews: result.data.reviews,
        postedBy: result.data.posted_by
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render(){
    if (this.state.book.total_reviews === 0){
      return (
        <p><i>There are no reviews posted for this book</i></p>
      );
    }
    return (
      <div>
        <h1>Reviews of <b>{this.state.book.title}</b></h1>
        <br/>
        <table className="table is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Rating</th>
              <th>Details</th>
              <th>Posted By</th>
            </tr>
            {this.state.reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{review.rating}</td>
                <td>{review.details}</td>
                <td>{this.state.postedBy[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withAuth(withRouter(BookReviews));