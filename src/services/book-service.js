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

  static getBookList(params){
    let url = 'books_paginated/'
    if (params)
    {
      url += params;
    }
    return API.get(url, {
      headers: {
        "Accept": "application/json"
      }
    })
  }
}