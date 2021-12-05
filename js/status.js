let user = sessionStorage.getItem("user");
let us = JSON.parse(user);
if (
  user == null &&
  (us.type == "ADM" || us.type == "COORD" || us.type == "ASE")
) {
  window.location.replace("/login.html");
}
