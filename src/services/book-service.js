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

  static getBookList(pagination_key){
    let url = 'books_paginated/'
    if (pagination_key) {
      url += pagination_key;
    }
    return API.get(url, {
      headers: {
        "Accept": "application/json"
      }
    })
  }
}