let bar = document.getElementById("bar");
let overlay = document.getElementById("overlay");
let right = document.getElementById("right-side");
let toggleBtn = document.getElementById("toggle-btn");

bar.addEventListener("click", () => {
  right.classList.add("active");
  overlay.classList.add("active");
  console.log("good");
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  right.classList.remove("active");
});

let dataTheme = document.documentElement;
let colorStorge = localStorage.getItem("theme");
let colorTheme;
if (colorStorge != null) {
  dataTheme.setAttribute("data-theme", colorStorge);
  dataTheme.dataset.theme == "dark"
    ? toggleBtn.classList.add("active")
    : toggleBtn.classList.remove("active");
}

toggleBtn.addEventListener("click", () => {
  dataTheme.dataset.theme === "light"
    ? (colorTheme = "dark")
    : (colorTheme = "light");
  localStorage.setItem("theme", colorTheme);
  dataTheme.setAttribute("data-theme", colorTheme);
  dataTheme.dataset.theme == "dark"
    ? toggleBtn.classList.add("active")
    : toggleBtn.classList.remove("active");
});
// product data fetching
let productContainer = document.getElementById("product-container");
let searchFild = document.getElementById("search-fild");
let app = fetch("https://dummyjson.com/products").then((res) => {
  return res.json();
});

let data = app.then((res) => {
  return res.products;
});

loopData(data);

function loopData(arr) {
  app.catch(() => {
    productContainer.innerHTML = `<div class="spam">check your network</div>`;
  });
  arr.then((products) => {
    products.forEach((product) => {
      if (product.id < 19) {
        productContainer.innerHTML += `
          <div class="product-box">
             <div class="image"><img src="${product.thumbnail}" alt="product-image" loading="lazy" /></div>
              <div class="content">
                  <div class="text">
                    <h4 class="product-title">${product.title}</h4>
                    <p class="description">${product.description}</p>
                  </div>
            <div class="data">
              <span class="category">brand : ${product.brand}</span>
              <span class="rating">rating : ${product.rating}</span>
              <p class="price">price is : ${product.price}$</p>
            </div>
          </div>
        </div>`;
      }
    });
  });
}

function loopSearchData(products) {
  products.forEach((product) => {
    productContainer.innerHTML += `
        <div class="product-box">
           <div class="image"><img src="${product.thumbnail}" alt="product-image" loading="lazy" /></div>
            <div class="content">
                <div class="text">
                  <h4 class="product-title">${product.title}</h4>
                  <p class="description">${product.description}</p>
                </div>
          <div class="data">
            <span class="category">brand : ${product.brand}</span>
            <span class="rating">rating : ${product.rating}</span>
            <p class="price">price is : ${product.price}$</p>
          </div>
        </div>
      </div>`;
  });
}

searchFild.addEventListener("input", (e) => {
  if (e.target.value == "") {
    loopData(data);
  } else {
    productContainer.innerHTML = "";
    data.then((res) => {
      let newArrayData = res;
      let fillteredData = newArrayData.filter((ele) => {
        return (
          ele.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim()) && ele
        );
      });
      loopSearchData(fillteredData);
    });
  }
});
