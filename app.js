const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");


const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017");


const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// Connect Mongo
(async () => {
  try {
     await mongoClient.connect();
     app.locals.collection = mongoClient.db("test").collection("users");
     console.log("Mongo connected!");
 }catch(err) {
     return console.log(err);
 } 
})();

// view engine setup
app.engine("hbs", expressHbs.engine(
  {
      layoutsDir: "views/layouts", 
      defaultLayout: "layout",
      extname: "hbs"
  }
))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.redirect('/');
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;

const host = "127.0.0.1";
const port = 3000;
app.listen(port, host)
console.log(`Listening on ${host}:${port}`)