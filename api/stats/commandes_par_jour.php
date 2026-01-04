<?php
require_once("../db.php");

header("Content-Type: application/json; charset=UTF-8");

$sql = "
SELECT date_commande AS jour, COUNT(*) AS total
FROM commande
WHERE statut = 'terminée'
ORDER BY jour
";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res, JSON_UNESCAPED_UNICODE);