var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Page Not Found';
  console.log('Page not found. Error status ' + `${err.status} ` + ' Error Message ' + `${err.message}`);
  res.render('page-not-found', { err });
});

// error handler
app.use((err, req, res, next) => {

  err.status = err.status || 500;
  res.status(err.status);

  if(err.status === 404){
    res.render('page-not-found', { err });
  } else {
    err.message = err.message || `We're sorry! Something has gone wrong.`;
    console.log('An error occurred with status' + `${err.status}` + 'Error Message ' + `${err.message}`);
    res.render('page-not-found', { err });
  }
});

module.exports = app;
