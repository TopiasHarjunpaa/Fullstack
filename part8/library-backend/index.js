const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const { v1: uuid } = require("uuid");

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      let filteredBooks = await Book.find().populate("author");
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (b) => b.author.name === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: async () => {
      const authors = await Author.find();
      const books = await Book.find().populate("author");

      const countAuthorsBooks = (author) => {
        return books.filter((b) => b.author.name === author.name).length;
      };
      const authorsWithBookCount = authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author.id,
        bookCount: countAuthorsBooks(author),
      }));

      console.log(authorsWithBookCount);
      return authorsWithBookCount;
    },
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          console.log(error.message);
        }
      }
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (_root, args, { currentUser }) => {
      console.log(currentUser);
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new UserInputError("User not found");
      }

      return author;
    },
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre ? args.favoriteGenre : "",
      });
      console.log(user);
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log(user);
      if (!user || args.password !== "user") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
