const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Home'} );
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'About'} );
});

router.get('/contact', (req, res) => {
    res.render('contact', {title: 'contact'} );
});

module.exports = router;