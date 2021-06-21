import API from './api';

export default class BooKService {

  static createBook(formData){
    return API.post(`books`, formData, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
  }

  static getBook(id){
    return API.get(`books/${id}`)
  }

  static deleteBook(id){
    return API.delete(`books/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })  
  }

  static getBookList(paginationKey){
    let url = 'books_paginated/'
    if (paginationKey) {
      url += paginationKey;
    }
    return API.get(url, {
      headers: {
        "Accept": "application/json"
      }
    })
  }

  static searchBookList(searchQuery){
    let url = 'search_books/?q='
    if (searchQuery) {
      url += searchQuery;
    }
    return API.get(url, {
      headers: {
        "Accept": "application/json"
      }
    })
  }
}