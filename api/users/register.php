<?php
require "../db.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data["nom"]) ||
        !isset($data["email"]) ||
        !isset($data["password"])
    ) {
        echo json_encode(["error" => "Données manquantes"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id_client FROM client WHERE email = ?");
    $stmt->execute([$data["email"]]);

    if ($stmt->fetch()) {
        echo json_encode(["error" => "Email déjà utilisé"]);
        exit;
    }

    $password = password_hash($data["password"], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO client (nom, email, password)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([
        $data["nom"],
        $data["email"],
        $password
    ]);

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    echo json_encode(["error" => "Connexion failed"]);
}
