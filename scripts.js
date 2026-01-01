let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
let searchMood = "title";
// console.log(title, price, taxes, ads, discount, total, count, category, submit);

// Get Total
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// Create product & Save in the local storage
let dataPro = [];
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}
submit.onclick = function () {
    let obj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (title.value != "" && price.value != "" && category.value != "" && obj.count <= 100) {
        if (mood === "create") {
            if (obj.count > 1) {
                for (let i = 0; i < obj.count; i++) {
                    dataPro.push(obj);
                }
            } else {
                dataPro.push(obj);
            }
        }
        else {
            dataPro[tmp] = obj;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }
    else {
        alert("Please, fill in the required fields");
    }
    localStorage.setItem("product", JSON.stringify(dataPro));
    
};

// clear after saving
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Read from the local storage
function readData() {
    let table = "";

    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= "updateData(${i})" id="update">update</button></td>
            <td><button onclick=" deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("table-body").innerHTML = table;
    if (dataPro.length > 0) {
        document.getElementById("deleteAll").innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        document.getElementById("deleteAll").innerHTML = "";
    }
    readData();
}
readData();

// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}
// delete all
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    readData();
}
// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    tmp = i;

    submit.onclick = function () {
        let obj = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        };
        dataPro[tmp] = obj;
        submit.innerHTML = "Create";
        count.style.display = "block";
        localStorage.product = JSON.stringify(dataPro);
        scroll({ top: 0, behavior: "smooth" });
        clearData();
        readData();
    };
}

// search
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }   
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    readData();
}

function searchData(value) {
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            let table = "";
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= "updateData(${i})" id="update">update</button></td>
                            <td><button onclick=" deleteData(${i})" id="delete">delete</button></td>
                        </tr>
            `;
            }
        }
        else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= "updateData(${i})" id="update">update</button></td>
                            <td><button onclick=" deleteData(${i})" id="delete">delete</button></td>
                        </tr>
            `;
            }
        }
    }
    document.getElementById("table-body").innerHTML = table;
}
