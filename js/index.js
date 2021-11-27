var alertDiv = document.getElementById("message");
function postData(url, data) {
  return $.ajax({
    url: url,
    contentType: "application/json",
    datatype: "JSON",
    data: data,
    type: "post",
  });
}
function getData(url) {
  return $.ajax({
    url: url,
    type: "get",
  });
}

async function test(url, method, data, cb) {
  try {
    let dato = await JSON.stringify(data);
    let res;
    //console.log(url);
    if (method == "post") {
      res = await postData(url, dato);
    } else if (method == "get") {
      res = await getData(url);
    }

    //console.log(res);
    cb(res);
  } catch (err) {}
}
function message(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  alertDiv.innerHTML = "";
  alertDiv.append(wrapper);
}
