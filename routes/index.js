const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Home'} );
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'About'} );
});

router.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'} );
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'Sign Up'} );
});

module.exports = router;