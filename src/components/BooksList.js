import React, { Component } from "react";
import { withRouter } from "react-router";
import withAuth from "../components/withAuth";
import BooKService from "../services/book-service";

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
    BooKService.getBookList(url).then(result => {
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
    this.getBookList()
  }

  displayBook(bookId){
    this.props.history.push(`/bookdisplay/${bookId}`)
  }

  getPage(position){
    let params
    if (position === 'prev')
    {
      params  = this.state.prevCursor
    } 
    else
    {
      params  = this.state.nextCursor
    }
    params = params + ':' + position
    this.getBookList(params)
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
              <th>Cover Photo</th>
            </tr>
            {this.state.books.map((book, index) => (
              <tr key={book.data.id} onClick={() => this.displayBook(book.data.id)}>
                <td>{book.data.title}</td>
                <td>{book.data.author}</td>
                <td>{book.data.short_description}</td>
                <td>{this.state.postedBy[index]}</td>
                <td>
                  <figure className="image is-128x128">
                    <img src={`${process.env.REACT_APP_SERVER_URL}${book.data.cover_photo.url}`} alt="No cover photo uploaded" />
                  </figure>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/book" className="button">Add Book</a>
        <br/>
        <nav className="pagination is-center" role="navigation" aria-label="pagination">
          <a className="pagination-previous" onClick={() => this.getPage('prev')}>Previous</a>
          <a className="pagination-next" onClick={() => this.getPage('next')} >Next page</a>
        </nav>
      </div>
    );
  }

}

export default withAuth(withRouter(BooksList));