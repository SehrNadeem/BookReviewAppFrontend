import React, { Component} from "react";
import withAuth from "../components/withAuth";
import { withRouter } from "react-router-dom";
import API from '../services/api';
import { getLocalStorage } from '../services/local-storage-service';

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
    let token = getLocalStorage("token")
    let id = this.props.match.params.id;

    API.get(`books/${id}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
      this.setState({
        book: result.data.book
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })

    API.get(`reviews/get_reviews_for_book/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
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
    return(
      <div>
        <br/>
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