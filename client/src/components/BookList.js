import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  const [id, setId] = useState(null);
  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => (
        <li onClick={() => setId(book.id)} key={book.id}>
          {book.name}
        </li>
      ));
    }
  };
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails id={id} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
