const products = [];
// Functions hiện sản phẩm ra trang chủ
function displayProduct(product) {
  const menuItemDiv = document.createElement("div");
  menuItemDiv.classList.add(
    "item",
    "col-lg-3",
    "col-md-4",
    "col-sm-6",
    "product-item"
  );

  const productImage = document.createElement("img");
  productImage.src = product.img;
  productImage.alt = product.name;
  menuItemDiv.appendChild(productImage);

  const productName = document.createElement("h2");
  productName.textContent = product.name;
  menuItemDiv.appendChild(productName);

  const productPrice = document.createElement("span");
  productPrice.textContent = "Price: $" + product.price;
  menuItemDiv.appendChild(productPrice);

  const productCamera = document.createElement("p");
  productCamera.textContent = "Thông số :" + product.backCamera;
  menuItemDiv.appendChild(productCamera);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("product-buttons");

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Thêm vào giỏ hàng";
  addToCartButton.classList.add("btn-add", "btn-primary");
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });
  buttonDiv.appendChild(addToCartButton);

  menuItemDiv.appendChild(buttonDiv);
  const menuDiv = document.querySelector(".menu-item");
  menuDiv.appendChild(menuItemDiv);
}
const cart = {
  products: [],
  getTotalQuantity() {
    return this.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  },
};

function updateCartIcon() {
  const cartIcon = document.querySelector(".cart-icon");
  const cartQuantity = document.querySelector(".cart-quantity");

  const totalQuantity = cart.getTotalQuantity();

  cartQuantity.textContent = totalQuantity;

  if (totalQuantity > 0) {
    cartQuantity.style.display = "block";
  } else {
    cartQuantity.style.display = "none";
  }
}

// Functions thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ ...product, quantity: 1 });
  }

  updateCartIcon();
}

// Lấy dữ liệu sản phẩm từ api
async function displayProductsFromApi() {
  try {
    const response = await apiGetProducts();

    if (response.status === 200) {
      const products = response.data;

      products.forEach((product) => {
        displayProduct(product);
      });
    } else {
      console.log("Failed to fetch products from API.");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
// thêm sản phẩm vào giỏ hàng
function showModal() {
  if (!Array.isArray(cart.products)) {
    console.error("Invalid input. 'products' must be an array.");
    return;
  }

  const modal = document.querySelector(".modal");
  const cartItems = document.querySelector(".cart-items");

  cartItems.innerHTML = "";

  cart.products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");

    const productImage = document.createElement("img");
    productImage.src = product.img;
    productDiv.appendChild(productImage);

    const productName = document.createElement("h2");
    productName.textContent = product.name;
    productDiv.appendChild(productName);

    const productPrice = document.createElement("p");
    productPrice.textContent = "Giá: $" + product.price;
    productDiv.appendChild(productPrice);

    const productQuantity = document.createElement("p");
    productQuantity.textContent = "Số lượng: " + product.quantity;
    productDiv.appendChild(productQuantity);

    cartItems.appendChild(productDiv);

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("quantity-button");
    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(product);
      showModal();
    });
    productDiv.appendChild(decreaseButton);

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.classList.add("quantity-button");
    increaseButton.addEventListener("click", () => {
      increaseQuantity(product);
      showModal();
    });
    productDiv.appendChild(increaseButton);
  });

  const totalPrice = calculateTotalPrice();
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("price-total");
  totalDiv.textContent = "Tổng giá trị đơn hàng: $" + totalPrice;
  cartItems.appendChild(totalDiv);

  modal.classList.add("active");
}
// hàm tính tổng tiển
function calculateTotalPrice() {
  let totalPrice = 0;

  cart.products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  return totalPrice;
}

// Nút tăng số lượng sản phẩm
function increaseQuantity(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  }
}
//Nút giảm số lượng sản phẩm
function decreaseQuantity(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity--;
    if (existingProduct.quantity < 1) {
      cart.products = cart.products.filter((p) => p.id !== product.id);
    }
  }
}

// Nút đóng modal
document.addEventListener("DOMContentLoaded", () => {
  const btnClose = document.getElementById("btn-close");
  btnClose.addEventListener("click", () => {
    console.log("Button close is clicked");
    hideModal();
  });
});
//Show modal giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", () => {
    showModal(cart.products);
  });
});
// Nút thanh toán
document.getElementById("btn-checkout").onclick = () => {
  const total = calculateTotalPrice();
  if (total > 0) {
    alert("Bạn đã thanh toán thành công số tiền: $" + total);
  } else {
    alert("Bạn chưa có sản phẩm nào, vui lòng chọn sản phẩm !");
  }
  hideModal();
};

//Tạm ẩn modal giỏ hàng
function hideModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("active");
}
window.onload = () => {
  displayProductsFromApi();
};
