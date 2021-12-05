let user = sessionStorage.getItem("user");
if (user == null) {
  window.location.replace("/login.html");
}
