var image;
var loadFile = function(event) {
    var output = document.getElementById('output');
    image = event.target.files[0];
    console.log(image);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.width = 400;
    output.height = 400;
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
};

var getCateChild = function(event){
    $.ajax({
        url: "/admin/getcatechild/"+ event.target.value,
        method: "GET",
        success: function(data) {
            console.log(data)
            $('#loaisp').html('')
            $('#loaisp')
                .append(`<option value="" disabled selected>Vui lòng chọn</option>`)
            data.catechild[0].catechildren.forEach(element => {
                $('#loaisp')
                    .append(`<option value="${element.id}">${element.name}</option>`)
            });
            $('#loaisp').removeAttr('disabled')
        }
    })
}

function validate(event) {    
    var tensanpham = document.themsanpham.tensanpham.value;
    var giatien = document.themsanpham.giatien.value;
    var mota = document.themsanpham.mota.value;
    var hinhanh = document.themsanpham.hinhanh.value;
    var dongsp = document.themsanpham.dongsp.value;
    var loaisp = document.themsanpham.loaisp.value;
    var brand = document.themsanpham.brand.value;
    var status = false;
    console.log(tensanpham, giatien, mota, hinhanh, loaisp)

    if (tensanpham.length < 1) {
        document.getElementById("errorTensanpham").innerHTML = "Vui lòng nhập tên sản phẩm";
        status = false;
    } else {
        document.getElementById("errorTensanpham").innerHTML = "";
        status = true;
    }

    if (giatien.length < 1) {
        document.getElementById("errorGiatien").innerHTML = "Vui lòng nhập giá tiền";
        status = false;
    } else if (giatien < 0) {
        document.getElementById("errorGiatien").innerHTML = "Giá tiền không được là số âm";
        status = false;
    } else {
        document.getElementById("errorGiatien").innerHTML = "";
    }

    if (dongsp.length < 1) {
        document.getElementById("errorDongsp").innerHTML = "Vui lòng chọn dòng sản phẩm";
        status = false;
    } else {
        document.getElementById("errorDongsp").innerHTML = "";
    }

    if (loaisp.length < 1) {
        document.getElementById("errorLoaisp").innerHTML = "Vui lòng chọn loại sản phẩm";
        status = false;
    } else {
        document.getElementById("errorLoaisp").innerHTML = "";
    }

    if (brand.length < 1) {
        document.getElementById("errorBrand").innerHTML = "Vui lòng chọn nhà sản xuất sản phẩm";
        status = false;
    } else {
        document.getElementById("errorBrand").innerHTML = "";
    }

    if (mota.length < 1) {
        document.getElementById("errorMota").innerHTML = "Vui lòng nhập mô tả";
        status = false;
    } else {
        document.getElementById("errorMota").innerHTML = "";
    }

    if (hinhanh.length < 1) {
        document.getElementById("errorHinhanh").innerHTML = "Vui lòng chọn ảnh";
        status = false;
    } else {
        document.getElementById("errorHinhanh").innerHTML = "";
        status = true;
    }
    return status;
}

function validateUpdate() {
    var tensanpham = document.themsanpham.tensanpham.value;
    var giatien = document.themsanpham.giatien.value;
    var mota = document.themsanpham.mota.value;
    var dongsp = document.themsanpham.dongsp.value;
    var loaisp = document.themsanpham.loaisp.value;
    var brand = document.themsanpham.brand.value;
    var status = false;

    if (tensanpham.length < 1) {
        document.getElementById("errorTensanpham").innerHTML = "Vui lòng nhập tên sản phẩm";
        status = false;
    } else {
        document.getElementById("errorTensanpham").innerHTML = "";
        status = true;
    }

    if (giatien.length < 1) {
        document.getElementById("errorGiatien").innerHTML = "Vui lòng nhập giá tiền";
        status = false;
    } else if (giatien < 0) {
        document.getElementById("errorGiatien").innerHTML = "Giá tiền không được là số âm";
        status = false;
    } else {
        document.getElementById("errorGiatien").innerHTML = "";
    }

    if (dongsp.length < 1) {
        document.getElementById("errorDongsp").innerHTML = "Vui lòng chọn dòng sản phẩm";
        status = false;
    } else {
        document.getElementById("errorDongsp").innerHTML = "";
    }

    if (loaisp.length < 1) {
        document.getElementById("errorLoaisp").innerHTML = "Vui lòng chọn loại sản phẩm";
        status = false;
    } else {
        document.getElementById("errorLoaisp").innerHTML = "";
    }

    if (brand.length < 1) {
        document.getElementById("errorBrand").innerHTML = "Vui lòng chọn nhà sản xuất sản phẩm";
        status = false;
    } else {
        document.getElementById("errorBrand").innerHTML = "";
    }

    if (mota.length < 1) {
        document.getElementById("errorMota").innerHTML = "Vui lòng nhập mô tả";
        status = false;
    } else {
        document.getElementById("errorMota").innerHTML = "";
    }

    return status;
}