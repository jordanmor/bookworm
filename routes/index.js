const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('index', {title: 'Home'} );
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'About'} );
});

router.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'} );
});

// Login
router.get('/login', (req, res) => {
    res.render('login', {title: 'Log In'});
});

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                const err = new Error('Wrong email or password.');
                err.status = 401;
                next(err);
            } else {
                req.session.userID = user._id;
                res.redirect('/profile');
            }

        });
    } else {
     const err = new Error('Email and password are required.');
     err.status = 401;
     next(err);   
    }
});

// Register
router.get('/register', (req, res) => {
    res.render('register', {title: 'Sign Up'} );
});

router.post('/register', (req, res, next) => {
    if(req.body.name &&
       req.body.email &&
       req.body.favoriteBook &&
       req.body.password &&
       req.body.confirmPassword) {

        //confirm that user typed the same password twice
        if(req.body.password !== req.body.confirmPassword) {
            const err = new Error('Passwords do not match');
            err.status = 400;
            next(err);
        }

        //create object with form input
        const userData = {
            name: req.body.name,
            email: req.body.email,
            favoriteBook: req.body.favoriteBook,
            password: req.body.password
        }

        // use schema's create method to insert document into Mongo
        User.create(userData, function (error, user) {
            if(error) {
                next(err);
            } else {
                req.session.userID = user._id;                
                res.redirect('/profile');
            }
        });    

    } else {
        const err = new Error('All fields required');
        err.status = 400;
        next(err);
    }
});

module.exports = router;