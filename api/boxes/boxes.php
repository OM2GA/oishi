<?php
require "../db.php";

try {
    // recupere tout la table box
    $stmt = $pdo->query("SELECT * FROM box");
    $boxes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($boxes as $box) {
        $id = $box["id_box"];

        // ---- Aliments ----
        $stmt = $pdo->prepare("SELECT aliment.nom AS nom, box_aliment.quantite AS quantite FROM box_aliment JOIN aliment 
        ON aliment.id_aliment = box_aliment.id_aliment WHERE box_aliment.id_box = ?");

        $stmt->execute([$id]);
        $aliments = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // les saveurs
        $stmt = $pdo->prepare("SELECT saveur.nom FROM box_saveur
            JOIN saveur ON saveur.id_saveur = box_saveur.id_saveur WHERE box_saveur.id_box = ?
        ");
        $stmt->execute([$id]);
        $saveurs = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), "nom");

        $result[] = [
            "id"       => $box["id_box"],
            "nom"      => $box["nom"],
            "prix"     => $box["prix"],
            "image"    => $box["image"],
            "aliments" => $aliments,
            "saveurs"  => $saveurs
        ];
    }

    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["error" => "Connexion failed"]);
}
