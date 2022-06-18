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

/* GET home page. */
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
  res.render("new-book", { title: "New Book"});
}));

router.post('/books/new', asyncHandler(async (req,res) => {
  const book = await Book.create(req.body);
  console.log(book);
  res.redirect("/books/");
}));

router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book, title: 'Update Book'});
}));

router.post('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    await book.update(req.body);
    res.redirect("/books/");
  } else{
    res.redirect("update-book", { book, title: 'Update Book'});
  }
}));



// get / - Home route should redirect to the /books route - done
// get /books - Shows the full list of books - done -- fix the name link on the view
// get /books/new - Shows the create new book form --done
// post /books/new - Posts a new book to the database -- done 
// get /books/:id - Shows book detail form -- done
// post /books/:id - Updates book info in the database -- done
// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting

module.exports = router;
