let title = document.querySelector("#title");
let allCost = document.querySelectorAll("#allCost input");
let count = document.querySelector("#count");
let department = document.querySelector("#department");
let addBtn = document.querySelector("#createBtn");
let tbody = document.querySelector("#tbody")
let clearAllBtn = document.querySelector("#clearBtn")
let countBtn = document.querySelector("#countBtn")
let invalid_message = document.querySelectorAll(".invalid_message")
let allInputs = document.querySelectorAll("input")
let inputNumbers = document.querySelectorAll(".inputNumbers")
let invalid_number = document.querySelectorAll(".invalid_number")

let products;
let mood = "create";
let globalID;

let validationError = false;


// For Validation if the Inputs are Empty
for (let i = 0; i < allInputs.length; i++) {
  if (allInputs[i].value == "") {
    validationError = false;
  } else {
    validationError = true;
  }
  allInputs[i].addEventListener("keyup", () => {
    if (allInputs[i].value == "") {
      invalid_message[i].classList.remove("invalid_message")
      validationError = false;
    } else {
      validationError = true;
      invalid_message[i].classList.add("invalid_message")
    }
  })

}

// For Validation if the Entered Numbers are Valid 
for (let i = 0; i < inputNumbers.length; i++) {
  if (inputNumbers[i].value <= 0) {
    validationError = false;
  } else {
    validationError = true;
  }
  inputNumbers[i].addEventListener("keyup", () => {
    if (inputNumbers[i].value <= 0) {
      invalid_number[i].classList.remove("invalid_number");
      validationError = false;
    } else {
      validationError = true;
      invalid_number[i].classList.add("invalid_number");
    }
  })

}

//Local Storage
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}

// calculate The Total
let getTotal = () => {

  price = allCost[0].value;
  tax = allCost[1].value;
  discount = allCost[2].value;

  taxCost = +price * (+tax / 100);
  total = (+taxCost + +price) - +discount;
  allCost[3].value = Math.ceil(total)

}
for (let i = 0; i < allCost.length; i++) {
  allCost[i].addEventListener("keyup", getTotal)
}


//  Add New Product
let createObject = () => {
  let newProductObject = {
    title: title.value,
    price: allCost[0].value,
    tax: allCost[1].value,
    discount: allCost[2].value,
    total: allCost[3].value,
    count: count.value,
    department: department.value
  }


  if (mood == "create") {
    for (let i = 1; i <= count.value; i++) {
      products.push(newProductObject);
    }
  } else {
    products[globalID] = newProductObject;
    mood = "create";
    addBtn.innerHTML = 'Add This Product';
    addBtn.classList.replace("btn-update", "btn");
    count.classList.remove("none")
  }

  console.log(products);
  clearInputs();
  renderData();
  localStorage.setItem("products", JSON.stringify(products));
  validationError = false;
}



// Clear Inputs
let clearInputs = () => {
  title.value = ""
  allCost[0].value = ""
  allCost[1].value = ""
  allCost[2].value = ""
  allCost[3].value = ""
  count.value = ""
  department.value = ""
}

// Render
let renderData = () => {
  let table = '';

  for (let i = 0; i < products.length; i++) {

    table += `
    
    <tr>

      <td max-width="8%">  ${i+1} </td>
      <td width="32%">  ${products[i].title} </td>
      <td width="5%">  ${products[i].price} </td>
      <td width="5%">  ${products[i].tax} </td>
      <td width="5%">  ${products[i].discount} </td>
      <td width="5%">  ${products[i].total} </td>
      <td width="20%">  ${products[i].department} </td>
      <td width="20%"> <a onclick="update(${i})"><i class="fa-solid fa-pen-to-square"></i> </a>
      <a onclick="deleteItem(${i})"> <i class="fa-solid fa-trash-can"></i> </a>  </td>
      
    </tr>
    
    `

  }

  tbody.innerHTML = table;
  if (products.length == 0) {
    clearAllBtn.style.display = "none"
  } else {
    clearAllBtn.style.display = "block"
    countBtn.innerHTML = products.length;
  }
}
renderData();

addBtn.addEventListener("click", createObject);


// Clear
let clearAll = () => {
  localStorage.clear();
  products.splice(0);
  renderData();
}
clearAllBtn.addEventListener("click", clearAll);


// Delete
let deleteItem = (i) => {
  products.splice(i, 1);
  localStorage.products = JSON.stringify(products);
  renderData();
}


// Update 
let update = (i) => {

  mood = "update";

  globalID = i;

  title.value = products[i].title;
  allCost[0].value = products[i].price;
  allCost[1].value = products[i].tax;
  allCost[2].value = products[i].discount;
  allCost[3].value = products[i].total;
  department.value = products[i].department;


  count.classList.add("none");
  addBtn.innerHTML = `Update Data : ${i+1}`
  addBtn.classList.replace("btn", "btn-update")
}