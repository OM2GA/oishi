<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');

  
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    exit; 
}


$host = "localhost";
$dbname = "sushi";
$user = "root";
$password = ""; // MAMP: "root"; XAMPP:"";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

