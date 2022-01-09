var express = require('express');
// var thanhVien = require('../../Database/models/ThanhVien');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var router = express.Router();

router.get('/signup', (req, res) => {
    // res.render('Admin/Signup', {
    //     email: '',
    //     password: '',
    //     hoten: ''
    // });
});

router.post('/signup', (req, res) => {
    // let acc = req.body
    // let error = ''
    // if (!acc.hoten) {
    //     error = 'Vui lòng nhập họ tên'
    // } else if (!acc.email) {
    //     error = 'Vui lòng nhập email'
    // } else if (!acc.password) {
    //     error = 'Vui lòng nhập mật khẩu'
    // } else if (acc.password.length < 6) {
    //     error = 'Mật khẩu phải có từ 6 ký tự'
    // }

    // if (error.length > 0) {
    //     res.render('admin/Signup', {
    //         errorMessage: error,
    //         hoten: acc.hoten,
    //         email: acc.email,
    //         password: acc.password
    //     })
    // } else {
    //     bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //         thanhVien.create({
    //             hoten: req.body.hoten,
    //             email: req.body.email,
    //             password: hash
    //         }).then(function(data) {
    //             if (data) {
    //                 req.flash('successSingup', 'Success! Đăng ký tài khoản thành công!')
    //                 res.redirect('/admin/login');
    //             }
    //         });
    //     });
    // }
});

module.exports = router;