<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Đăng ký</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <form class="form" method="post" action="reg.php">
    <p class="title">Đăng ký</p>
    <p class="message">
      Đăng ký ngay và nhận quyền truy cập đầy đủ vào ứng dụng của chúng tôi.
    </p>

    <label>
      <input class="input" type="text" name="sodienthoai" placeholder="" required />
      <span>Số điện thoại</span>
    </label>

    <div class="flex">
      <label>
        <input class="input" type="text" name="ho" placeholder="" required />
        <span>Họ</span>
      </label>

      <label>
        <input class="input" type="text" name="ten" placeholder="" required />
        <span>Tên</span>
      </label>
    </div>

    <label>
      <input class="input" type="email" name="email" placeholder="" required />
      <span>Email</span>
    </label>

    <label>
      <input class="input" type="password" name="matkhau" placeholder="" required />
      <span>Mật khẩu</span>
    </label>
    <label>
      <input class="input" type="password" name="confirm_matkhau" placeholder="" required />
      <span>Xác nhận mật khẩu</span>
    </label>
    <button type="submit" class="submit">Gửi</button>
    <p class="signin">
      Đã có tài khoản? <a href="index1.html">Đăng nhập</a>
    </p>
  </form>

</body>

</html>