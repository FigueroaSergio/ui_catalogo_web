var form = document.getElementById("form-login");
var urlBase = URL + "/api/user/";
let pass = document.getElementById("password");
let email = document.getElementById("email");
let fpass = document.getElementById("feed-pass");
let femail = document.getElementById("feed-email");
form.addEventListener(
  "submit",
  function (event) {
    alertDiv.innerHTML = "";
    event.preventDefault();
    fpass.textContent = "Ingrese una contraseña";
    femail.textContent = "Ingrese un email valido";
    pass.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      let url = urlBase + "emailexist/" + $("#email").val();
      test(url, "get", {}, verifyMail);
    }

    form.classList.add("was-validated");
  },
  false
);
verifyMail = function (res) {
  let url = urlBase + $("#email").val() + "/" + $("#password").val();
  if (res) {
    test(url, "get", {}, login);
  } else {
    form.classList.remove("was-validated");
    email.classList.add("is-invalid");
    femail.textContent = "No existe usuario con el correo indicado";
  }
};
login = function (res) {
  if (res.id == null) {
    form.classList.remove("was-validated");
    fpass.textContent = "contraseña incorrecta";
    email.classList.add("is-valid");
    pass.classList.add("is-invalid");
  } else {
    message(`Bienvenido ${res.name}`, "info");
    let user = JSON.stringify(res);
    sessionStorage.setItem("user", user);
    console.log(user);

    setTimeout(window.location.replace("/profile.html"), 1000 * 2);
  }
};
