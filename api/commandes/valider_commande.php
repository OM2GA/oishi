<?php
require_once("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id_commande = $data["id_commande"] ?? null;

if (!$id_commande) {
  echo json_encode(["error" => "id de commande manquant"]);
  exit;
}

$sql = "SELECT box.prix, ligne_commande.quantite FROM ligne_commande JOIN box ON box.id_box = ligne_commande.id_box WHERE ligne_commande.id_commande = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$id_commande]);
$panier = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($panier) === 0) {
  echo json_encode(["error" => "Le panier est vide"]);
  exit;
}

$total = 0;

foreach ($panier as $item) {
  $total += $item["prix"] * $item["quantite"];
}

$total = round($total, 2);

$sql = "UPDATE commande SET montant_total = ?, statut = 'terminée', date_commande = NOW() WHERE id_commande = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$total, $id_commande]);

echo json_encode([
  "success" => true,
  "total" => $total
], JSON_UNESCAPED_UNICODE);