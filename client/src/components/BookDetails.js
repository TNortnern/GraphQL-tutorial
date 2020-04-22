import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ data, id }) => {
  const displayBookDetails = () => {
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
        return (
            <div>
                No book selected.
            </div>
        )
    }
  };
  return (
    <div id="book-details">
      {displayBookDetails()}
    </div>
  );
};

export default graphql(getBookQuery)(BookDetails);
