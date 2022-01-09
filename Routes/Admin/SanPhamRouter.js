var express = require('express');
var Router = express.Router();
const authenticate = require('./Authenicate');
const User = require("../../API/User");
const Category = require("../../API/Category");
const Brand = require("../../API/Brand");
const Product = require("../../API/Products");
const util = require('util')

var multer = require('multer');
var fs = require('fs')
const unlinkAsync = util.promisify(fs.unlink)

var FormData = require('form-data');
//Trang thêm sản phẩm
Router.get('/themsanpham',authenticate.isAuthenticated, async(req, res) => {
    const categories = await Category.getCategory();
    const brand = await Brand.get();
    res.render('Admin/ThemSanPham', {
        loaisanpham: categories,
        brand,
        messageAdd: req.flash('successAdd'),
        user: req.user
    });
});

Router.get('/getcatechild/:id',authenticate.isAuthenticated, async(req, res) => {
    let id = req.params.id
    const catechild = await Category.getCatChild(id);
    res.send({catechild});
});

//Hiển thị danh sách sản phẩm
Router.get('/dssanpham', authenticate.isAuthenticated, async(req, res) => {
    const products = await Product.getProduct();
    res.render('Admin/DanhSachSanPham', {
        sanpham: products,
        messageUpdate: req.flash('successUpdate'),
        messageDelete: req.flash('successDelete'),
        user: req.user
    });
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

var upload = util.promisify(multer({
    storage: storage
}).single("hinhanh"));


Router.post("/themsanpham", async(req, res) => {
    await upload(req, res);
    
    var form = new FormData();
    var data = {
        "Name": req.body.tensanpham,
        "Mota": req.body.mota,
        "Thongsokythuat": req.body.thongsokythuat,
        "Price": req.body.giatien,
        "Image": req.file.filename
    }
    var category = {
        "IdCat": req.body.dongsp,
        "IdCatchild": req.body.loaisp,
        "IdBrand": req.body.brand
    }
    form.append('file', fs.createReadStream(req.file.path));
    form.append('data', JSON.stringify(data));
    form.append('category', JSON.stringify(category));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + form._boundary 
        }
    }
    try{
        const result = await Product.add(form, config);
        await unlinkAsync(req.file.path)
        if(result.error){
            res.json({ kq: false, errMsg: result.error });
        } else {
            req.flash('successAdd', 'Success! Thêm sản phẩm thành công!')
            res.redirect('/admin/themsanpham');
        }
    }catch(e){
        console.log(e)
    }
});

//Chỉnh sửa sản phẩm
Router.get('/dssanpham/update/:id', authenticate.isAuthenticated, async (req, res) => {
    let id = req.params.id;
    console.log(id);
    const product = await Product.getProductDetail(id);
    const categories = await Category.getCategory();
    const catechild = await Category.getCatChild(product.productCategory.idCat);
    const brand = await Brand.get();
           
    res.render('Admin/CapNhatSanPham', {
        loaisanpham: categories,
        catechild,
        brand: brand,
        messageAdd: req.flash('successAdd'),
        sanpham:product,
        user: req.user
    });
           
     
});

Router.post('/dssanpham/update/:id', authenticate.isAuthenticated, async(req, res) => {
    let id = req.params.id;
    await upload(req, res);
    var form = new FormData();
    var data = {
        "Name": req.body.tensanpham,
        "Mota": req.body.mota,
        "Thongsokythuat": req.body.thongsokythuat,
        "Price": req.body.giatien,
    }
    var category = {
        "IdCat": req.body.dongsp,
        "IdCatchild": req.body.loaisp,
        "IdBrand": req.body.brand
    }
    if(req.file){
        data.Image = req.file.filename
        form.append('file', fs.createReadStream(req.file.path));
    }
    form.append('data', JSON.stringify(data));
    form.append('category', JSON.stringify(category));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + form._boundary 
        }
    }
    try{
        const result = await Product.update(id, form, config);
        if(req.file){
            await unlinkAsync(req.file.path)
        }
        if(result.error){
            res.json({ kq: false, errMsg: result.error });
        } else {
            req.flash('successAdd', 'Success! Cập nhật sản phẩm thành công!')
            res.redirect('/admin/dssanpham');
        }
    }catch(e){
        console.log(e)
    }
})

//Xóa sản phẩm
Router.get('/dssanpham/delete/:id', (req, res) => {
    // if (req.isAuthenticated() && (req.user.role == 'admin' || req.user.role == 'CatalogManager')) {
    //     sanPham.findByIdAndDelete(req.params.id, function(err, data) {
    //         if (err) {
    //             res.json({ kq: false, errMsg: err });
    //         } else {
    //             req.flash('successDelete', 'Success! Xóa sản phẩm thành công!')
    //             backURL = req.header('Referer') || '/';
    //             res.redirect(backURL);
    //         }
    //     })
    // } else {
    //     res.redirect('/admin');
    // }
});
module.exports = Router;