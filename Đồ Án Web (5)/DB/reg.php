<?php
include 'connect.php'; // Đảm bảo rằng tệp này được bao gồm đúng cách và chứa mã kết nối cơ sở dữ liệu.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escape các giá trị nhập từ người dùng để bảo mật
    $sodienthoai = $conn->real_escape_string($_POST['sodienthoai']);
    $ho = $conn->real_escape_string($_POST['ho']);
    $ten = $conn->real_escape_string($_POST['ten']);
    $email = $conn->real_escape_string($_POST['email']);
    $matkhau = $conn->real_escape_string($_POST['matkhau']);

    // Chèn dữ liệu vào cơ sở dữ liệu MySQL
    $sql = "INSERT INTO users (sodienthoai, ho, ten, email, matkhau) 
            VALUES ('$sodienthoai', '$ho', '$ten', '$email', '$matkhau')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index1.php");
        exit();
    } else {
        echo "Đăng ký thất bại: " . $conn->error;
    }
}

$conn->close();
