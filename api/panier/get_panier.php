<?php
require "../db.php";

header('Content-Type: application/json');

if (!isset($_GET["id_client"])) {
    http_response_code(400);
    echo json_encode(["error" => "id_client manquant"]);
    exit;
}

$id_client = (int)$_GET["id_client"];

/*Récupérer la commande actuel du client */
$stmt = $pdo->prepare("
    SELECT id_commande
    FROM commande
    WHERE id_client = ?
    ORDER BY id_commande DESC
    LIMIT 1
");
$stmt->execute([$id_client]);
$commande = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$commande) {
    echo json_encode([
        "panier" => [],
        "total" => 0
    ]);
    exit;
}

$id_commande = $commande["id_commande"];

/*récupérer les boxes du panier */
$stmt = $pdo->prepare("SELECT box.id_box, box.nom, box.prix, ligne_commande.quantite FROM ligne_commande JOIN box ON box.id_box = ligne_commande.id_box WHERE ligne_commande.id_commande = ? ");
$stmt->execute([$id_commande]);
$panier = $stmt->fetchAll(PDO::FETCH_ASSOC);

/*calcule prix total du panier*/
$total = 0;
foreach ($panier as $item) {
    $total += $item["prix"] * $item["quantite"];
}

echo json_encode([
    "id_commande" => $id_commande,
    "panier" => $panier,
    "total" => $total
]);
