import React, { Component } from "react";
import { withRouter } from "react-router";
import withAuth from "../components/withAuth";
import BooKService from "../services/book-service";

class BooksList extends Component  {

  constructor() {
    super();
    this.state = {
      books: [],
      tempBookList: [],
      postedBy: [],
      tempPostedBy: [],
      nextCursor: '',
      prevCursor: '',
      error: '',
      success: '',
      searchKey: ''   
    }
  }

  getBookList(paginationKey){
    if (this.state.searchKey) {
      BooKService.searchBookList(this.state.searchKey, paginationKey).then(result => {
        this.setStateData(result.data.books, result.data.posted_by)
      }).catch(error => {
        console.log(error)
        this.setState({
          error: error.message
        })
      })
    } 
    else {
      BooKService.getBookList(paginationKey).then(result => {
        this.setStateData(result.data.books, result.data.posted_by)
      }).catch(error => {
        this.setState({
          error: error.message
        })
      })
    }
    
  }

  componentDidMount(){
    this.getBookList()
  }

  displayBook(bookId){
    this.props.history.push(`/bookdisplay/${bookId}`)
  }

  getIndexofBook(bookId){
    for (var i=0; i++; i < this.state.books.length){
      if (this.state.books[i].data.id === bookId) {
        return i
      }
    }
  }

  setStateData(books, postedBy){
    if (books.length > 0){
      this.setState({
        books: books,
        postedBy: postedBy,
        error: '',
        success: '',
        prevCursor: books[0].cursor,
        nextCursor: books[books.length - 1].cursor
      })
    }
  }

  async deleteBook(bookId){
    this.setState({ 
      tempBookList: this.state.books,
      tempPostedBy: this.state.postedBy
    })

    let deleteIndex = this.getIndexofBook(bookId)
    const newBookList = this.state.books.filter((book) => book.data.id !== bookId );
    const newPostedBy = this.state.postedBy.filter((user, index) => index !== deleteIndex );
    
    this.setStateData(newBookList, newPostedBy)

    try {
      const result = await BooKService.deleteBook(bookId)
      console.log(result.data)
      if (result.data.delete_success){
        this.setState({ success: 'Book was successfully deleted' })
      }
    }
    catch(error){
      console.log('the delete error is: ', error.response)
      this.setStateData(this.state.tempBookList, this.state.tempPostedBy)
      this.setState({
        error: 'Book could not be deleted due to: ' + error.response.data.error
      })
    }
  }

  getNextPage(){
    this.getBookList(this.state.nextCursor + ':next')
  }

  getPrevPage(){
    this.getBookList(this.state.prevCursor + ':prev')
  }

  searchBookList = (event) => {
    this.setState({
      searchKey: event.target.value
    })
    this.getBookList()
  }

  render(){
    return (
      <div className="container">
        <br />
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Search Book List: </label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" placeholder="Book Title" onChange={this.searchBookList}/>
              </p>
            </div>
          </div>
        </div> 

        <br />
        <table className="table is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Posted By</th>
              <th>Average Rating</th>
              <th>Cover Photo</th>
              <th></th>
            </tr>
            {this.state.books.map((book, index) => (
              <tr key={book.data.id} >
                <td onClick={() => this.displayBook(book.data.id)} >{book.data.title}</td>
                <td>{book.data.author}</td>
                <td>{book.data.short_description}</td>
                <td>{this.state.postedBy[index]}</td>
                <td>{book.data.average_rating}</td>
                <td>
                  <figure className="image is-128x128">
                    <img src={`${process.env.REACT_APP_SERVER_URL}${book.data.cover_photo.url}`} alt="No cover photo uploaded" />
                  </figure>
                </td>
                <td>
                  <button className="button is-dark" onClick={ () => this.deleteBook(book.data.id) }>
                    Remove Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
        {this.state.success ? <p style={{ color: 'green' }}>{this.state.success}</p> : null}
        <a href="/book" className="button">Add Book</a>
        <br/>
        <nav className="pagination is-center" role="navigation" aria-label="pagination">
          <a className="pagination-previous" onClick={() => this.getPrevPage()}>Previous</a>
          <a className="pagination-next" onClick={() => this.getNextPage()} >Next page</a>
        </nav>
      </div>
    );
  }

}

export default withAuth(withRouter(BooksList));