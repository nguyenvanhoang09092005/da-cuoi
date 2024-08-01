<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Đăng Nhập</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <form class="form" method="post" action="reg.php">
    <p class="title">Đăng nhập</p>

    <label>
      <input class="input" type="text" name="sodienthoai" placeholder="" required />
      <span>Số điện thoại</span>
    </label>

    <label>
      <input class="input" type="email" name="email" placeholder="" required />
      <span>Email</span>
    </label>

    <label>
      <input class="input" type="password" name="matkhau" placeholder="" required />
      <span>Mật khẩu</span>
    </label>
    <button type="submit" class="submit">Đăng Nhập</button>
    <p class="signin">
      Đã chưa có tài khoản? <a href="index.html">Đăng ký</a>
    </p>
  </form>

</body>

</html>