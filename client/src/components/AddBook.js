import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

const AddBook = (props) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const getAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option>Loading Authors... please wait</option>;
    }
    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };
  return (
    <form
      id="add-book"
      onSubmit={(e) => {
        e.preventDefault();
        props.addBookMutation({
          variables: {
            name,
            genre,
            authorId,
          },
          refetchQueries: [{ query: getBooksQuery }]
        });
      }}
    >
      <div className="field">
        <label htmlFor="name">Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="author">Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Select author</option>
          {getAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
