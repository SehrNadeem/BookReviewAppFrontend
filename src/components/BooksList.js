import React, { Component } from "react";
import { withRouter } from "react-router";
import withAuth from "../components/withAuth";

import API from '../services/api';
import { getLocalStorage } from '../services/local-storage-service';

class BooksList extends Component  {

  constructor() {
    super();
    this.state = {
      books: [],
      postedBy: []
    }
  }

  componentDidMount(){
    let token = getLocalStorage("token")
    API.get(`books`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
      console.log(result.data)
      this.setState({ 
        books:  result.data.books,
        postedBy: result.data.posted_by
      })

    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  displayBook(bookId){
    console.log(bookId)
    this.props.history.push(`/bookdisplay/${bookId}`)
  }

  render(){
    return (
      <div>
        <table className="table is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Posted By</th>
            </tr>
            {this.state.books.map((book, index) => (
              <tr key={book.id} onClick={() => this.displayBook(book.id)}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.short_description}</td>
                <td>{this.state.postedBy[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/book" className="button">Add Book</a>
      </div>
    );
  }

}

export default withAuth(withRouter(BooksList));