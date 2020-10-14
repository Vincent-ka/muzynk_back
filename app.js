require("dotenv").config();
require("./config/mongo");

const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const logger = require('morgan');

const cors = require('cors')

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

app.use(cors())

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: false,
  })
);

const server = app.listen(3001);

//Socket.io

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
}); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan("dev"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/users", require("./routes/users"));
app.use("/chats", require("./routes/chats"));
app.use("/forums", require("./routes/forums"));
app.use("/subjects", require("./routes/subjects"));
app.use("/postsForum", require("./routes/postsForum"));
app.use("/feeds", require("./routes/feeds"));
app.use("/postsFeed", require("./routes/postsFeed"));
app.use("/tags", require("./routes/tags"));
app.use("/auth", require("./routes/auth"));

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
