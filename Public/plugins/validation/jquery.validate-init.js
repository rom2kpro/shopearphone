jQuery(".form-valide").validate({
    ignore: [],
    errorClass: "invalid-feedback animated fadeInDown",
    errorElement: "div",
    errorPlacement: function(e, a) { jQuery(a).parents(".form-group > div").append(e) },
    highlight: function(e) { jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid") },
    success: function(e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"),
            jQuery(e).remove()
    },
    debug: false,
    rules: {
        "username": { required: !0, email: !0 },
        "hoten": { required: !0 },
        "role": { required: !0 },
        "password": { required: !0, minlength: 6 },
        "repassword": {
            required: !0,
            equalTo: '[name="password"]'
        },
        "sdt": { required: !0, number: !0 },
        "email": { required: !0, email: !0 },
        "tensanpham": { required: !0 },
        "tendongsp": { required: !0 },
        "tenloaisp": { required: !0 },
        "diachi": { required: !0 },
        "giatien": { required: !0, number: !0 },
        "namsx": { required: !0 },
        "namsinh": { required: !0 },
        "hinhanh": { required: !0 },
        "gioitinh": { required: !0 },
        // "mota":{required:!0},
        "thongsokythuat": { required: !0 }
    },
    messages: {
        "username": {
            required: "Vui lòng nhập email",
            email: "Email không đúng định dạng"
        },
        "hoten": "Vui lòng nhập họ tên!",
        "password": {
            required: "Vui lòng nhập mật khẩu!",
            minlength: "Mật khẩu chứa ít nhất 6 ký tự!"
        },
        "repassword": {
            required: "Vui lòng xác nhận lại mật khẩu!",
            equalTo: "Mật khẩu không khớp!"
        },
        "role": "Vui lòng chọn chức vụ!",
        "sdt": {
            required: "Vui lòng nhập số điện thoại",
            number: "Số điện thoại chỉ được nhập bằng số"
        },
        "email": {
            required: "Vui lòng nhập email",
            email: "Email không đúng định dạng"
        },
        "diachi": "Vui lòng nhập địa chỉ",
        "tendongsp": "Vui lòng chọn dòng sản phẩm",
        "tenloaisp": "Vui lòng chọn loại sản phẩm",
        "gioitinh": "Vui lòng chọn giới tính",
        "tensanpham": "Vui lòng nhập tên sản phẩm!",
        "giatien": "Vui lòng nhập giá sản phẩm (bằng số)!",
        "namsx": "Vui lòng chọn ngày sản xuất!",
        "namsinh": "Vui lòng chọn ngày sinh!",
        // "mota":"Vui lòng nhập mô tả!",
        "hinhanh": "Vui lòng chọn ảnh!",
        "thongsokythuat": "Vui lòng nhập thông số kỹ thuật!"
    }
});

// jQuery(".form-valide").validate({
//     ignore:[],
//     errorClass:"invalid-feedback animated fadeInDown",
//     errorElement:"div",
//     errorPlacement:function(e,a){jQuery(a).parents(".form-group > div").append(e)},
//     highlight:function(e){jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")},
//     success:function(e){jQuery(e).closest(".form-group").removeClass("is-invalid"),
//     jQuery(e).remove()},
//     rules:{
//         "val-username":{required:!0,minlength:3},
//         "val-email":{required:!0,email:!0},
//         "val-password":{required:!0,minlength:5},
//         "val-confirm-password":{required:!0,equalTo:"#val-password"},
//         "val-select2":{required:!0},
//         "val-select2-multiple":{required:!0,minlength:2},
//         "val-suggestions":{required:!0,minlength:5},
//         "val-skill":{required:!0},
//         "val-currency":{required:!0,currency:["$",!0]},
//         "val-website":{required:!0,url:!0},
//         "val-phoneus":{required:!0,phoneUS:!0},
//         "val-digits":{required:!0,digits:!0},
//         "val-number":{required:!0,number:!0},
//         "val-range":{required:!0,range:[1,5]},
//         "val-terms":{required:!0}
//     },messages:{
//         "val-username":{
//             required:"Vui lòng nhập username",
//             minlength:"Username phải chứa ít nhất 3 ký tự"
//         },
//         "val-email":"Vui lòng nhập địa chỉ email hơp lệ",
//         "val-password":{
//             required:"Vui lòng nhập mật khẩu",
//             minlength:"Mật khẩu phải chứa ít nhât 5 ký tự"
//         },
//         "val-confirm-password":{
//             required:"Vui lòng nhập mật khẩu",
//             minlength:"Mật khẩu phải chứa ít nhất 5 ký tự",
//             equalTo:"Mật khẩu không khớp"
//         },
//         "val-select2":"Vui lòng chọn một giá trị!",
//         "val-select2-multiple":"Vui lòng chọn ít nhất 2 giá trị!",
//         "val-suggestions":"What can we do to become better?",
//         "val-skill":"Vui lòng chọn một kỹ năng!",
//         "val-currency":"Vui lòng nhập giá!",
//         "val-website":"Vui lòng nhập trang web của bạn!",
//         "val-phoneus":"Vui lòng nhập số điện thoại!",
//         "val-digits":"Vui lòng chỉ được nhập số!",
//         "val-number":"Vui lòng nhập số!",
//         "val-range":"Vui lòng nhập số từ 1 đến 5!",
//         "val-terms":"Bạn phải đồng ý với các điều khoản dịch vụ!"
//     }
// });