const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: '.env' });
const hbshelpers = require('handlebars-helpers');
const helpers = hbshelpers();



const db = require('./DAL/loadDatabase');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addProductsRouter = require('./routes/addProduct');
const updateProductRouter = require('./routes/updateProduct');
const deleteProductRouter = require('./routes/deleteProduct');

db.Connect();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/add', addProductsRouter);
app.use('/users', usersRouter);
app.use('/update', updateProductRouter);
app.use('/delete', deleteProductRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const hbs = require('hbs');
hbs.registerHelper(helpers);


module.exports = app;
