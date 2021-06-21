import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookContent from '../components/BookContent';
// import BookDisplay from '../components/BookDisplay';
// import BooKService from '../services/book-service';

Enzyme.configure({ adapter: new Adapter() })

test('Book content displays book information', () => {

  const book = {
    title: "Book 1",
    author: "User 1",
    total_reviews: 1,
    average_rating: 5,
    short_description: "testing"  
  }

  const bookContent = shallow(<BookContent book= { book } />);

  const title = bookContent.find('#title').text()
  const author = bookContent.find('#author').text()
  const totalReviews = bookContent.find('#total-reviews').text()
  const averageRating = bookContent.find('#average-rating').text()
  const shortDescription = bookContent.find('#short-description').text()

  expect(title).toEqual(book.title);
  expect(author).toEqual('By: ' + book.author);
  expect(totalReviews).toEqual(book.total_reviews + ' review(s) posted');
  expect(averageRating).toEqual('Average Rating: ' + book.average_rating);
  expect(shortDescription).toEqual('Short Description: ' + book.short_description);

});

// test('Should fetch book data from server', () => {

//   jest.mock('../services/book-service');

//   BooKService.getBook = jest.fn(() => {
//     return Promise.resolve();
//   })

//   const bookDisplay = shallow(<BookDisplay />)
//   console.log(bookDisplay.debug())
 
//   expect(BooKService.getBook).toHaveBeenCalled();
// });