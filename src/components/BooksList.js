import React, { Component } from "react";
import withAuth from "../components/withAuth";
import API from '../services/api';
import { getLocalStorage } from '../services/local-storage-service';

class BooksList extends Component  {

  constructor() {
    super();
    this.state = {
      books: []
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
      this.setState({ books:  result.data})

    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render(){
    return (<table className="table is-hoverable is-fullwidth">
      <tbody>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
        </tr>
        {this.state.books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.short_description}</td>
          </tr>
        ))}
      </tbody>
    </table>);
  }

}

export default withAuth(BooksList)