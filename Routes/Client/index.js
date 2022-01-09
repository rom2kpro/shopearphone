var express = require('express');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
const category = require('../../API/Category')
const product = require('../../API/Products');
const User = require('../../API/User');
const InfomationUser = require('../../API/InfomationUser');
const Cart = require('../../API/Cart');
const Invoice = require('../../API/Invoice');
const Comment = require('../../API/Comment');

var router = express.Router();
/* GET home page. */
router.get('/', async(req, res) => {
    const categories = await category.getCategory();
    res.render('Client/home', {
        categories,
        user: req.user
    });
});

router.get('/signup', async(req, res) => {
    const categories = await category.getCategory();
    res.render('Client/signup', {
        categories,
        user: req.user,
        message: req.flash('message')
    });
});

router.post('/signup', async(req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const response = User.register({
            hoten: req.body.hoten,
            email: req.body.email,
            password: hash
        })
        if(response.error){
            req.flash('message', 'Email đã được sử dụng')
            res.redirect('/signup');
        }else{
            req.flash('message', 'Đăng ký tài khoản thành công!')
            res.redirect('/login');
        }
    })
})


router.get('/products', async(req, res) => {
    try {
        var sanpham = []
        if (req.query.id) {
            sanpham = await product.getProductByCatChildID(req.query.id);
        } else {
            sanpham = await product.getProduct();
        }
        const categories = await category.getCategory();

        res.render('Client/products', {
            categories,
            user: req.user,
            sanPham: sanpham,
            loaiSp: [],
            dongSp: []
        });
    } catch (e) {
        console.log(e);
        res.send('Đường dẫn không hợp lệ')
    }
});

router.get('/profile', isLoggedIn, async(req, res) => {
    try{
        const categories = await category.getCategory();
        res.render('Client/profile', {
            categories,
            user: req.user,
            thanhvien: req.user.user.informationuser || {},
            message: req.flash('message')
        });
    }catch(e){
        console.log(e);
    }
});

//Thêm thông tin cho người dùng mới đăng ký
router.post('/thongtinkhachhang', async (req, res) => {
    let newThongTinTv = {
        iduser: req.user.user.id,
        phone: req.body.sdt,
        gender: req.body.gioitinh,
        birthday: req.body.namsinh,
        address: req.body.diachi
    }
    var response;
    if(req.user.user.informationuser){
        response = await InfomationUser.update(newThongTinTv);
    }else{  
        response = await InfomationUser.add(newThongTinTv);
    }
    if(response.error){
        res.json({ kq: false, errMsg: response.error });
    }else{
        req.flash('message', 'Success! Cập nhật thông tin thành công');
        backURL = req.header('Referer') || '/';
        req.user.user.informationuser = newThongTinTv;
        res.redirect(backURL);
    }
});



router.get('/detailProd', async(req, res) => {
    try {
        const categories = await category.getCategory();
        const sanpham = await product.getProductDetail(req.query.id);
        const comments = await Comment.getCommentByIdProduct(req.query.id);

        res.render('Client/detailProd', {
            categories,
            user: req.user,
            sanPham: sanpham,
            sanPhamLienQuan: [],
            comments,
            message: req.flash('success'),
            search: ""
        });
    } catch (e) {
        res.send('Đường dẫn không hơp lệ')
    }

});

router.get('/addcart/:id', isLoggedIn, async(req, res) => {
    let newGioHang = {
        productid: req.params.id,
        userid: req.user.user.id,
        soluong: 1
    };

    const response = await Cart.add(newGioHang);

    if(response.error){
        res.json({ kq: false, errMsg: response.error });
    }else {
        res.redirect('/cart');
    }
})

router.get('/cart', isLoggedIn, async(req, res) => {
    try {
        const categories = await category.getCategory();
        const carts = await Cart.get(req.user.user.id);
        res.render('Client/cart', {
            categories,
            user: req.user,
            gioHang: carts,
            message: req.flash('success'),
            messageError: req.flash('error')
        });
    } catch (e) {
        res.send('Đường dẫn không hơp lệ')
    }

});

router.post('/cartnumber', async(req, res) => {
    let id = req.body.id;
    let productid = req.body.productid;
    let soluong = req.body.soluong
    let tongtien = parseInt(req.body.tongtien)
    let op = req.body.op
    let check = req.body.check
    console.log(req.body)
    const data = await product.getProductDetail(productid);
    if (check >= 2 && check <= 100) {
        if (op === '-') {
            tongtien = tongtien - data.price
        } else {
            tongtien = tongtien + data.price
        }
        const response = await Cart.update(id, {
            userid: req.user.user.id,
            productid,
            soluong
        })
        if(response.error){
            res.send({error: response.error})
        }
    }
    giaTien = soluong * data.price
    res.send({ data, giaTien, tongtien })
})

router.get('/deletecart/:id', async(req, res) => {
    const response = await Cart.delete(req.params.id);
    if(response.error){
        res.json({ kq: false, errMsg: response.error });
    } else {
        req.flash('success', 'Xóa sản phẩm thành công!')
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
})

router.post('/cart', async(req, res) => {
    const user = req.user.user.informationuser;
    let date = new Date().toLocaleString();
    console.log(req.body)
    if (req.body.thanhtien != 0) {
        if (!user) {
            req.flash('error', 'Vui lòng cập nhật thông tin cá nhân trước khi đặt hàng!')
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        } else {
            var invoicedetails = [];
            for(var i = 0; i < req.body.productid.length; i++){
                invoicedetails.push({
                    productid: req.body.productid[i],
                    soluong: req.body.soluong[i]
                })
            }
            var invoice = {
                userid: req.user.user.id,
                date,
                totalmoney: req.body.thanhtien,
                invoicedetails
            }

            const response = await Invoice.add(invoice);

            if(response.error){
                res.json({ kq: false, errMsg: response.error });
            } else {
                res.redirect('/cart');
            }
        }
    } else {
        req.flash('error', 'Giỏ hàng trống!')
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
})

router.get('/odermange', isLoggedIn, async(req, res) => {
    try {
        const categories = await category.getCategory();
        const invoices = await Invoice.get(req.user.user.id);
        res.render('Client/allorder', {
            categories,
            user: req.user,
            donHang: invoices,
            message: req.flash('success')
        });
    } catch (e) {
        res.send('Đường dẫn không hơp lệ')
    }

});

router.get('/oder/:id', isLoggedIn, async(req, res) => {
    try {
        const categories = await category.getCategory();
        const invoice = await Invoice.getByInvoiceId(req.params.id);
        console.log(invoice)
        res.render('Client/oder', {
            categories,
            user: req.user,
            chiTietDonHang: invoice

        });
    } catch (e) {
        res.send('Đường dẫn không hơp lệ')
    }

});

router.get('/deleteoder/:id', async(req, res) => {
    const invoice = await Invoice.getByInvoiceId(req.params.id);
    if(invoice.error){
        res.json({ kq: false, errMsg: err });
    } else {
        req.flash('success', 'Xóa đơn hàng thành công!')
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
})

//Bình luận sản phẩm
router.post('/post-comment', isLoggedIn, async(req, res) => {

    let newNhanXet = {
        comment1: req.body.noidung,
        iduser: req.user.user.id,
        idproduct: req.body.idsanpham,
        time: new Date().toLocaleString()
    };
    const response = await Comment.add(newNhanXet);
    if(response.error){
        res.json({ kq: false, errMsg: response.error });
    }else{
        res.send({
            response,
            user: req.user
        })
    }
})

router.get('/deletecomment/:id', async (req, res) => {
    const response = await Comment.delete(req.params.id)
    if (response.error) {
        res.json({ kq: false, errMsg: response.error });
    } else {
        req.flash('success', 'Xóa nhận xét thành công!')
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    }
})




router.get('/search', async(req, res) => {
    try {
        const categories = await category.getCategory();
        const search = req.query.search || '';
        const products = await product.searchName(search);
        res.render('Client/products', {
            categories,
            user: req.user,
            sanPham: products,
            search: search
        })
    } catch (e) {
        res.send('Đường dẫn không hợp lệ')
    }
})

router.get('/autocomplete', async(req, res) => {
    // try {
    //     const search = req.query.data
    //     const sanPhamResult = await sanPham.find({}).select('tensanpham');
    //     const result = sanPhamResult.filter(function(item, index) {
    //         return item.tensanpham.toLowerCase().indexOf(search.toLowerCase()) !== -1
    //     });
    //     res.send(result.slice(0, 7))
    // } catch (e) {
    //     res.send('Đường dẫn không hợp lệ')
    // }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}




module.exports = router;