
function showHideHamBurger() {
  var x = document.getElementById("myTopnav");
  if (x.className === "header-items") {
    x.className += " responsive";
  } else {
    x.className = "header-items";
  }
  //console.log(x.className)
}
