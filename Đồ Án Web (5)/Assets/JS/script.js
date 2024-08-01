function playSound(audioSrc) {
  var audio = document.getElementById("audio");
  audio.src = audioSrc;
  audio.play();
}
const sections = document.querySelectorAll(".about-wpb-row");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutSections = document.querySelectorAll(".about-section");

  function checkViewport() {
    aboutSections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.5) {
        section.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkViewport);
  checkViewport();
});

//menu
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  var cartBtn = document.getElementById("cart");
  var closeBtns = document.querySelectorAll(".close, .close-footer");
  var cartItems = document.querySelector(".cart-items");
  var cartTotalPrice = document.querySelector(".cart-total-price");
  var paymentCartTotalPrice = document.querySelector(
    "#payment-modal .cart-total-price"
  );
  var discount = 0; // Biến lưu trữ giá trị giảm giá

  // Xử lý khi nhấn vào nút giỏ hàng để mở modal
  cartBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Đóng modal khi nhấn nút đóng hoặc ngoài vùng modal
  closeBtns.forEach(function (btn) {
    btn.onclick = function () {
      modal.style.display = "none";
    };
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Xử lý thêm sản phẩm vào giỏ hàng khi nhấn nút "Thêm vào giỏ hàng"
  var addToCartBtns = document.querySelectorAll(".btn-cart");
  addToCartBtns.forEach(function (btn) {
    btn.onclick = function (event) {
      var productCard = event.target.closest(".product");
      var productName = productCard.querySelector(".product-name h3").innerText;
      var productPrice = productCard.querySelector(".price .money").innerText;
      var productImg = productCard.querySelector("img").src;
      addItemToCart(productName, productPrice, productImg);
      updateCartTotal();
    };
  });

  // Hàm thêm sản phẩm vào giỏ hàng
  function addItemToCart(name, price, img) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == name) {
        alert("Sản phẩm đã có trong giỏ hàng");
        return;
      }
    }

    // Nếu chưa tồn tại, thêm vào giỏ hàng
    var cartRowContents = `
      <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width="100" height="100">
        <span class="cart-item-title">${name}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Xóa</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Thêm sự kiện xóa sản phẩm và thay đổi số lượng
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  // Hàm cập nhật tổng giá tiền của giỏ hàng
  function updateCartTotal() {
    var cartRows = cartItems.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName("cart-price")[0];
      var quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      var price = parseFloat(
        priceElement.innerText.replace("VNĐ", "").replace(",", "")
      );
      var quantity = quantityElement.value;
      total += price * quantity;
    }
    total = total * (1 - discount / 100); // Áp dụng giảm giá
    cartTotalPrice.innerText = total.toLocaleString() + "VNĐ";
    paymentCartTotalPrice.innerText = total.toLocaleString() + "VNĐ"; // Cập nhật tổng giá tiền trong trang thanh toán
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.closest(".cart-row").remove();
    updateCartTotal();
  }

  // Hàm thay đổi số lượng sản phẩm trong giỏ hàng
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  // Xử lý khi nhấn nút thanh toán để mở form thanh toán
  document
    .getElementById("checkout-button")
    .addEventListener("click", function () {
      var cartRows = cartItems.getElementsByClassName("cart-row");
      if (cartRows.length === 0) {
        // Hiển thị thông báo giỏ hàng trống nếu cần thiết
        document.getElementById("cart-empty-message").style.display = "block";
        return; // Ngăn chặn tiếp tục
      }

      // Nếu có sản phẩm trong giỏ hàng, tiến hành mở form thanh toán
      showPaymentForm();
      updatePaymentCartItems(); // Cập nhật lại các mục trong giỏ hàng thanh toán
    });

  // Hàm cập nhật lại danh sách sản phẩm trong giỏ hàng thanh toán
  function updatePaymentCartItems() {
    var cartRows = cartItems.getElementsByClassName("cart-row");
    var paymentCartItems = document.querySelector("#payment-modal .cart-items");
    paymentCartItems.innerHTML = ""; // Xóa bỏ các mục đã có để cập nhật lại
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var productName = cartRow.querySelector(".cart-item-title").innerText;
      var productPrice = cartRow.querySelector(".cart-price").innerText;
      var productImg = cartRow.querySelector(".cart-item-image").src;
      var quantity = cartRow.querySelector(".cart-quantity-input").value;

      var cartRowContents = `
        <div class="cart-row">
          <div class="cart-item cart-column">
            <img class="cart-item-image" src="${productImg}" width="100" height="100">
            <span class="cart-item-title">${productName}</span>
          </div>
          <span class="cart-price cart-column">${productPrice}</span>
          <div class="cart-quantity cart-column">
            <span class="cart-quantity-value">${quantity}</span>
          </div>
        </div>`;
      paymentCartItems.innerHTML += cartRowContents;
    }
  }

  // Hàm hiển thị form thanh toán
  function showPaymentForm() {
    var cartRows = cartItems.getElementsByClassName("cart-row");
    if (cartRows.length === 0) {
      // Hiển thị thông báo giỏ hàng trống nếu cần thiết
      document.getElementById("cart-empty-message").style.display = "block";
      return; // Ngăn chặn tiếp tục mở form thanh toán
    }

    // Nếu có sản phẩm trong giỏ hàng, tiến hành mở form thanh toán
    document.getElementById("payment-modal").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
  }

  // Hàm đóng form thanh toán
  function closePaymentForm() {
    document.getElementById("payment-modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
  }

  // Xử lý khi nhấn nút đóng trang thanh toán
  document.querySelector("#payment-modal .btn-secondary-custom").onclick =
    function () {
      closePaymentForm();
    };
});

// Hàm toggle hiển thị mã QR khi chọn phương thức chuyển khoản
function toggleQRCode() {
  const transferOption = document.getElementById("transfer-custom");
  const qrCodeSection = document.querySelector(".qr-code-custom");
  if (transferOption.checked) {
    qrCodeSection.style.display = "block";
  } else {
    qrCodeSection.style.display = "none";
  }
}

// Hàm áp dụng mã khuyến mãi
function applyCoupon() {
  var couponInput = document.getElementById("coupon-custom");
  var couponCode = couponInput.value.trim();
  var discountRate = getCouponDiscount(couponCode);
  if (discountRate > 0) {
    discount = discountRate;
    updateCartTotal();
    alert("Áp dụng mã khuyến mãi thành công! Giảm " + discountRate + "%");

    if (document.getElementById("payment-modal").style.display === "block") {
      updatePaymentCartTotal();
    }
  } else {
    discount = 0;
    updateCartTotal();
    alert("Mã khuyến mãi không hợp lệ hoặc đã hết hạn");
  }
}

// Hàm lấy % giảm giá từ mã khuyến mãi
function getCouponDiscount(code) {
  // Dữ liệu mẫu về các mã khuyến mãi và % giảm giá
  var coupons = {
    C: 10,
    SALE20: 20,
    SALE30: 30,
  };
  return coupons[code] || 0;
}

// Hàm cập nhật tổng giá tiền của giỏ hàng
function updatePaymentCartTotal() {
  var cartRows = document.querySelectorAll("#payment-modal .cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.querySelector(".cart-price");
    var quantityElement = cartRow.querySelector(".cart-quantity-value");
    var price = parseFloat(
      priceElement.innerText.replace("VNĐ", "").replace(",", "")
    );
    var quantity = quantityElement.innerText;
    total += price * quantity;
  }
  total = total * (1 - discount / 100); // Áp dụng giảm giá
  document.querySelector("#payment-modal .cart-total-price").innerText =
    total.toLocaleString() + "VNĐ";
}

// Xử lý khi tải trang
document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll("#portfolio-filters li");
  const items = document.querySelectorAll(".portfolio-item");

  // Xử lý khi click vào các mục lọc
  filters.forEach((filter) => {
    filter.addEventListener("click", function () {
      filters.forEach((f) => f.classList.remove("filter-active"));
      this.classList.add("filter-active");

      const filterValue = this.getAttribute("data-filter");

      // Hiển thị hoặc ẩn các mục tương ứng
      items.forEach((item) => {
        if (
          filterValue === "*" ||
          item.classList.contains(filterValue.slice(1))
        ) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      });
    });
  });

  // Mặc định hiển thị tất cả các mục khi tải trang
  items.forEach((item) => item.classList.add("show"));
});

//kiểm tra các ô nhập
function checkEmailExistence(email) {
  return fetch("/api/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.exists;
    })
    .catch((error) => {
      console.error("Error checking email existence:", error);
      return false;
    });
}

function validateForm() {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form submit

  var name = document.getElementById("name-custom").value.trim();
  var gender = document.getElementById("gender-custom").value.trim();
  var address = document.getElementById("address-custom").value.trim();
  var phone = document.getElementById("phone-custom").value.trim();
  var email = document.getElementById("email-custom").value.trim();
  var dob = document.getElementById("dob-custom").value.trim();
  var cmnd = document.getElementById("cmnd-custom").value.trim();
  var paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  );

  if (
    name === "" ||
    gender === "" ||
    address === "" ||
    phone === "" ||
    email === "" ||
    dob === "" ||
    cmnd === ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    alert("Vui lòng nhập đúng định dạng email.");
    return false;
  }

  var phonePattern = /^\d{10,11}$/;
  if (!phone.match(phonePattern)) {
    alert("Vui lòng nhập đúng định dạng số điện thoại.");
    return false;
  }

  var cmndPattern = /^\d{9,12}$/;
  if (!cmnd.match(cmndPattern)) {
    alert("Vui lòng nhập đúng định dạng số CMND.");
    return false;
  }

  var overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  return checkEmailExistence(email)
    .then((exists) => {
      if (exists) {
        alert("Email đã tồn tại trên hệ thống.");
        overlay.style.display = "none";
        return false;
      } else {
        setTimeout(function () {
          if (confirm("Thanh toán thành công!")) {
            var buildInfo = document.getElementById("build-info");
            buildInfo.style.display = "block";
          }
          overlay.style.display = "none";
        }, 5000);

        return true;
      }
    })
    .catch((error) => {
      console.error("Error checking email existence:", error);
      overlay.style.display = "none";
      return false;
    });
}
