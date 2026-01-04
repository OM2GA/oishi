<?php
require "../db.php"; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["id_client"]) || empty($data["id_box"])) {
    http_response_code(400);
    echo json_encode(["error" => "Informations manquantes"]);
    exit;
}

$id_client = (int)$data["id_client"];
$id_box = (int)$data["id_box"];
$id_commande = isset($data["id_commande"]) ? (int)$data["id_commande"] : null;

if ($id_commande) {
    $stmt = $pdo->prepare("SELECT id_commande FROM commande WHERE id_commande = ? AND id_client = ? AND statut = 'en cours'");
    $stmt->execute([$id_commande, $id_client]);
    if (!$stmt->fetch()) {
        $id_commande = null;
    }
}

if (!$id_commande) {
    $stmt = $pdo->prepare("
        INSERT INTO commande (id_client, date_commande, montant_total, statut)
        VALUES (?, CURDATE(), 0, 'en cours')
    ");
    $stmt->execute([$id_client]);
    $id_commande = $pdo->lastInsertId();
}

$stmt = $pdo->prepare("SELECT id_box FROM ligne_commande WHERE id_commande = ? AND id_box = ?
");
$stmt->execute([$id_commande, $id_box]);

if ($stmt->fetch()) {
    $stmt = $pdo->prepare("UPDATE ligne_commande SET quantite = quantite + 1 WHERE id_commande = ? AND id_box = ?");
    $stmt->execute([$id_commande, $id_box]);
} else {
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
?>