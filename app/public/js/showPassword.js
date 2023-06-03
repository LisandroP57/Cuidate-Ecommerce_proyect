function showPassword() {
  var x = document.getElementById("pass1");
  var y = document.getElementById("showPasswordImg");
  if (x.type === "password") {
    x.type = "text";
    y.src = "/images/icons/hide-password.png";
  } else {
    x.type = "password";
    y.src = "/images/icons/show-password.png";
  }
};

function showPassword2() {
  var x = document.getElementById("pass2");
  var y = document.getElementById("showPasswordImg2");
  if (x.type === "password") {
    x.type = "text";
    y.src = "/images/icons/hide-password.png";
  } else {
    x.type = "password";
    y.src = "/images/icons/show-password.png";
  }
}