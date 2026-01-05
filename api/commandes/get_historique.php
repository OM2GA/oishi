<?php
require "../db.php";


if (!isset($_GET["id_client"])) {
    http_response_code(400);
    echo json_encode(["error" => "id_client manquant"]);
    exit;
}

$id_client = (int)$_GET["id_client"];


$stmt = $pdo->prepare("SELECT * FROM commande WHERE id_client = ? AND statut = 'terminée' ORDER BY id_commande DESC");
$stmt->execute([$id_client]);
$commandes = $stmt->fetchAll(PDO::FETCH_ASSOC);

$historique = [];

foreach ($commandes as $cmd) {
    $id_com = $cmd['id_commande'];

    $stmt = $pdo->prepare("SELECT id_box, quantite FROM ligne_commande WHERE id_commande = ?");
    $stmt->execute([$id_com]);
    $lignes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $liste_boxes = [];

    foreach ($lignes as $ligne) {
        $stmt = $pdo->prepare("SELECT nom, prix FROM box WHERE id_box = ?");
        $stmt->execute([$ligne['id_box']]);
        $details_box = $stmt->fetch(PDO::FETCH_ASSOC);

        $liste_boxes[] = [
            "nom"      => $details_box['nom'],
            "prix"     => $details_box['prix']*$ligne['quantite'],
            "quantite" => $ligne['quantite']
        ];
    }

    $historique[] = [
        "id_commande"   => $id_com,
        "date_commande" => $cmd['date_commande'],
        "total"         => $cmd['montant_total'],
        "boxes"         => $liste_boxes
    ];
}

echo json_encode(["commandes" => $historique]);