-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 04 jan. 2026 à 16:58
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sushi`
--

-- --------------------------------------------------------

--
-- Structure de la table `aliment`
--

CREATE TABLE `aliment` (
  `id_aliment` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliment`
--

INSERT INTO `aliment` (`id_aliment`, `nom`) VALUES
(1, 'California Saumon Avocat'),
(2, 'Sushi Saumon'),
(3, 'Spring Avocat Cheese'),
(4, 'California pacific'),
(5, 'Edamame/Salade de chou'),
(6, 'Maki Salmon Roll'),
(7, 'Spring Saumon Avocat'),
(8, 'Maki Cheese Avocat'),
(9, 'Sushi Thon'),
(10, 'California Thon Avocat'),
(11, 'Edamame / Salade de chou'),
(12, 'California Thon Cuit Avocat'),
(13, 'Sando Chicken Katsu'),
(14, 'Sando Salmon Aburi'),
(15, 'Maki Salmon'),
(16, 'California Crevette'),
(17, 'California Chicken Katsu'),
(18, 'Spring tataki Saumon'),
(19, 'Signature Dragon Roll'),
(20, 'California French Touch'),
(21, 'California French salmon'),
(22, 'California Yellowtail Ponzu'),
(23, 'Signature Rock\'n Roll'),
(24, 'California Pacific'),
(25, 'Sushi Salmon'),
(26, 'Sushi Saumon Tsukudani');

-- --------------------------------------------------------

--
-- Structure de la table `box`
--

CREATE TABLE `box` (
  `id_box` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `prix` decimal(6,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box`
--

INSERT INTO `box` (`id_box`, `nom`, `description`, `prix`, `image`) VALUES
(1, 'Tasty Blend', 'Tasty Blend', 12.50, 'tasty-blend'),
(2, 'Amateur Mix', 'Amateur Mix', 15.90, 'amateur-mix'),
(3, 'Saumon Original', 'Saumon Original', 12.50, 'saumon-original'),
(4, 'Salmon Lovers', 'Salmon Lovers', 15.90, 'salmon-lovers'),
(5, 'Salmon Classic', 'Salmon Classic', 15.90, 'salmon-classic'),
(6, 'Master Mix', 'Master Mix', 15.90, 'master-mix'),
(7, 'Sunrise', 'Sunrise', 15.90, 'sunrise'),
(8, 'Sando Box Chicken Katsu', 'Sando Box Chicken Katsu', 15.90, 'sando-box-chicken-katsu'),
(9, 'Sando Box Salmon Aburi', 'Sando Box Salmon Aburi', 15.90, 'sando-box-salmon-aburi'),
(10, 'Super Salmon', 'Super Salmon', 19.90, 'super-salmon'),
(11, 'California Dream', 'California Dream', 19.90, 'california-dream'),
(12, 'Gourmet Mix', 'Gourmet Mix', 24.50, 'gourmet-mix'),
(13, 'Fresh Mix', 'Fresh Mix', 24.50, 'fresh-mix');

-- --------------------------------------------------------

--
-- Structure de la table `box_aliment`
--

CREATE TABLE `box_aliment` (
  `id_box` int(11) NOT NULL,
  `id_aliment` int(11) NOT NULL,
  `quantite` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_aliment`
--

INSERT INTO `box_aliment` (`id_box`, `id_aliment`, `quantite`) VALUES
(1, 1, 3.00),
(1, 2, 3.00),
(1, 3, 3.00),
(1, 4, 3.00),
(1, 5, 1.00),
(2, 1, 3.00),
(2, 5, 1.00),
(2, 6, 3.00),
(2, 7, 3.00),
(2, 8, 6.00),
(3, 1, 6.00),
(3, 2, 5.00),
(3, 5, 1.00),
(4, 1, 6.00),
(4, 2, 6.00),
(4, 5, 1.00),
(4, 7, 6.00),
(5, 2, 10.00),
(5, 5, 1.00),
(6, 1, 3.00),
(6, 2, 4.00),
(6, 9, 2.00),
(6, 10, 3.00),
(6, 11, 1.00),
(7, 1, 6.00),
(7, 6, 6.00),
(7, 11, 1.00),
(7, 12, 6.00),
(8, 1, 6.00),
(8, 6, 6.00),
(8, 11, 1.00),
(8, 12, 6.00),
(8, 13, 0.50),
(9, 1, 6.00),
(9, 11, 1.00),
(9, 12, 6.00),
(9, 14, 0.50),
(10, 1, 6.00),
(10, 6, 6.00),
(10, 7, 6.00),
(10, 11, 1.00),
(10, 15, 6.00),
(11, 1, 6.00),
(11, 11, 1.00),
(11, 12, 6.00),
(11, 16, 6.00),
(11, 17, 6.00),
(12, 11, 1.00),
(12, 18, 6.00),
(12, 19, 4.00),
(12, 20, 3.00),
(12, 21, 6.00),
(12, 22, 3.00),
(13, 6, 6.00),
(13, 11, 1.00),
(13, 23, 4.00),
(13, 24, 6.00),
(13, 25, 4.00),
(13, 26, 2.00);

-- --------------------------------------------------------

--
-- Structure de la table `box_saveur`
--

CREATE TABLE `box_saveur` (
  `id_box` int(11) NOT NULL,
  `id_saveur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_saveur`
--

INSERT INTO `box_saveur` (`id_box`, `id_saveur`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 4),
(5, 1),
(6, 1),
(6, 2),
(6, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 6),
(9, 1),
(9, 2),
(9, 5),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(11, 1),
(11, 2),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(12, 1),
(12, 2),
(12, 6),
(12, 7),
(12, 9),
(12, 10),
(13, 1),
(13, 2),
(13, 3),
(13, 5),
(13, 7);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `prenom`, `nom`, `email`, `password`, `telephone`, `adresse`, `token`) VALUES
(1, 'Administrateur', 'admin', 'admin@admin.com', '$2y$10$ky.Ayb2N.DhxbHuumvgCQOjiKHkyIB8dBZhry9pQNwIOTHS6P6GZi', '0608090102', '8 rue de meaux', '6964a17747f4d05b4903147caff88ed2e4d900f5021169ac091d751d9533b5d7');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `montant_total` decimal(8,2) DEFAULT NULL,
  `date_commande` date NOT NULL,
  `statut` enum('en cours','terminée','annulée') DEFAULT 'en cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `id_client`, `montant_total`, `date_commande`, `statut`) VALUES
(19, 1, 28.40, '2026-01-04', 'terminée'),
(20, 1, 31.80, '2026-01-04', 'terminée'),
(21, 1, 31.80, '2026-01-04', 'terminée'),
(22, 1, 63.60, '2026-01-04', 'terminée'),
(23, 1, 0.00, '2026-01-04', 'en cours');

-- --------------------------------------------------------

--
-- Structure de la table `ligne_commande`
--

CREATE TABLE `ligne_commande` (
  `id_commande` int(11) NOT NULL,
  `id_box` int(11) NOT NULL,
  `quantite` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ligne_commande`
--

INSERT INTO `ligne_commande` (`id_commande`, `id_box`, `quantite`) VALUES
(19, 2, 1),
(19, 3, 1),
(20, 5, 1),
(20, 7, 1),
(21, 5, 1),
(21, 7, 1),
(22, 2, 1),
(22, 4, 2),
(22, 6, 1),
(23, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `saveur`
--

CREATE TABLE `saveur` (
  `id_saveur` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `saveur`
--

INSERT INTO `saveur` (`id_saveur`, `nom`) VALUES
(1, 'saumon'),
(2, 'avocat'),
(3, 'cheese'),
(4, 'coriandre'),
(5, 'thon'),
(6, 'viande'),
(7, 'spicy'),
(8, 'crevette'),
(9, 'coriande'),
(10, 'seriole lalandi');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aliment`
--
ALTER TABLE `aliment`
  ADD PRIMARY KEY (`id_aliment`);

--
-- Index pour la table `box`
--
ALTER TABLE `box`
  ADD PRIMARY KEY (`id_box`);

--
-- Index pour la table `box_aliment`
--
ALTER TABLE `box_aliment`
  ADD PRIMARY KEY (`id_box`,`id_aliment`),
  ADD KEY `fk_box_aliment_aliment` (`id_aliment`);

--
-- Index pour la table `box_saveur`
--
ALTER TABLE `box_saveur`
  ADD PRIMARY KEY (`id_box`,`id_saveur`),
  ADD KEY `fk_box_saveur_saveur` (`id_saveur`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD PRIMARY KEY (`id_commande`,`id_box`),
  ADD KEY `id_box` (`id_box`);

--
-- Index pour la table `saveur`
--
ALTER TABLE `saveur`
  ADD PRIMARY KEY (`id_saveur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aliment`
--
ALTER TABLE `aliment`
  MODIFY `id_aliment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `box`
--
ALTER TABLE `box`
  MODIFY `id_box` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `saveur`
--
ALTER TABLE `saveur`
  MODIFY `id_saveur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `box_aliment`
--
ALTER TABLE `box_aliment`
  ADD CONSTRAINT `fk_box_aliment_aliment` FOREIGN KEY (`id_aliment`) REFERENCES `aliment` (`id_aliment`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_box_aliment_box` FOREIGN KEY (`id_box`) REFERENCES `box` (`id_box`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `box_saveur`
--
ALTER TABLE `box_saveur`
  ADD CONSTRAINT `fk_box_saveur_box` FOREIGN KEY (`id_box`) REFERENCES `box` (`id_box`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_box_saveur_saveur` FOREIGN KEY (`id_saveur`) REFERENCES `saveur` (`id_saveur`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD CONSTRAINT `ligne_commande_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ligne_commande_ibfk_2` FOREIGN KEY (`id_box`) REFERENCES `box` (`id_box`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
