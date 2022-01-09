var express = require('express')
var router = express.Router();
router.use('/', require('./NhanVienRouter'))
router.use('/', require('./KhachHangRouter'))
    // router.use('/', require('./dangkyRouter'))
router.use('/', require('./SanPhamRouter'))
router.use('/', require('./ThongTinTvRouter'))
router.use('/', require('./LoaispRouter'))

router.use((req, res) => {
    res.render('admin/404')
})
router.use((err, req, res, next) => {
    res.render('admin/500')
})
module.exports = router;