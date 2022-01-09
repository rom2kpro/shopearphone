var express = require('express');
var router = express.Router();
const authenticate = require('./Authenicate');
const Category = require("../../API/Category");
//loại sản phẩm

router.get('/dongsanpham', authenticate.isAuthenticated ,async(req, res) => {
    try {
        const categories = await Category.getCategory();
        return res.render('Admin/DongSanPham', {
            categories,
            user: req.user,
            update: [],
            message: req.flash('success'),
            messageFail: req.flash('fail')
        });

    } catch (err) {
        console.log(err)
    }
});
//Thêm dòng sản phẩm
router.post('/dongsanpham', authenticate.isAuthenticated, async(req, res) => {
    let newLoaiSanPham = {
        name: req.body.tendongsp
    };
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.addCategory(newLoaiSanPham, config);
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Thêm loại sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
})

//Cập nhật dòng sản phẩm
router.post('/dongsanpham/category/:id', authenticate.isAuthenticated,async(req, res) => {
    let id = req.params.id;
    let updateLoaiSanPham = {
        name: req.body.tendongsp
    };
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.updateCategory(id, updateLoaiSanPham, config);
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Cập nhật dòng sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
});

//Xóa dòng sản phẩm
router.get("/dongsanpham/delete/category/:id", authenticate.isAuthenticated, async function(req, res) {
    let id = req.params.id;
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.deleteCategory(id, config);
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Xóa dòng sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
});

//Thêm loại sản phẩm
router.post('/dongsanpham/catechild', authenticate.isAuthenticated, async(req, res) => {
    let newLoaiSanPham = {
        name: req.body.tenloaisp
    };
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.addCateChild(req.body.idcat, newLoaiSanPham, config);
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Thêm loại sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
})

//xóa loại sản phẩm
router.get("/dongsanpham/delete/:id", authenticate.isAuthenticated, async function(req, res) {
    let id = req.params.id;
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.deleteCateChild(id, config);
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Xóa loại sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
});

//Cập nhật loại sản phẩm
router.post('/dongsanpham/:id', authenticate.isAuthenticated,async(req, res) => {
    console.log(req.body)
    let id = req.params.id;
    let updateLoaiSanPham = {
        name: req.body.tenloaisp,
        idcat: req.body.idcat
    };
    const config = {
        headers: { Authorization: `Bearer ${req.user.token.token}` }
    };
    const result = await Category.updateCateChild(id, updateLoaiSanPham, config);
    console.log(result)
    if(result.error){
        req.flash('fail', result.error)
        res.redirect('/admin/dongsanpham');
    }else{
        req.flash('success', 'Success! Cập nhật loại sản phẩm thành công')
        res.redirect('/admin/dongsanpham');
    }
});

module.exports = router;