import React from 'react';

const BookContent = (props) => {

  let ratingAvailable = false;
  if (props.book.average_rating > 0){
    ratingAvailable = true
  }

  return (
    <div>
      <header className="card-header">
        <p className="card-header-title is-centered">
          Book Details
        </p>
      </header>

      <div className="card-image has-text-centered">
        <figure className="image is-128x128 is-inline-block">
          <img src={`${process.env.REACT_APP_SERVER_URL}${props.coverPhoto}`} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4" id="title">{props.book.title}</p>
            <p className="subtitle is-6" id="author">By: {props.book.author}</p>
            <p className="subtitle is-6" id="total-reviews">{props.book.total_reviews} review(s) posted</p>
            <p className="subtitle is-6" id="average-rating"><i>{ratingAvailable ? 'Average Rating: ' + props.book.average_rating : "---"}</i></p>
          </div>
        </div>
        <div className="content">
          <p id="short-description"><i>Short Description: </i>{props.book.short_description}</p>
        </div>
      </div>
    </div>
  )
};

export default BookContent;