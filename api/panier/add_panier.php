<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["id_client"]) || empty($data["id_box"])) {
    http_response_code(400);
    echo json_encode(["error" => "Informations manquantes"]);
    exit;
}

$id_client = (int)$data["id_client"];
$id_box = (int)$data["id_box"];
$id_commande = $data["id_commande"] ?? null;

// Création de la commande si elle n'existe pas encore
if (!$id_commande) {
    $stmt = $pdo->prepare("
        INSERT INTO commande (id_client, date_commande, montant_total)
        VALUES (?, CURDATE(), 0)
    ");
    $stmt->execute([$id_client]);
    $id_commande = $pdo->lastInsertId();
}

// Vérifier si la box est déjà dans la commande
$stmt = $pdo->prepare("
    SELECT id_box
    FROM ligne_commande
    WHERE id_commande = ? AND id_box = ?
");
$stmt->execute([$id_commande, $id_box]);

if ($stmt->fetch()) {
    // si la box est deja dan sle panier on ajoute 1 a la quantité
    $stmt = $pdo->prepare("
        UPDATE ligne_commande
        SET quantite = quantite + 1
        WHERE id_commande = ? AND id_box = ?
    ");
    $stmt->execute([$id_commande, $id_box]);
} else {
    // si c'est une nouvelle box on ajoute une ligne de commande
    $stmt = $pdo->prepare("
        INSERT INTO ligne_commande (id_commande, id_box, quantite)
        VALUES (?, ?, 1)
    ");
    $stmt->execute([$id_commande, $id_box]);
}

echo json_encode([
    "success" => true,
    "id_commande" => $id_commande
]);