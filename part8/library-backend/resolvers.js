const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

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
      return authors;
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
        author = new Author({ name: args.author, bookCount: 0 });
        try {
          await author.save();
        } catch (error) {
          console.log(error.message);
        }
      }
      author = await Author.findOneAndUpdate(
        { name: author.name },
        { bookCount: author.bookCount + 1 }
      );
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
