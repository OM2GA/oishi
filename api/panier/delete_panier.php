<?php
require "../db.php";

header('Content-Type: application/json');

$id_box = isset($_GET['id_box']) ? (int)$_GET['id_box'] : null;
$id_commande = isset($_GET['id_commande']) ? (int)$_GET['id_commande'] : null;

if (!$id_box || !$id_commande) {
    http_response_code(400);
    echo json_encode(["error" => "Données manquantes"]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM ligne_commande WHERE id_commande = ? AND id_box = ?");
$stmt->execute([$id_commande, $id_box]);

echo json_encode(["success" => true]);
