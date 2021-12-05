function fillData(user) {
  user;
  let namef = document.getElementById("user-name");
  let idf = document.getElementById("user-id");
  let mailf = document.getElementById("user-mail");
  let profilef = document.getElementById("user-profile");
  namef.textContent = user.name;
  idf.textContent = user.identification;
  mailf.textContent = user.email;
  profilef.textContent = user.type;
}
