const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

// use sessions for tracking logins
app.use(session({
    secret: 'Session test',
    resave: true,
    saveUninitialized: false
}));

// make user ID available in templates
app.use( (req, res, next) => {
    res.locals.currentUser = req.session.userId;
    next();
});

// mongoose connection
mongoose.connect('mongodb://localhost:27017/bookworm');
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//serve static files from /public
app.use('/static', express.static(__dirname + '/public'));

//view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//routes
const routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function() {
    console.log('The application is running on localhost:3000');
});