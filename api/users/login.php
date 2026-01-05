<?php
try {
    require "../db.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data["email"]) || !isset($data["password"])) {
        http_response_code(400);
        echo json_encode(["error" => "Données manquantes"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$data["email"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(["error" => "Utilisateur introuvable"]);
        exit;
    }

    if (!password_verify($data["password"], $user["password"])) {
        http_response_code(401);
        echo json_encode(["error" => "Mot de passe incorrect"]);
        exit;
    }

  //token
    $token = bin2hex(random_bytes(32));

    $stmt = $pdo->prepare("UPDATE client SET token = ? WHERE id_client = ?");
    $stmt->execute([$token, $user["id_client"]]);

    // rechercher si une commande de l'utilisateur est en cours pour recuperer son id_commande
    $stmtCommande = $pdo->prepare("SELECT id_commande FROM commande WHERE id_client = ? AND statut = 'en cours' LIMIT 1");
    $stmtCommande->execute([$user["id_client"]]);
    $commandeEncours = $stmtCommande->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "id" => $user["id_client"],
        "nom" => $user["nom"],
        "prenom" => $user["prenom"],
        "email" => $user["email"],
        "token" => $token,
        "id_commande" => $commandeEncours ? $commandeEncours['id_commande'] : null
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
