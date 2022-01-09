var express = require('express')
    // var thanhVien = require('./Database/models/ThanhVien');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var credentials = require('./credentials')
var GoogleStrategy = require('passport-google-oauth20').Strategy
var config = credentials.authProviders
var app = express();
var env = app.get('env')
const User = require('./API/User')

module.exports = function(passport) {
    passport.use('login-account', new LocalStrategy( async function(email, password, done) {
        let notify = 'Thông tin đăng nhập không chính xác!'
        const response = await User.login({email, password});
        if(response.error){
            return done(null, false, { message: notify });
        }else{
            return done(null, response);
        }
    }));

    passport.use('login-account-admin', new LocalStrategy( async function(email, password, done) {
        let notify = 'Thông tin đăng nhập không chính xác!'
        const response = await User.login({email, password});
        if(response.error){
            return done(null, false, { message: notify });
        }else if(response.user.role != 'customer'){
            return done(null, response);
        }else{
            return done(null, false, { message: notify });
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}