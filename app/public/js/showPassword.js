function showPassword() {
  var x = document.getElementById("passwordInput");
  var y = document.getElementById("showPasswordImg");
  if (x.type === "password") {
    x.type = "text";
    y.src = "/images/icons/hide-password.png";
  } else {
    x.type = "password";
    y.src = "/images/icons/show-password.png";
  }
}