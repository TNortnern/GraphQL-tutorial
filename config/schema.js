const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/Book");
const Author = require("../models/Author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

let books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Name of the Fire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "Name of the Ice", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Name of the Earth", genre: "Horror", id: "4", authorId: "3" },
  { name: "Name of the Psyhcic", genre: "Adventure", id: "5", authorId: "2" },
];

let authors = [
  { name: "Patrick Rothfuss", age: "42", id: "1" },
  { name: "Ron Tilopson", age: "32", id: "2" },
  { name: "Will Pingley", age: "25", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
