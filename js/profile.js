const pedido = document.getElementById("add-pedido");
const select = document.getElementById("select-product");
const tbProducts = document.getElementById("tb-products");
const tbOrders = document.getElementById("tb-orders");
const quantity = document.getElementById("num-product");
const btnPedido = document.getElementById("send-pedido");
const form = document.getElementById("form-order");

let products = {};
let order = { products: {}, quantities: {}, salesMan: {}, registerDay: 0 };
let count = 1;
fillData(user);
getProducts();
function getProducts() {
  url = "http://localhost:8080/api/clothe/all";
  test(url, "get", {}, (data) => {
    renderData(data);
  });
}
renderData = function (data) {
  products = data;
  order.salesMan = JSON.parse(user);
  if (data.length == 0) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = "No hay productos";
    tr.appendChild(td);
    tbProducts.appendChild(tr);
  } else {
    data.forEach((element) => {
      let tr = document.createElement("tr");

      let cod = document.createElement("td");
      let cat = document.createElement("td");
      let des = document.createElement("td");
      let foto = document.createElement("td");
      let link = document.createElement("a");
      link.setAttribute("href", element.photography);
      link.textContent = "link";

      cod.textContent = element.reference;
      cat.textContent = element.category;
      des.textContent = element.description;
      foto.appendChild(link);

      tr.appendChild(cod);
      tr.appendChild(cat);
      tr.appendChild(des);
      tr.appendChild(foto);

      tbProducts.appendChild(tr);
      let opt = document.createElement("option");
      opt.textContent = element.reference;
      select.appendChild(opt);
    });
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let val = select.value;
  let quant = quantity.value;
  if (quant == null || quant == "") {
    alert("Ingrese un catidad");
  } else {
    let id = count;
    count++;
    let tr = document.createElement("tr");

    let cod = document.createElement("td");
    let cat = document.createElement("td");
    let action = document.createElement("td");
    let btn = document.createElement("button");

    btn.classList.add("btn");
    btn.classList.add("btn-dark");

    btn.addEventListener("click", () => deleteRow(id, val, quant));
    tr.setAttribute("id", id);

    btn.textContent = "x";
    cod.textContent = val;
    cat.textContent = quant;
    action.appendChild(btn);
    tr.appendChild(cod);
    tr.appendChild(cat);
    tr.appendChild(action);
    tbOrders.appendChild(tr);
    quantity.value = "";
    if (order.products[val] == null || order["products"][val] == undefined) {
      let index = products.findIndex(function (item, i) {
        return item.reference === val;
      });
      order.products[val] = products[index];
      order.quantities[val] = parseInt(quant);
      console.log(order);
    } else {
      order.quantities[val] += parseInt(quant);
    }
    btnPedido.classList.remove("visually-hidden");
  }
});
function deleteRow(id, ref, quat) {
  document.getElementById(id).remove();
  order.quantities[ref] -= quat;
}
btnPedido.addEventListener("click", () => {
  order.registerDay = new Date();
  url = "http://localhost:8080/api/order/new";
  test(url, "post", order, (res) => console.log(res));
});
