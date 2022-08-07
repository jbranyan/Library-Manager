var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

function asyncHandler(cb){
  return async(req,res,next) => {
    try{
      await cb(req, res, next)
    } catch(error){
      next(error);
    }
  }
}

/* GET home page and redirect to books. */
router.get('/', async function(req, res) {
  res.redirect("/books");
}); 

/* Shows the full list of books. */
router.get('/books', asyncHandler(async (req, res) => {
  const library = await Book.findAll();
  res.render("index", {books: library, title: "Books"});
}));

/* Shows the create a new book form. */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("new-book", {book:{title: "", author: "", genre: "", year: "" }, title: "New Book"});
}));

/* Creates a new book in the database. */
router.post('/books/new', asyncHandler(async (req,res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }
  }
}));

/* Gets a book title. */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("update-book", { book, title: 'Update Book'});
  } else{
    next();
  }
}));

/* Updates the book in the database. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book){
      await book.update(req.body);
      res.redirect("/books/");
    } else {
        next();
    }
  }  catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("update-book", { book, errors: error.errors, title: "Update Book" })
    } else {
      throw error;
    }
  }
}));


/* Delete individual book. */
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    await book.destroy();
    res.redirect("/books/");
  } else {
    next();
  }
}));

module.exports = router;
