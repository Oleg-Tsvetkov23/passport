const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const userRouters = require('./routes/user')
const session = require('express-session')
const errorMiddleware = require('./middleware/error')

require ('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
// Express body parser
app.use(express.urlencoded({ extended: true }));
// Express session
app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: true,
      saveUninitialized: true
    })
  );
// Passport Config
require('./middleware/passport')(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000
const URL = process.env.URL

mongoose.connect(URL,{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/user',userRouters)
app.use(errorMiddleware)

app.listen(PORT, console.log(`Server running on  ${PORT}`));
