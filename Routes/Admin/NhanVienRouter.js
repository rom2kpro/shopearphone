var express = require('express');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var router = express.Router();
const authenticate = require('./Authenicate');
const User = require("../../API/User");

//Hiển thị danh sách nhân viên
router.get('/', authenticate.isAuthenticated, async(req, res) => {
    if (req.user.user.role == 'admin') {
        const config = {
            headers: { Authorization: `Bearer ${req.user.token.token}` }
        };
        const staffs = await User.getstaff(config);
        res.render('Admin/Index', {
            thanhvien: staffs,
            user: req.user,
            messageDelete: req.flash('successDelete')
        });
    }else {
        res.redirect('/admin/dssanpham')
    }
});
//Xóa thành viên
router.get('/thanhvien/delete', authenticate.isAuthenticated, async(req, res) => {
    if (req.user.user.role == 'admin') {
        const config = {
            headers: { Authorization: `Bearer ${req.user.token.token}` }
        };
        const result = await User.deletestaff(req.query.tv, config);
        if(result.error){
            req.flash('successDelete', result.error)
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        }else{
            req.flash('successDelete', 'Success! Xóa người dùng thành công!')
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        }

    } else {
        res.redirect('/admin');
    }
})

//Thêm nhân viên mới
router.get('/themnhanvien', authenticate.isAuthenticated, (req, res) => {
    if (req.user.user.role == 'admin') {
        res.render('Admin/ThemNhanVien', {
            user: req.user,
            messageAdd: req.flash('successAdd'),
            messageFailAdd: req.flash('failAdd'),
        })
    } else {
        res.redirect('/admin');
    }
});

router.post('/themnhanvien', authenticate.isAuthenticated, (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        var staff = {
            hoten: req.body.hoten,
            email: req.body.email,
            password: hash
        }
        const response = await User.addstaff(staff, config)
        if(response.error){
            req.flash('failAdd', response.error);
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        }else{
            req.flash('successAdd', 'Success! Thêm nhân viên thành công!')
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        }
    });
})
module.exports = router;