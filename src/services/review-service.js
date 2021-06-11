import API from './api';

export default class ReviewService {

  static createReview(formData){
    return API.post(`reviews`, formData, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
  }

  static getBookReviews(id){
    return API.get(`reviews/get_reviews_for_book/${id}`)
  }
}