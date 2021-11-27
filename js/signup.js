var form = document.getElementById("form-signup");
url = "http://localhost:8080/api/user/new";
var email = document.getElementById("email");
var femail = document.getElementById("feed-email");
form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    form.oninput = repassword.setCustomValidity(
      repassword.value != password.value ? "nada" : ""
    );
    alertDiv.innerHTML = "";
    email.classList.remove("is-invalid");
    femail.textContent = "Ingrese un email valido";
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      let data = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      };
      test(url, "post", data, verifyResponse);
    }

    form.classList.add("was-validated");
  },
  false
);
verifyResponse = function (res) {
  if (res.id == null) {
    form.classList.remove("was-validated");
    femail.textContent = "Ya existe un usario con el correo";
    email.classList.add("is-invalid");
  } else {
    message("Usuario creado con exito", "info");
  }
};
