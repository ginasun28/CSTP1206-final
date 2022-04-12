const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const app = express();
app.use(session({ secret: 'SECRET' }));
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

// Call each page router
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
// const plantsfinderRouter = require('./routes/plantsfinder');
// const plantscareRouter = require('./routes/plantscare');
const listsRouter = require('./routes/list');
const createRouter = require('./routes/create');
// const editplantsRouter = require('./routes/editplants');
const signoutRouter = require('./routes/signout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000000}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Run each page
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
// app.use('/plantsfinder', plantsfinderRouter);
// app.use('/plantscare', plantscareRouter);
app.use('/list', listsRouter);
app.use('/create', createRouter);
// app.use('/editplants', editplantsRouter);
app.use('/signout', signoutRouter);

app.get("/", (req, res) => {
  res.render("home");
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

module.exports = app;
