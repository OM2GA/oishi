<?php
require "../db.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data["nom"]) ||
        !isset($data["email"]) ||
        !isset($data["password"]) ||
        !isset($data["telephone"]) ||
        !isset($data["adresse"])
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

    $prenom = isset($data["prenom"]) ? $data["prenom"] : "";
    $password = password_hash($data["password"], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO client (nom, prenom, email, password, telephone, adresse) VALUES (?, ?, ?, ?, ?, ?) ");
    $stmt->execute([
        $data["nom"],
        $prenom,
        $data["email"],
        $password,
        $data["telephone"],
        $data["adresse"]
    ]);

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
