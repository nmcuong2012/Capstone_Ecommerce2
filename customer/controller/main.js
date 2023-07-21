const products = [];

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
  productCamera.textContent = product.backCamera;
  menuItemDiv.appendChild(productCamera);

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Thêm vào giỏ hàng";
  addToCartButton.classList.add("btn", "btn-primary");
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });
  menuItemDiv.appendChild(addToCartButton);
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

function addToCart(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ ...product, quantity: 1 });
  }

  updateCartIcon();
}
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
  totalDiv.textContent = "Tổng giá trị đơn hàng: $" + totalPrice;
  cartItems.appendChild(totalDiv);

  modal.classList.add("active");
}
function calculateTotalPrice() {
  let totalPrice = 0;

  cart.products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  return totalPrice;
}
function increaseQuantity(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  }
}

function decreaseQuantity(product) {
  const existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity--;
    if (existingProduct.quantity < 1) {
      cart.products = cart.products.filter((p) => p.id !== product.id);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", () => {
    showModal(cart.products);
  });
});
document.getElementById("btn-checkout").onclick = () => {
  const toal = calculateTotalPrice();
  alert("Bạn đã thanh toán thành công số tiền :" + toal);
};
window.onload = () => {
  displayProductsFromApi();
};
