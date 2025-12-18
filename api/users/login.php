<?php
require "../db.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data["email"]) || !isset($data["password"])) {
        http_response_code(400);
        echo json_encode(["error" => "Données manquantes"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$data["email"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(["error" => "Utilisateur introuvable"]);
        exit;
    }

    if (!password_verify($data["password"], $user["password"])) {
        http_response_code(401);
        echo json_encode(["error" => "Mot de passe incorrect"]);
        exit;
    }

  //token
    $token = bin2hex(random_bytes(32));

    $stmt = $pdo->prepare("UPDATE client SET token = ? WHERE id_client = ?");
    $stmt->execute([$token, $user["id_client"]]);

    echo json_encode([
        "id" => $user["id_client"],
        "nom" => $user["nom"],
        "email" => $user["email"],
        "token" => $token
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connexion failed"]);
}
