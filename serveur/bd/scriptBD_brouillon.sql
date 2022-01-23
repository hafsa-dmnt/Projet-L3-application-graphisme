SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+01:00";

--
-- Base de données: `getrandomart`
--

/*CREATE USER 'getrandomart_user'@'localhost' IDENTIFIED BY 'getrandomart_pass';

CREATE DATABASE IF NOT EXISTS `getrandomart_db` CHARACTER SET utf8 COLLATE utf8_unicode_ci;

GRANT SELECT, INSERT, UPDATE, DELETE ON `getrandomart_db`.* TO "getrandomart_user"@"localhost";

USE `getrandomart_db`;*/

--
-- Base de données: `getrandomart_db`
--

-- --------------------------------------------------------
--
-- Structure de la table `user`
--

CREATE TABLE utilisateur (
  user_pseudo char(30) NOT NULL,
  user_ID SERIAL NOT NULL,
  user_email char(100) NOT NULL,
  user_mdp char(100) NOT NULL,
  user_pdp char(100) NOT NULL,
  user_bio char(100) NOT NULL DEFAULT 'voici ma bio.',
  PRIMARY KEY (user_ID)
);

INSERT INTO utilisateur (user_ID, user_pseudo, user_email, user_mdp, user_pdp, user_bio) VALUES
('1', 'user1', 'user1@gmail.com', 'user1', '../images/defaultpicture.jpg', '1'),
('2','user2', 'user2@gmail.com', 'user2', '../images/defaultpicture.jpg', '2'),
('3','user3', 'user3@gmail.com', 'user3', '../images/defaultpicture.jpg', '3'),
('4','user4', 'user4@gmail.com', 'user4', '../images/defaultpicture.jpg', '4'),
('5','user5', 'user5@gmail.com', 'user5', '../images/defaultpicture.jpg', '5'),
('6','user6', 'user6@gmail.com', 'user6', '../images/defaultpicture.jpg', '6'),
('7','user7', 'user7@gmail.com', 'user7', '../images/defaultpicture.jpg', '7'),
('8','user8', 'user8@gmail.com', 'user8', '../images/defaultpicture.jpg', '8'),
('9','user9', 'user9@gmail.com', 'user9', '../images/defaultpicture.jpg', '9');
-- Contenu de la table `user`
--



-- --------------------------------------------------------
--
-- Structure de la table `defi`
--

CREATE TABLE defi (
  defi_themeID SERIAL NOT NULL,
  defi_paletteID int(11) unsigned NOT NULL DEFAULT '0',
  defi_date char(255) NOT NULL,
  PRIMARY KEY (defi_date),
  FOREIGN KEY(defi_themeID) REFERENCES theme(theme_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(defi_paletteID) REFERENCES palette(palette_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

--
-- Contenu de la table `defi`
--

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE theme (
  theme_ID SERIAL NOT NULL ,
  theme_nom char(30) NOT NULL DEFAULT 'theme',
  PRIMARY KEY (theme_ID)
);

--
-- Contenu de la table `theme`
--

INSERT INTO theme (theme_id, theme_nom) VALUES
(1, 'carte'),
(2,'robe'),
(3,'foret'),
(4,'cadenas'),
(5,'steampunk'),
(6,'robot'),
(7,'toxic'),
(8,'poison'),
(9,'vase'),
(10,'animaux'),
(11,'lac'),
(12,'coussin'),
(13,'cour'),
(14,'linge'),
(15,'jardin abandonné'),
(16,'créature'),
(17,'vampire'),
(18,'arbre'),
(19,'lit'),
(20,'magie'),
(21,'organe'),
(22,'balançoire'),
(23,'route'),
(24,'fenêtre'),
(25,'alcool'),
(26,'parc'),
(27,'pull'),
(28,"Dans l'océan, la mer"),
(29, 'oiseaux'),
(30,'plante carnivore'),
(31,'parking'),
(32,'pirate'),
(33,'herbier'),
(34,'porte'),
(35,'casserole'),
(36,'ordinateur'),
(37,'chaise'),
(38,'zibeline'),
(39,'drogue'),
(40,'café'),
(41,'main'),
(42,'miroir'),
(43,'ange'),
(44,'espace'),
(45,'bulle'),
(46,'pantalon'),
(47,'corps'),
(48,'fleur'),
(49,'maison'),
(50,'électronique'),
(51,'nature'),
(52,'liberté'),
(53,'chemin'),
(54,'réparation'),
(55,'bois'),
(56,'matériel'),
(57,'musique'),
(58,'ancien'),
(59,'trésor'),
(60,'antique'),
(61,'mouvement'),
(62,'statique'),
(63,'fin du monde'),
(64,'joie'),
(65,'tristesse'),
(66,'colère'),
(67,'enthousiasme'),
(68,'mélancolie'),
(69,'résilience' ),
(70,'urbain'),
(71,'cartoon'),
(72,'réaliste');

-- --------------------------------------------------------

--
-- Structure de la table `palette`
--

CREATE TABLE palette (
  palette_ID int(11) unsigned NOT NULL AUTO_INCREMENT,
  palette_nom char(255) COLLATE utf8_general_ci NOT NULL DEFAULT ''
  PRIMARY KEY (palette_ID)
);

--
-- Contenu de la table `palette`
--

INSERT INTO `palette` (`palette_ID`, `palette_nom`) VALUES
(1,  "#7E4F03,#12EC73,#988208,#1E1499,#A3981B"),
(2, "#58D1D5,#8EFE2A,#C52356,#E04375,#0973A7,#3A94CA"),
(3, "#6CAC07,#8EC5E5,#A7FA2A,#C43054" ),
(4, "#8147D3,#B16785,#DE87B1,#F8B6E1"),
(5, "#DB0D4D,#10285E,#3A3C71,#705072,#8E738A,#B494BC"),
(6, "#6AAA9A,#A0D304,#C5F21F,#E62351"),
(7, "#3C0442,#722245,#A64C7C,#C9608A,#F57FAE,#1AAFC9"),
(8, "#969533,#CCCCEA,#EAEE15,#120D35,#432257,#5C466E"),
(9, "#2E436A,#645782,#8E80B4,#C3B7E8" );


-- --------------------------------------------------------



-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `publication_date`,
  `publication_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `publication_userID` int(11) unsigned NOT NULL,
  `publication_theme` char(255) unsigned NOT NULL,
  `publication_dateDefi`,
  `publication_image` char(255) COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`publication_ID`),
  FOREIGN KEY(`publication_userID`) REFERENCES `user`(`user_ID`) ON UPDATE CASCADE ON DELETE RESTRICT, 
  FOREIGN KEY(`publication_dateDefi`) REFERENCES `defi`(`defi_date`) ON UPDATE CASCADE ON DELETE RESTRICT, 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=14;

--
-- Contenu de la table `publication`
--


-- --------------------------------------------------------

--
-- Structure de la table `theme_list`
--

CREATE TABLE `theme_list` (
  `tl_userID` int(11) unsigned NOT NULL,
  `tl_themeID` int(11) unsigned NOT NULL, 
  `tl_nom` char(255) COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tl_nom`),
  FOREIGN KEY(`tl_userID`) REFERENCES `user`(`user_ID`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`tl_themeID`) REFERENCES `theme`(`theme_ID`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=15 ;

--
-- Contenu de la table `theme_list`
--

INSERT INTO `theme_list` (`tl_userID`, `tl_themeID`, `tl_nom`) VALUES
(1, 9,'peinture'),
(2, 12, 'peinture'),
(3, 9, 'peinture'),
(4, 13, 'vent'),
(5, 13, 'vent'),
(6, 13, 'listerandom'),
(3, 13, 'jesuisuneliste'),
(3, 32, 'jsuisuneliste'),
(2, 13, 'jsuisuneliste'),
(1, 13, 'jsuisuneliste'),
(1, 2, 'jsuisuneliste'),
(1, 9, 'jsuisuneliste'),
(1, 36, 'jsuisuneliste'),
(1, 21, 'jsuisuneliste');

-- --------------------------------------------------------

--
-- Structure de la table `palette_list`
--

CREATE TABLE `palette_list` (
  `pl_userID` int(11) unsigned NOT NULL,
  `pl_paletteID` int(11) unsigned NOT NULL, 
  `pl_nom` char(255) COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`pl_nom`),
  FOREIGN KEY(`pl_userID`) REFERENCES `user`(`user_ID`) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY(`pl_paletteID`) REFERENCES `palette`(`palette_ID`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Contenu de la table `palette_list`
--

INSERT INTO `palette_list` (`pl_userID`, `pl_paletteID`, `pl_nom`) VALUES
(1, 22, 1),
(1, 40, 2),
(1, 41, 3),
(1, 26, 1),
(3, 14, 1),
(3, 22, 1),
(3, 40, 2),
(3, 12, 1),
(4, 14, 2),
(4, 22, 1),
(5, 14, 1),
(5, 41, 2),
(2, 12, 2),
(2, 14, 1),
(2, 22, 1),
(2, 40, 3),
(2, 4, 1),
(6, 2, 1),
(7, 3, 2),
(7, 4, 1),
(8, 20, 2),
(9, 14, 2),
(9, 15, 2),
(10, 2, 3),
(11, 8, 2),
(12, 7, 3),
(12, 17, 2),
(12, 19, 5),
(13, 4, 1),
(14, 12, 3);



/*

-- --------------------------------------------------------

--
-- Structure de la table `followers_list`
--

CREATE TABLE `followers_list` (
  `user_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `follower_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_ID`),
  FOREIGN KEY(`follower_ID`) REFERENCES `user`(`user_ID`) ON UPDATE CASCADE ON DELETE RESTRICT,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Contenu de la table `followers_list`
--

INSERT INTO `palette_list` (`pl_ID`, `pl_userID`, `pl_paletteID`, `pl_nom`) VALUES
(1, 22, 1),
(1, 40, 2),
(1, 41, 3),
(1, 26, 1),
(3, 14, 1),
(3, 22, 1),
(3, 40, 2),
(3, 12, 1),
(4, 14, 2),
(4, 22, 1),
(5, 14, 1),
(5, 41, 2),
(2, 12, 2),
(2, 14, 1),
(2, 22, 1),
(2, 40, 3),
(2, 4, 1),
(6, 2, 1),
(7, 3, 2),
(7, 4, 1),
(8, 20, 2),
(9, 14, 2),
(9, 15, 2),
(10, 2, 3),
(11, 8, 2),
(12, 7, 3),
(12, 17, 2),
(12, 19, 5),
(13, 4, 1),
(14, 12, 3);

*/
COMMIT;
