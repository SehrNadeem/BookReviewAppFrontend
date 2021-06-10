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
      postedBy: [],
      nextCursor: '',
      prevCursor: ''
    }
  }

  getBookList(url){
    let token = getLocalStorage("token")
    API.get(url, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(result => {
      console.log(result.data.books)
      let books = result.data.books
      this.setState({ 
        books:  books,
        postedBy: result.data.posted_by,
        prevCursor: books[0].cursor,
        nextCursor: books[books.length - 1].cursor
      })

    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  componentDidMount(){
    this.getBookList("books_paginated")
  }

  displayBook(bookId){
    console.log(bookId)
    this.props.history.push(`/bookdisplay/${bookId}`)
  }

  getNextPage(){
    let url = `books_paginated/${this.state.nextCursor}:next`
    console.log(url)
    this.getBookList(url)
  }

  getPreviousPage(){
    let url = `books_paginated/${this.state.prevCursor}:prev`
    this.getBookList(url)
  }

  render(){
    return (
      <div className="container">
        <table className="table is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Posted By</th>
            </tr>
            {this.state.books.map((book, index) => (
              <tr key={book.data.id} onClick={() => this.displayBook(book.data.id)}>
                <td>{book.data.title}</td>
                <td>{book.data.author}</td>
                <td>{book.data.short_description}</td>
                <td>{this.state.postedBy[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/book" className="button">Add Book</a>
        <br/>
        <nav className="pagination is-center" role="navigation" aria-label="pagination">
          <a className="pagination-previous" onClick={() => this.getPreviousPage()}>Previous</a>
          <a className="pagination-next" onClick={() => this.getNextPage()} >Next page</a>
        </nav>
      </div>
    );
  }

}

export default withAuth(withRouter(BooksList));