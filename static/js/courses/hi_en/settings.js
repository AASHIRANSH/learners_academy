document.getElementById("demo").onmouseover = function() {mouseOver()};
document.getElementById("demo").onmouseout = function() {mouseOut()};

function mouseOver() {
  document.getElementById("demo").style.color = "red";
}

function mouseOut() {
  document.getElementById("demo").style.color = "black";
}