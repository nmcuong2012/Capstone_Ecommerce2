function apiGetProducts() {
  return axios({
    url: "https://64a6ad30096b3f0fcc804452.mockapi.io/Capstone_Ecommerce",
    method: "GET",
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64a6ad30096b3f0fcc804452.mockapi.io/Capstone_Ecommerce/${productId}`,
    method: "GET",
  });
}
// product = {name: "...", price: 1000, image: "...", type: "..."}
function apiCreateProduct(product) {
  return axios({
    url: "https://64a6ad30096b3f0fcc804452.mockapi.io/Capstone_Ecommerce",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64a6ad30096b3f0fcc804452.mockapi.io/Capstone_Ecommerce/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64a6ad30096b3f0fcc804452.mockapi.io/Capstone_Ecommerce/${productId}`,
    method: "DELETE",
  });
}










