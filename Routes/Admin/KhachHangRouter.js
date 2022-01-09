var express = require('express');
const authenticate = require('./Authenicate');
var router = express.Router();
const User = require("../../API/User");

router.get('/khachhang', authenticate.isAuthenticated, async(req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    if (req.user.user.role == 'admin') {
        const customers = await User.getcustomer(config);
        res.render('Admin/KhachHang', {
            thanhvien: customers,
            user: req.user,
            messageDelete: req.flash('successDelete')
        });
    } else {
        res.redirect('/admin');
    }
});
module.exports = router;