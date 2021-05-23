const express = require("express");
const Session = require("express-session");
const passport = require("passport");
const { SERVER_PORT } = require("./server_config");
const { DB_URL } = require('./mongodb-config');
const { connectDB } = require('./utilities/mongodb-utilities');

require('./authentication/passport-local');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(Session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index').router);

connectDB(DB_URL);
app.listen(SERVER_PORT, (err) => {
  if (err)
    return console.log("An error has occured while starting the server");
  console.log("Server is up and running at http://localhost:" + SERVER_PORT);
});