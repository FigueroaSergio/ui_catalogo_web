var strt = {
  user: {
    identification: {
      type: "text",
      maxlength: "80",
      edition: true,
      view: true,
    },
    name: {
      type: "text",
      maxlength: "80",
      edition: true,
      view: true,
      required: true,
    },
    email: {
      type: "text",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    password: {
      type: "password",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    zone: { type: "text", maxlength: "50", edition: true, view: true },
    address: { type: "text", maxlength: "50", edition: true, view: true },
    type: {
      type: "select",
      for: ["COORD", "ASE", "AMD"],
      edition: true,
      view: true,
    },
  },
  clothe: {
    category: {
      type: "text",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    size: {
      type: "text",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    description: {
      type: "text",
      maxlength: "250",
      edition: true,
      view: true,
      required: true,
    },

    price: {
      type: "number",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    quantity: {
      type: "number",
      maxlength: "50",
      edition: true,
      view: true,
      required: true,
    },
    photography: { type: "text", edition: true, view: true, required: true },
    availability: {
      type: "select",
      for: ["Si", "No"],
      edition: true,
      view: true,
      required: true,
    },
  },
};
var tables = {
  user: ["identification", "name", "email", "type"],
  clothe: [
    "reference",
    "category",
    "size",
    "description",
    "availability",
    "price",
    "quantity",
    "photography",
  ],
};

var page = "clothe";
console.log(strt[page]);
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.onclick = function () {
      page = this.dataset.page;
      goTo(page);

      link.classList.add("active");
    };
  });
  form.fields = strt[page];
  table.head = tables[page];
  traerDatos(page);
  form.render();
});
function goTo(page) {
  link = document.querySelector(".active");
  link.classList.remove("active");
  console.log(page);
  form.fields = strt[page];
  table.head = tables[page];
  traerDatos(page);
  form.formData = {};
  form.render();
}
var idSubmit = null;
var action = "post";
formView = document.getElementById("form");
modal = new bootstrap.Modal(document.getElementById("info-modal"), {
  keyboard: false,
});
modaltxt = document.getElementById("modal-msg");
modaltitle = document.querySelector(".modal-title");

formView.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!formView.checkValidity()) {
    event.stopPropagation();
  } else {
    let opt = { post: "new", put: "update" };

    let data = form.getData();
    let url = `http://localhost:8080/api/${page}/${opt[action]}`;
    console.log(data);

    console.log(url);

    test(url, action, data, function (r) {
      console.log(r);
      if (page == "user" && r.id == null) {
        showModal("Error", "Email already exist ");
      } else if (page == "user" && r.reference == null) {
        showModal("Error", "There was and error ");
      } else if (action == "post") {
        showModal("Success", `${page} created`);
      } else if (action == "put") {
        showModal("Success", `${page} updated`);
      }
    });

    form.formData = {};

    setTimeout(function () {
      action = "post";
      traerDatos(page);
    }, 500);
  }
});

class Form {
  constructor(fields = {}) {
    this.fields = fields;
  }
  formView = document.getElementById("form");
  formData = {};

  render = function () {
    //console.log(this.fields)
    this.formView.innerHTML = "";
    var fragment = new DocumentFragment();
    // Creacion de los input
    for (let key in this.fields) {
      let options = this.fields[key];
      let newInput = this.createField(key, options);
      fragment.appendChild(newInput);
    }

    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.textContent = "Submit";
    button.setAttribute("id", "submit");

    fragment.appendChild(button);

    this.formView.appendChild(fragment);
  };
  createField = function (title, options) {
    //creacion de elementos
    let div = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");

    if (options.type != "select") {
      input.setAttribute("type", options["type"]);
      //console.log(options);
      for (let key in options) {
        input.setAttribute(key, options[key]);
      }
    } else {
      input = document.createElement("select");
      this.generateOpt(options.for, input);
      input.setAttribute("required", options.required);
    }

    //Adicion de stilos
    div.classList.add("mb-3");
    label.classList.add("form-label");
    input.classList.add("form-control");
    input.setAttribute("id", title);

    label.textContent = title.toUpperCase();
    input.name = title;
    // input.required = true;
    div.appendChild(label);
    div.appendChild(input);

    return div;
  };
  //Para generar las opciones de un select se necesita
  // la pagina de donde se van a traer los datos y lael input asociado
  generateOpt = async function (page, input) {
    let datos = page;
    //console.log(datos);
    datos.forEach((dato) => {
      let opt = document.createElement("option");
      opt.textContent = dato;
      opt.value = dato;
      input.appendChild(opt);
    });
  };
  getData = function () {
    let temp = this.formData;
    for (let key in strt[page]) {
      let ele = document.getElementById(key);
      let data = ele.value;
      if (data == "") data = null;
      temp[key] = data;
      if (strt[page][key]["type"] == "select") {
        if (data == "Si") temp[key] = true;
        if (data == "No") temp[key] = false;
      }

      ele.value = null;
      ele.disabled = false;
    }

    //console.log(temp);
    return temp;
  };
  getId = function (data) {
    if (page == "user") this.formData["id"] = data.id;
    else {
      this.formData["reference"] = data.reference;
    }
  };
  searchOpt = function (opt, ele) {
    for (let i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == opt) {
        ele.selectedIndex = i;
        console.log(i);
        break;
      }
    }
  };
  fillFields = function (params) {
    console.log(params);
    for (let key in strt[page]) {
      let ele = document.getElementById(key);
      ele.value = params[key];
      if (strt[page][key]["type"] == "select") this.searchOpt(params[key], ele);
      ele.disabled = !strt[page][key]["edition"];
    }
    this.getId(params);
  };
}
class Table {
  constructor(head = [], dataSet = {}) {
    this.head = head;
    this.dataSet = dataSet;
    this.table = document.getElementById("table");
  }
  renderHead = function () {
    //limpieza de la actual tabla
    this.table.innerHTML = "";
    //Creacion elementos de header en base al los obj iniciales
    //console.log("column")
    let fragment = new DocumentFragment();
    //creacion de elementos tabla
    let thead = document.createElement("thead");
    let header = document.createElement("tr");
    this.head.forEach((head) => {
      header.appendChild(this.createColumn(head, "th"));
    });

    header.appendChild(this.createColumn("Actions", "th"));
    thead.appendChild(header);
    fragment.appendChild(thead);
    this.table.appendChild(fragment);
  };
  render = function () {
    let fragment = new DocumentFragment();
    let tbody = document.createElement("tbody");

    //lenando la tabla con datos
    this.dataSet.forEach((data) => {
      //console.log(data);

      let tmp = document.createElement("tr");
      this.head.forEach((key) => {
        //console.log(key);
        let info = data[key];
        if (typeof info === "boolean") {
          info = info ? "Si" : "No";
          data[key] = info;
        }
        tmp.appendChild(this.createColumn(info, "td"));
      });
      let column = this.createButtons(data);
      tmp.appendChild(column);
      tbody.appendChild(tmp);
    });

    fragment.appendChild(tbody);
    this.table.appendChild(fragment);
  };
  delete = function (data) {
    console.log(data.id);

    idSubmit = data.id || data["reference"];
    action = "delete";
    deleteDato();
  };
  sendToEdit = function (data) {
    action = "put";
    form.fillFields(data);
  };

  createColumn = function (data, type) {
    let column = document.createElement(type);
    column.scope = "col";
    let txt = data;

    column.textContent = txt;

    return column;
  };
  createButtons = function (data) {
    let column = document.createElement("td");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.textContent = "E";
    let button2 = document.createElement("button");
    button2.classList.add("btn");
    button2.classList.add("btn-outline-dark");
    button2.textContent = "D";
    button.onclick = () => {
      this.sendToEdit(data);
    };
    button2.onclick = () => {
      this.delete(data);
    };
    column.appendChild(button);
    column.appendChild(button2);
    return column;
  };
}

var table = new Table();
var form = new Form();

async function traerDatos(page) {
  //console.log("hear");
  await table.renderHead();
  let URL = `http://localhost:8080/api/${page}/all`;
  test(URL, "get", {}, function (response) {
    // console.log(response);
    table.dataSet = response;
    table.render();
  });
}
async function deleteDato() {
  let URL = `http://localhost:8080/api/${page}/${idSubmit}`;
  // console.log(URL);
  //console.log(data);
  test(URL, action, {}, function (response) {
    if (response == undefined) {
      showModal("Success", `${page} deleted`);
    }
  });
  idSubmit = null;
  action = "post";
  setTimeout(function () {
    action = "post";
    traerDatos(page);
  }, 500);
}
function showModal(title, text) {
  modaltxt.textContent = text;
  modaltitle.textContent = title;
  modal.show();
}
