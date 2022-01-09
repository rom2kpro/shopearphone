var express = require('express');
var Router = express.Router();
const authenticate = require('./Authenicate');
const InformationUser = require("../../API/InfomationUser");
//thông tin cá nhân
Router.get('/thongtincanhan', authenticate.isAuthenticated,async(req, res) => {
    res.render('Admin/ThongTinCaNhan', {
        user: req.user,
        thongtin: req.user.user.informationuser,
        messageUpdate: req.flash('successUpdate')
    });
});

//Thêm thông tin cho người dùng mới đăng ký
Router.post('/thongtincanhan', authenticate.isAuthenticated, async (req, res) => {
    let newThongTinTv = {
        iduser: req.user.user.id,
        phone: req.body.sdt,
        gender: req.body.gioitinh,
        birthday: req.body.namsinh,
        address: req.body.diachi
    };
    const result = await InformationUser.add(newThongTinTv);
    if (result.error) {
        res.json({ kq: false, errMsg: result.error });
    } else {
        req.user.user.informationuser = newThongTinTv;
        req.flash('successUpdate', 'Success! Cập nhật thông tin thành công');
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
      
});

//Cập nhật thông tin người dùng
Router.post('/thongtincanhan/:id', authenticate.isAuthenticated, async(req, res) => {
    let newThongTinTv = {
        iduser: req.user.user.id,
        phone: req.body.sdt,
        gender: req.body.gioitinh,
        birthday: req.body.namsinh,
        address: req.body.diachi
    };
    const result = await InformationUser.update(newThongTinTv);
    if (result.error) {
        res.json({ kq: false, errMsg: result.error });
    } else {
        req.user.user.informationuser = newThongTinTv;
        req.flash('successUpdate', 'Success! Cập nhật thông tin thành công');
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
});

module.exports = Router;