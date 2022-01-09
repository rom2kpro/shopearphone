var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
close[i].onclick = function(){
  var div = this.parentElement;
  div.style.opacity = "0";
  setTimeout(function(){ div.style.display = "none"; }, 1000);
}
}

window.setTimeout(function() {
  $(".alert").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove(); 
  });
}, 4500);