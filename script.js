function myFunction() {
  var x = document.getElementById("navlinks");
  console.log(x);
  if (x.className == "") {
    x.className += " responsive";
  } 
  else{
    x.className = ""
  }
}