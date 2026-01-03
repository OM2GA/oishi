<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require "../db.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["token"])) {
        http_response_code(400);
        echo json_encode(["error" => "Token manquant"]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE client SET token = NULL WHERE token = ?");
    $stmt->execute([$data["token"]]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Déconnexion réussie"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Token invalide ou déjà déconnecté"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur: " . $e->getMessage()]);
}
