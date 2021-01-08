const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: '.env' });
const session = require("express-session");
const hbshelpers = require('handlebars-helpers');
const helpers = hbshelpers();
const userDB = require('./models/mongooseModels/accounts');
const passport = require('./passport');


const db = require('./DAL/loadDatabase');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const signinRouter = require('./routes/signin');
const signinIndirectRouter = require('./routes/signinIndirect');

db.Connect();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));




//passport middleware
app.use(session({ secret: process.env.SESSION_SECRET , cookie: { maxAge: 360000000 }})); //time live
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(async function(req, res, next) {
  if(req.url!=='/signinIndirect/submit' && req.url!=='/signin/submit') {
    if (!req.user) {
        if (req.cookies.id) {
          const admin = await userDB.findById(req.cookies.id);
          return res.render('signinIndirect', {email: admin.email})
        }
        else {
          return res.render('signin');
        }
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});


app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/userslist', usersRouter);
app.use('/signin/submit', signinRouter);
app.use('/signinIndirect/submit', signinIndirectRouter);
app.use('/', function(req, res){
  res.redirect('/products');
});




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
hbs.registerPartials(path.join(__dirname,'views','partials'));


module.exports = app;
