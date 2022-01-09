var express = require('express');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
require('dotenv').config()

const category = require('./API/Category')

var app = express();
var indexAdmin = require('./Routes/Admin/Index');
var indexClient = require('./Routes/Client/index');
//Setup View Engine

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Public')));

require('./passport')(passport);

app.route('/login')
    .get(async(req, res) => {
        const categories = await category.getCategory();
        res.render('Client/login', {
            categories,
            user: req.user,
            message: req.flash('error'),
            messageSuccess: req.flash('message')
        });
    })
    .post(passport.authenticate('login-account', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))

app.route('/admin/login')
.get((req, res) => res.render('Admin/login', {
    messageSignup: req.flash('successSingup'),
    message: req.flash('error')
}))
.post(passport.authenticate('login-account-admin', {
    failureRedirect: '/admin/login',
    successRedirect: '/admin',
    failureFlash: true
}))

app.get('/auth/google', passport.authenticate('login-google', { scope: ['email', 'profile'] }));

// app.get('/google/callback',
// passport.authenticate('login-google', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        backURL = req.header('Referer') || '/';
        req.user = {};
        res.redirect(backURL);
    });
});


//Routing
app.use('/', indexClient);
app.use('/admin', indexAdmin);

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Không tìm thấy trang')
})

app.use((err, req, res, next) => {
        console.error(err.message)
        res.type('text/plain')
        res.status(500)
        res.send('500 - Server Error')
    })
    //Set Up Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://localhost:${port}`))