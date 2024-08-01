<?php
$servername = "localhost";
$database = "Coffee";  // Tên cơ sở dữ liệu
$username = "root";
$password = "";

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
echo "Kết nối thành công";
