getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
      // console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
}

function createProduct() {
  // DOM và khởi tạo object product
  let product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    screen: getElement("#ScreenSP").value,
    backcamera: getElement("#camerasau").value,
    frontcamera: getElement("#cameratruoc").value,
    image: getElement("#HinhSP").value,
    desc: getElement("#MotaSP").value,
    type: getElement("#loaiSP").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      // Sau khi thêm thành công, dữ liệu chỉ mới được cập nhật ở phía server. Ta cần gọi lại hàm apiGetProducts để lấy được danh sách những sản phẩm mới nhất (bao gồm sản phẩm mình mới thêm)
      return apiGetProducts();
    })
    .then((response) => {
      // response là kết quả promise của hàm apiGetProducts
      display(response.data);
      // Ẩn modal
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      // Xoá thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectProduct(productId) {
  // Hiển thị modal
  $("#myModal").modal("show");
  // Hiển thị title và footer của modal
  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-success" onclick="updateProduct('${productId}')">Cập nhật</button>
  `;

  apiGetProductById(productId)
    .then((response) => {
      // Lấy thông tin sản phẩm thành công => hiển thị dữ liệu lên form
      let product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#GiaSP").value = product.price;
      getElement("#ScreenSP").value = product.screen;
      getElement("#camerasau").value = product.backCamera;
      getElement("#cameratruoc").value = product.frontCamera;

      getElement("#HinhSP").value = product.img;
      getElement("#MotaSP").value = product.desc;

      getElement("#loaiSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(productId) {
  // DOM và khởi tạo object product
  let newProduct = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    screen: getElement("#ScreenSP").value,
    backCamera: getElement("#camerasau").value,
    frontCamera: getElement("#cameratruoc").value,
    img: getElement("#HinhSP").value,
    desc: getElement("#MotaSP").value,
    type: getElement("#loaiSP").value,
  };

  apiUpdateProduct(productId, newProduct)
    .then(() => {
      // Cập nhật thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(products) {
  let html = products.reduce((result, value, index) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
        <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.screen}</td>
          <td>${product.backCamera}</td>
          <td>${product.frontCamera}</td>
          <td>
            <img src="${product.img}" width="100px" height="100px" />
          </td>
          <td>${product.desc}</td>

          <td>${product.type}</td>
          <td class="d-flex flex-start">
            <button
              class="btn btn-primary"
              onclick="selectProduct('${product.id}')"
            >
              Xem
            </button>
            <button
              class="btn btn-danger"
              onclick="deleteProduct('${product.id}')"
            >
              Xoá
            </button>
          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

// ======= DOM =======
getElement("#btnThemSP").onclick = () => {
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-success" onclick="createProduct(), validateAndSubmit()">Thêm</button>
  `;
};

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}


// Validate

function validateAndSubmit() {
  // Define the validation constraints for the form fields
  const constraints = {
    TenSP: {
      presence: { allowEmpty: false, message: "^Tên Sản Phẩm không được bỏ trống" }
    },
    GiaSP: {
      presence: { allowEmpty: false, message: "^Giá không được bỏ trống" },
      numericality: { greaterThan: 0, message: "^Giá phải là một số lớn hơn 0" }
    }
    // Add more constraints for other fields if needed
  };

  // Get the form data
  const formData = {
    TenSP: document.getElementById('TenSP').value,
    GiaSP: document.getElementById('GiaSP').value,
    // Get other form field values similarly
  };

  // Perform the validation
  const validationErrors = validate(formData, constraints);

  // Check if there are any validation errors
  if (validationErrors) {
    // If there are errors, display them to the user
    for (const field in validationErrors) {
      const errorMessages = validationErrors[field];
      const errorMessage = errorMessages.join(', ');
      alert(errorMessage);
    }
  } else {
    // If no errors, proceed with form submission (you can implement this part)
    // For example, you can call a function to submit the form to the server
    // submitFormToServer(formData);
    // Close the modal if needed
    // $("#myModal").modal("hide");
  }
}