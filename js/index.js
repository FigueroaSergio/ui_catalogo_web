var alertDiv = document.getElementById("message");
function postData(url, data, method) {
  return $.ajax({
    url: url,
    contentType: "application/json",
    datatype: "JSON",
    data: data,
    type: method,
  });
}
function getData(url) {
  return $.ajax({
    url: url,
    type: "get",
  });
}
function deleteData(url) {
  return $.ajax({
    url: url,
    type: "delete",
  });
}

async function test(url, method, data, cb) {
  try {
    let dato = await JSON.stringify(data);
    let res;
    // console.log(url);
    if (method == "post" || method == "put") {
      res = await postData(url, dato, method);
    } else if (method == "get") {
      res = await getData(url);
    } else if (method == "delete") {
      res = await deleteData(url);
    }

    //console.log(res);
    cb(res);
  } catch (err) {
    console.log(err);
  }
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
