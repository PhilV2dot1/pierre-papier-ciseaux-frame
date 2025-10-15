// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PierrePapierCiseauxSolo {
    
    enum Choix { Pierre, Papier, Ciseaux }
    enum Resultat { Victoire, Defaite, Egalite }
    
    struct Joueur {
        string nom;
        uint256 victoires;
        uint256 defaites;
        uint256 egalites;
        uint256 serieActuelle;
        uint256 meilleureSerie;
        bool existe;
    }
    
    struct Partie {
        Choix choixJoueur;
        Choix choixOrdinateur;
        Resultat resultat;
        uint256 timestamp;
    }
    
    mapping(address => Joueur) public joueurs;
    mapping(address => Partie[]) public historiqueParties;
    
    // Classement global
    address[] public classement;
    
    // Événements
    event JoueurCree(address indexed joueur, string nom);
    event PartieJouee(address indexed joueur, string choixJoueur, string choixOrdinateur, string resultat);
    event SerieBattue(address indexed joueur, uint256 nouvelleSerie);
    event VictoireParfaite(address indexed joueur, uint256 nombreVictoires);
    
    // Créer un profil de joueur
    function creerProfil(string memory _nom) public {
        require(!joueurs[msg.sender].existe, "Vous avez deja un profil");
        require(bytes(_nom).length > 0, "Le nom ne peut pas etre vide");
        
        joueurs[msg.sender] = Joueur({
            nom: _nom,
            victoires: 0,
            defaites: 0,
            egalites: 0,
            serieActuelle: 0,
            meilleureSerie: 0,
            existe: true
        });
        
        classement.push(msg.sender);
        
        emit JoueurCree(msg.sender, _nom);
    }
    
    // Jouer une partie
    function jouer(uint256 _choix) public returns (string memory) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        require(_choix <= 2, "Choix invalide (0=Pierre, 1=Papier, 2=Ciseaux)");
        
        Joueur storage joueur = joueurs[msg.sender];
        
        // Choix du joueur
        Choix choixJoueur = Choix(_choix);
        
        // Génération aléatoire du choix de l'ordinateur
        Choix choixOrdinateur = Choix(genererChoixAleatoire());
        
        // Déterminer le résultat
        Resultat resultat = determinerResultat(choixJoueur, choixOrdinateur);
        
        // Mettre à jour les statistiques
        if (resultat == Resultat.Victoire) {
            joueur.victoires++;
            joueur.serieActuelle++;
            
            // Vérifier si c'est une nouvelle meilleure série
            if (joueur.serieActuelle > joueur.meilleureSerie) {
                joueur.meilleureSerie = joueur.serieActuelle;
                emit SerieBattue(msg.sender, joueur.meilleureSerie);
            }
            
            // Vérifier les milestones
            if (joueur.victoires % 10 == 0) {
                emit VictoireParfaite(msg.sender, joueur.victoires);
            }
        } else if (resultat == Resultat.Defaite) {
            joueur.defaites++;
            joueur.serieActuelle = 0;
        } else {
            joueur.egalites++;
        }
        
        // Enregistrer la partie dans l'historique
        historiqueParties[msg.sender].push(Partie({
            choixJoueur: choixJoueur,
            choixOrdinateur: choixOrdinateur,
            resultat: resultat,
            timestamp: block.timestamp
        }));
        
        // Émettre l'événement
        string memory choixJoueurStr = choixVersString(choixJoueur);
        string memory choixOrdinateurStr = choixVersString(choixOrdinateur);
        string memory resultatStr = resultatVersString(resultat);
        
        emit PartieJouee(msg.sender, choixJoueurStr, choixOrdinateurStr, resultatStr);
        
        // Retourner le message de résultat
        return string(abi.encodePacked(
            "Vous: ", choixJoueurStr, 
            " | Ordinateur: ", choixOrdinateurStr, 
            " | ", resultatStr
        ));
    }
    
    // Générer un choix aléatoire pour l'ordinateur
    function genererChoixAleatoire() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            historiqueParties[msg.sender].length
        ))) % 3;
    }
    
    // Déterminer le résultat d'une partie
    function determinerResultat(Choix _joueur, Choix _ordinateur) private pure returns (Resultat) {
        if (_joueur == _ordinateur) {
            return Resultat.Egalite;
        }
        
        if (
            (_joueur == Choix.Pierre && _ordinateur == Choix.Ciseaux) ||
            (_joueur == Choix.Papier && _ordinateur == Choix.Pierre) ||
            (_joueur == Choix.Ciseaux && _ordinateur == Choix.Papier)
        ) {
            return Resultat.Victoire;
        }
        
        return Resultat.Defaite;
    }
    
    // Convertir un choix en string
    function choixVersString(Choix _choix) private pure returns (string memory) {
        if (_choix == Choix.Pierre) return "Pierre";
        if (_choix == Choix.Papier) return "Papier";
        return "Ciseaux";
    }
    
    // Convertir un résultat en string
    function resultatVersString(Resultat _resultat) private pure returns (string memory) {
        if (_resultat == Resultat.Victoire) return "VICTOIRE !";
        if (_resultat == Resultat.Defaite) return "Defaite";
        return "Egalite";
    }
    
    // Obtenir les statistiques du joueur
    function obtenirStats() public view returns (
        string memory nom,
        uint256 victoires,
        uint256 defaites,
        uint256 egalites,
        uint256 totalParties,
        uint256 tauxVictoire,
        uint256 serieActuelle,
        uint256 meilleureSerie
    ) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        
        Joueur storage joueur = joueurs[msg.sender];
        uint256 total = joueur.victoires + joueur.defaites + joueur.egalites;
        uint256 taux = total > 0 ? (joueur.victoires * 10000) / total : 0;
        
        return (
            joueur.nom,
            joueur.victoires,
            joueur.defaites,
            joueur.egalites,
            total,
            taux, // Pourcentage * 100 (ex: 7532 = 75.32%)
            joueur.serieActuelle,
            joueur.meilleureSerie
        );
    }
    
    // Obtenir les statistiques d'un autre joueur
    function obtenirStatsJoueur(address _joueur) public view returns (
        string memory nom,
        uint256 victoires,
        uint256 defaites,
        uint256 egalites,
        uint256 meilleureSerie
    ) {
        require(joueurs[_joueur].existe, "Ce joueur n'existe pas");
        
        Joueur storage joueur = joueurs[_joueur];
        return (
            joueur.nom,
            joueur.victoires,
            joueur.defaites,
            joueur.egalites,
            joueur.meilleureSerie
        );
    }
    
    // Obtenir l'historique des dernières parties (max 10)
    function obtenirHistorique(uint256 _nombre) public view returns (
        string[] memory choixJoueur,
        string[] memory choixOrdinateur,
        string[] memory resultats
    ) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        require(_nombre > 0 && _nombre <= 10, "Demander entre 1 et 10 parties");
        
        Partie[] storage historique = historiqueParties[msg.sender];
        uint256 debut = historique.length > _nombre ? historique.length - _nombre : 0;
        uint256 taille = historique.length - debut;
        
        choixJoueur = new string[](taille);
        choixOrdinateur = new string[](taille);
        resultats = new string[](taille);
        
        for (uint256 i = 0; i < taille; i++) {
            Partie storage partie = historique[debut + i];
            choixJoueur[i] = choixVersString(partie.choixJoueur);
            choixOrdinateur[i] = choixVersString(partie.choixOrdinateur);
            resultats[i] = resultatVersString(partie.resultat);
        }
        
        return (choixJoueur, choixOrdinateur, resultats);
    }
    
    // Obtenir le nombre total de parties jouées
    function obtenirNombreParties() public view returns (uint256) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        return historiqueParties[msg.sender].length;
    }
    
    // Obtenir le classement des meilleurs joueurs (top 10)
    function obtenirClassement() public view returns (
        address[] memory adresses,
        string[] memory noms,
        uint256[] memory victoires,
        uint256[] memory meilleuresSeries
    ) {
        uint256 taille = classement.length < 10 ? classement.length : 10;
        
        adresses = new address[](taille);
        noms = new string[](taille);
        victoires = new uint256[](taille);
        meilleuresSeries = new uint256[](taille);
        
        // Créer des copies pour le tri
        address[] memory tempAdresses = new address[](classement.length);
        uint256[] memory tempVictoires = new uint256[](classement.length);
        
        for (uint256 i = 0; i < classement.length; i++) {
            tempAdresses[i] = classement[i];
            tempVictoires[i] = joueurs[classement[i]].victoires;
        }
        
        // Tri par sélection
        for (uint256 i = 0; i < taille; i++) {
            uint256 maxIndex = i;
            for (uint256 j = i + 1; j < tempAdresses.length; j++) {
                if (tempVictoires[j] > tempVictoires[maxIndex]) {
                    maxIndex = j;
                }
            }
            
            if (maxIndex != i) {
                (tempAdresses[i], tempAdresses[maxIndex]) = (tempAdresses[maxIndex], tempAdresses[i]);
                (tempVictoires[i], tempVictoires[maxIndex]) = (tempVictoires[maxIndex], tempVictoires[i]);
            }
            
            adresses[i] = tempAdresses[i];
            noms[i] = joueurs[tempAdresses[i]].nom;
            victoires[i] = tempVictoires[i];
            meilleuresSeries[i] = joueurs[tempAdresses[i]].meilleureSerie;
        }
        
        return (adresses, noms, victoires, meilleuresSeries);
    }
    
    // Obtenir votre rang dans le classement
    function obtenirRang() public view returns (uint256) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        
        uint256 mesVictoires = joueurs[msg.sender].victoires;
        uint256 rang = 1;
        
        for (uint256 i = 0; i < classement.length; i++) {
            if (joueurs[classement[i]].victoires > mesVictoires) {
                rang++;
            }
        }
        
        return rang;
    }
    
    // Réinitialiser les statistiques (garder le profil)
    function reinitialiserStats() public {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        
        Joueur storage joueur = joueurs[msg.sender];
        joueur.victoires = 0;
        joueur.defaites = 0;
        joueur.egalites = 0;
        joueur.serieActuelle = 0;
        joueur.meilleureSerie = 0;
        
        delete historiqueParties[msg.sender];
    }
    
    // Obtenir des statistiques détaillées sur les choix
    function obtenirStatsChoix() public view returns (
        uint256 pierreJouees,
        uint256 papierJouees,
        uint256 ciseauxJouees,
        uint256 pierreGagnees,
        uint256 papierGagnees,
        uint256 ciseauxGagnees
    ) {
        require(joueurs[msg.sender].existe, "Creez d'abord un profil");
        
        Partie[] storage historique = historiqueParties[msg.sender];
        
        for (uint256 i = 0; i < historique.length; i++) {
            Partie storage partie = historique[i];
            
            if (partie.choixJoueur == Choix.Pierre) {
                pierreJouees++;
                if (partie.resultat == Resultat.Victoire) pierreGagnees++;
            } else if (partie.choixJoueur == Choix.Papier) {
                papierJouees++;
                if (partie.resultat == Resultat.Victoire) papierGagnees++;
            } else {
                ciseauxJouees++;
                if (partie.resultat == Resultat.Victoire) ciseauxGagnees++;
            }
        }
        
        return (pierreJouees, papierJouees, ciseauxJouees, pierreGagnees, papierGagnees, ciseauxGagnees);
    }
}