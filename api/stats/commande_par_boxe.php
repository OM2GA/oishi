<?php
require_once("../db.php");

$sql = "SELECT box.nom, SUM(ligne_commande.quantite) AS total FROM ligne_commande
        JOIN box ON box.id_box = ligne_commande.id_box JOIN commande ON commande.id_commande = ligne_commande.id_commande
        WHERE commande.statut = 'terminée' GROUP BY box.id_box ORDER BY total DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result, JSON_UNESCAPED_UNICODE);
