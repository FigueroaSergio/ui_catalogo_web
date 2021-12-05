user = JSON.parse(user);
const tbOrders = document.getElementById("tb-orders");
let orders = {};
if (user.type != "COORD") {
  window.location.replace("/profile.html");
}
fillData(user);
getOrders();
function formDate(date) {
  let ndate = new Date(date);
  let str =
    ndate.getDate() + "/" + (ndate.getMonth() + 1) + "/" + ndate.getFullYear();
  return str;
}
function getOrders() {
  url = "http://localhost:8080/api/order/zona/" + user.zone;
  test(url, "get", {}, (data) => {
    order = data;
    renderData(order);
  });
}
// identificación, nombres, email, fecha de pedido número de pedido y estado.
function renderData(data) {
  let rows = "";
  let count = 1;
  data.forEach((ele) => {
    let auxtb = tbAux(ele);
    let row = `<tr>
                <td>${ele.salesMan.id}</td>
                <td>${ele.salesMan.name}</td>
                <td>${ele.salesMan.email}</td>
                <td>${formDate(ele.registerDay)}</td>
                <td>${ele.id}</td>
                <td>${ele.status}</td>
                <td>  
                  <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#dt-${count}" aria-expanded="false" aria-controls="collapseExample">
                    Detalles
                  </button>
                </td>   
                <tr>
                   <td colspan="7" class="collapse" id="dt-${count}">
                      <div>
                      <h5>Detalles</h5>
                        ${auxtb}
                        <div class="row g-3">
                          <label for="status" class="col-sm-2 col-form-label">Estado</label>
                          <div class="col-auto">
                            <select class="form-select" id="select-${count}" aria-label="Default select example">
                              <option value="Pendiente" 
                              ${
                                ele.status == "Pendiente" ? "selected" : null
                              }>Pendiente</option>
                              <option value="Aprobada"
                              ${
                                ele.status == "Aprobada" ? "selected" : null
                              }>Aprobada</option>
                              <option value="Rechazada"
                              ${
                                ele.status == "Rechazada" ? "selected" : null
                              }>Rechazada</option>
                            </select>

                          </div>
                          <div class="col-auto">
                            <button 
                            onclick="changeStatus(${count},${ele.id})" 
                            class="btn btn-outline-dark mb-3">
                              validar
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                </tr>
                
              </tr>`;
    rows += row;
    count++;
    // console.log(row);
  });

  tbOrders.innerHTML = rows;
}
function changeStatus(btn, id) {
  url = "http://localhost:8080/api/order/update";
  let status = document.getElementById(`select-${btn}`).value;
  let data = { id: id, status: status };
  test(url, "put", data, (res) => {
    location.reload();
  });
}
function tbAux(order) {
  let tb = `
  <div class="table-responsive">
  <table class="table table-sm table-hover">
            <thead class="table-dark">
              <tr>
                <th>Id</th>
                <th>Categoria</th>
                <th>talla</th>
                <th>Descripcion</th>
                <th>Disp</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Photo</th>
                <th>Solicitado</th>
              </tr>
            </thead>
            <tbody id="tb-orders">
      
 `;
  for (let key in order.products) {
    let pr = order.products[key];
    let row = `<tr>
              <td>${pr.reference}</td>
              <td>${pr.category}</td>
              <td>${pr.size}</td>
              <td>${pr.description}</td>
              <td>${pr.availability}</td>
              <td>${pr.price}</td>
              <td>${pr.quantity}</td>
              <td><a href=${pr.photography}>link</a></td>
              <td>${order.quantities[key]}</td>
              </tr>
    `;
    tb += row;
  }
  tb += `
  </tbody>
  </table>
  </div>`;
  return tb;
}
