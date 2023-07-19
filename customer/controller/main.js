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
  addToCartButton.classList.add("btn", "btn-primary"); // Thêm lớp CSS của Bootstrap cho nút
  addToCartButton.addEventListener("click", () => {
    addToCart(product); // Gọi hàm xử lý thêm sản phẩm vào giỏ hàng khi nút được nhấp67yum12;./op
  });
  menuItemDiv.appendChild(addToCartButton);
  const menuDiv = document.querySelector(".menu-item");
  menuDiv.appendChild(menuItemDiv);
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

// Gọi hàm để hiển thị sản phẩm từ API khi trang được load
window.onload = () => {
  displayProductsFromApi();
};
