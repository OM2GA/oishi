<?php
require "db.php";

try {
    if (!isset($_GET["id"])) {
        echo json_encode(["error" => "ID manquant"]);
        exit;
    }

    $id = $_GET["id"];

    $stmt = $pdo->prepare("SELECT * FROM box WHERE id_box = ?");
    $stmt->execute([$id]);
    $box = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$box) {
        echo json_encode(["error" => "Box introuvable"]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT aliment.nom AS nom, box_aliment.quantite AS quantite
        FROM box_aliment
        JOIN aliment ON aliment.id_aliment = box_aliment.id_aliment
        WHERE box_aliment.id_box = ?
    ");
    $stmt->execute([$id]);
    $aliments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("
        SELECT saveur.nom
        FROM box_saveur
        JOIN saveur ON saveur.id_saveur = box_saveur.id_saveur
        WHERE box_saveur.id_box = ?
    ");
    $stmt->execute([$id]);
    $saveurs = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), "nom");

    $result = [
        "id"       => $box["id_box"],
        "image"    => $box["image"],
        "nom"      => $box["nom"],
        "prix"     => $box["prix"],
        "aliments" => $aliments,
        "saveurs"  => $saveurs
    ];

    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["error" => "Connexion failed"]);
}
