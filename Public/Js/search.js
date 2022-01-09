$(document).ready(function(){
    $('#search').keyup(function(){  
        var data = '' 
        data = $(this).val();
        search(data);
    });
    function search(data) {
        var dataAuto = []
        $.ajax({
            type: 'GET',
            url: '/autocomplete',
            data: {data},
            cache: false,
            success: function(result) {
                result.forEach(function(data){
                    dataAuto.push(data)
                })
                $(function() {
                    $("#search").autocomplete({
                        source: function (req, res) {
                                    res($.map(dataAuto, function (value, key) {
                                        return {
                                            label: value.tensanpham,
                                            value: value._id
                                        }
                                    }));
                                },
                        select: function( event, ui ) { 
                            window.location.href = 'detailProd?id=' + ui.item.value;
                            return false;
                        }
                    });
                });
            }
        });
    }
});