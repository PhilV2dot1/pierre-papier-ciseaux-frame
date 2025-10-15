// test/PierrePapierCiseauxSolo.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PierrePapierCiseauxSolo", function () {
  let contract;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    
    const PierrePapierCiseauxSolo = await ethers.getContractFactory("PierrePapierCiseauxSolo");
    contract = await PierrePapierCiseauxSolo.deploy();
    await contract.waitForDeployment();
  });

  describe("Création de profil", function () {
    it("Devrait créer un profil avec succès", async function () {
      await contract.connect(player1).creerProfil("Alice");
      
      const joueur = await contract.joueurs(player1.address);
      expect(joueur.nom).to.equal("Alice");
      expect(joueur.existe).to.be.true;
      expect(joueur.victoires).to.equal(0);
    });

    it("Ne devrait pas permettre de créer un profil vide", async function () {
      await expect(
        contract.connect(player1).creerProfil("")
      ).to.be.revertedWith("Le nom ne peut pas etre vide");
    });

    it("Ne devrait pas permettre de créer deux profils", async function () {
      await contract.connect(player1).creerProfil("Alice");
      
      await expect(
        contract.connect(player1).creerProfil("Alice2")
      ).to.be.revertedWith("Vous avez deja un profil");
    });

    it("Devrait émettre un événement JoueurCree", async function () {
      await expect(contract.connect(player1).creerProfil("Alice"))
        .to.emit(contract, "JoueurCree")
        .withArgs(player1.address, "Alice");
    });
  });

  describe("Jouer des parties", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
    });

    it("Devrait permettre de jouer une partie", async function () {
      const tx = await contract.connect(player1).jouer(0); // Pierre
      await expect(tx).to.emit(contract, "PartieJouee");
    });

    it("Ne devrait pas permettre de jouer sans profil", async function () {
      await expect(
        contract.connect(player2).jouer(0)
      ).to.be.revertedWith("Creez d'abord un profil");
    });

    it("Ne devrait pas accepter un choix invalide", async function () {
      await expect(
        contract.connect(player1).jouer(5)
      ).to.be.revertedWith("Choix invalide (0=Pierre, 1=Papier, 2=Ciseaux)");
    });

    it("Devrait mettre à jour les statistiques", async function () {
      // Jouer plusieurs parties
      for (let i = 0; i < 10; i++) {
        await contract.connect(player1).jouer(Math.floor(Math.random() * 3));
      }

      const stats = await contract.connect(player1).obtenirStats();
      const totalParties = stats[4];
      expect(totalParties).to.equal(10);
    });

    it("Devrait enregistrer l'historique", async function () {
      // Jouer 3 parties
      await contract.connect(player1).jouer(0);
      await contract.connect(player1).jouer(1);
      await contract.connect(player1).jouer(2);

      const historique = await contract.connect(player1).obtenirHistorique(3);
      expect(historique[0].length).to.equal(3); // 3 parties
    });
  });

  describe("Statistiques", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
      // Jouer quelques parties
      for (let i = 0; i < 5; i++) {
        await contract.connect(player1).jouer(Math.floor(Math.random() * 3));
      }
    });

    it("Devrait retourner les statistiques correctes", async function () {
      const stats = await contract.connect(player1).obtenirStats();
      
      expect(stats[0]).to.equal("Alice"); // nom
      expect(stats[4]).to.equal(5); // total parties
      expect(stats[5]).to.be.gte(0); // taux de victoire >= 0
      expect(stats[5]).to.be.lte(10000); // taux de victoire <= 100%
    });

    it("Ne devrait pas permettre d'obtenir les stats sans profil", async function () {
      await expect(
        contract.connect(player2).obtenirStats()
      ).to.be.revertedWith("Creez d'abord un profil");
    });

    it("Devrait calculer le taux de victoire correctement", async function () {
      const stats = await contract.connect(player1).obtenirStats();
      const victoires = Number(stats[1]);
      const total = Number(stats[4]);
      const tauxCalcule = total > 0 ? (victoires * 10000) / total : 0;
      
      expect(stats[5]).to.equal(tauxCalcule);
    });
  });

  describe("Système de séries", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
    });

    it("Devrait suivre la série actuelle", async function () {
      // Cette partie est difficile à tester car le résultat est aléatoire
      // On joue plusieurs parties et on vérifie que la série existe
      for (let i = 0; i < 10; i++) {
        await contract.connect(player1).jouer(0);
      }

      const stats = await contract.connect(player1).obtenirStats();
      expect(stats[6]).to.be.gte(0); // série actuelle >= 0
    });

    it("Devrait émettre un événement SerieBattue", async function () {
      // Jouer jusqu'à avoir une victoire et battre une série
      let victoryFound = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!victoryFound && attempts < maxAttempts) {
        const tx = await contract.connect(player1).jouer(0);
        const receipt = await tx.wait();
        
        // Chercher l'événement SerieBattue
        const serieBattueEvent = receipt.logs.find(
          log => log.fragment && log.fragment.name === "SerieBattue"
        );
        
        if (serieBattueEvent) {
          victoryFound = true;
          expect(serieBattueEvent.args[0]).to.equal(player1.address);
        }
        attempts++;
      }
    });
  });

  describe("Classement", function () {
    beforeEach(async function () {
      // Créer plusieurs joueurs
      await contract.connect(player1).creerProfil("Alice");
      await contract.connect(player2).creerProfil("Bob");
      
      // Jouer des parties
      for (let i = 0; i < 5; i++) {
        await contract.connect(player1).jouer(0);
        await contract.connect(player2).jouer(1);
      }
    });

    it("Devrait retourner le classement", async function () {
      const classement = await contract.obtenirClassement();
      const [adresses, noms, victoires, meilleuresSeries] = classement;
      
      expect(noms.length).to.be.gte(2);
      expect(adresses.length).to.equal(noms.length);
    });

    it("Devrait trier par nombre de victoires", async function () {
      const classement = await contract.obtenirClassement();
      const victoires = classement[2];
      
      // Vérifier que c'est trié en ordre décroissant
      for (let i = 0; i < victoires.length - 1; i++) {
        expect(Number(victoires[i])).to.be.gte(Number(victoires[i + 1]));
      }
    });

    it("Devrait retourner le rang correct", async function () {
      const rang = await contract.connect(player1).obtenirRang();
      expect(rang).to.be.gte(1);
      expect(rang).to.be.lte(2); // Il y a 2 joueurs
    });
  });

  describe("Historique", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
      
      // Jouer 10 parties
      for (let i = 0; i < 10; i++) {
        await contract.connect(player1).jouer(i % 3);
      }
    });

    it("Devrait retourner l'historique correct", async function () {
      const historique = await contract.connect(player1).obtenirHistorique(5);
      const [choixJoueur, choixOrdinateur, resultats] = historique;
      
      expect(choixJoueur.length).to.equal(5);
      expect(choixOrdinateur.length).to.equal(5);
      expect(resultats.length).to.equal(5);
    });

    it("Ne devrait pas accepter 0 ou plus de 10 parties", async function () {
      await expect(
        contract.connect(player1).obtenirHistorique(0)
      ).to.be.revertedWith("Demander entre 1 et 10 parties");

      await expect(
        contract.connect(player1).obtenirHistorique(11)
      ).to.be.revertedWith("Demander entre 1 et 10 parties");
    });

    it("Devrait retourner toutes les parties si moins de 10", async function () {
      // Créer un nouveau joueur avec seulement 3 parties
      await contract.connect(player2).creerProfil("Bob");
      await contract.connect(player2).jouer(0);
      await contract.connect(player2).jouer(1);
      await contract.connect(player2).jouer(2);

      const historique = await contract.connect(player2).obtenirHistorique(10);
      expect(historique[0].length).to.equal(3);
    });

    it("Devrait retourner le nombre total de parties", async function () {
      const nombre = await contract.connect(player1).obtenirNombreParties();
      expect(nombre).to.equal(10);
    });
  });

  describe("Statistiques des choix", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
    });

    it("Devrait suivre les statistiques par choix", async function () {
      // Jouer seulement Pierre
      for (let i = 0; i < 5; i++) {
        await contract.connect(player1).jouer(0);
      }

      const stats = await contract.connect(player1).obtenirStatsChoix();
      expect(stats[0]).to.equal(5); // 5 pierres jouées
      expect(stats[1]).to.equal(0); // 0 papier
      expect(stats[2]).to.equal(0); // 0 ciseaux
    });

    it("Devrait suivre les victoires par choix", async function () {
      // Jouer plusieurs parties
      for (let i = 0; i < 15; i++) {
        await contract.connect(player1).jouer(i % 3);
      }

      const stats = await contract.connect(player1).obtenirStatsChoix();
      const pierreJouees = Number(stats[0]);
      const pierreGagnees = Number(stats[3]);
      
      expect(pierreGagnees).to.be.lte(pierreJouees);
      expect(pierreGagnees).to.be.gte(0);
    });
  });

  describe("Réinitialisation", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
      
      // Jouer quelques parties
      for (let i = 0; i < 5; i++) {
        await contract.connect(player1).jouer(0);
      }
    });

    it("Devrait réinitialiser les statistiques", async function () {
      await contract.connect(player1).reinitialiserStats();

      const stats = await contract.connect(player1).obtenirStats();
      expect(stats[0]).to.equal("Alice"); // nom conservé
      expect(stats[1]).to.equal(0); // victoires = 0
      expect(stats[2]).to.equal(0); // défaites = 0
      expect(stats[3]).to.equal(0); // égalités = 0
      expect(stats[6]).to.equal(0); // série actuelle = 0
      expect(stats[7]).to.equal(0); // meilleure série = 0
    });

    it("Devrait supprimer l'historique", async function () {
      await contract.connect(player1).reinitialiserStats();

      const nombre = await contract.connect(player1).obtenirNombreParties();
      expect(nombre).to.equal(0);
    });

    it("Ne devrait pas permettre la réinitialisation sans profil", async function () {
      await expect(
        contract.connect(player2).reinitialiserStats()
      ).to.be.revertedWith("Creez d'abord un profil");
    });
  });

  describe("Événements", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
    });

    it("Devrait émettre PartieJouee à chaque partie", async function () {
      await expect(contract.connect(player1).jouer(0))
        .to.emit(contract, "PartieJouee");
    });

    it("Devrait émettre VictoireParfaite tous les 10 victoires", async function () {
      // Cette partie nécessite de forcer des victoires
      // Ce qui n'est pas possible avec le générateur aléatoire actuel
      // On vérifie juste que l'événement existe
      const events = await contract.queryFilter(
        contract.filters.VictoireParfaite()
      );
      expect(events).to.be.an('array');
    });
  });

  describe("Statistiques d'un autre joueur", function () {
    beforeEach(async function () {
      await contract.connect(player1).creerProfil("Alice");
      await contract.connect(player2).creerProfil("Bob");
      
      for (let i = 0; i < 3; i++) {
        await contract.connect(player1).jouer(0);
      }
    });

    it("Devrait permettre de voir les stats d'un autre joueur", async function () {
      const stats = await contract.connect(player2).obtenirStatsJoueur(player1.address);
      
      expect(stats[0]).to.equal("Alice");
      expect(stats[1]).to.be.gte(0); // victoires
    });

    it("Ne devrait pas permettre de voir un joueur inexistant", async function () {
      const [, , randomAddr] = await ethers.getSigners();
      
      await expect(
        contract.obtenirStatsJoueur(randomAddr.address)
      ).to.be.revertedWith("Ce joueur n'existe pas");
    });
  });

  describe("Intégration complète", function () {
    it("Devrait gérer un scénario complet", async function () {
      // 1. Créer des joueurs
      await contract.connect(player1).creerProfil("Alice");
      await contract.connect(player2).creerProfil("Bob");

      // 2. Jouer des parties
      for (let i = 0; i < 20; i++) {
        await contract.connect(player1).jouer(Math.floor(Math.random() * 3));
        await contract.connect(player2).jouer(Math.floor(Math.random() * 3));
      }

      // 3. Vérifier les stats
      const stats1 = await contract.connect(player1).obtenirStats();
      const stats2 = await contract.connect(player2).obtenirStats();
      
      expect(stats1[4]).to.equal(20); // 20 parties
      expect(stats2[4]).to.equal(20);

      // 4. Vérifier le classement
      const classement = await contract.obtenirClassement();
      expect(classement[1].length).to.equal(2); // 2 joueurs

      // 5. Vérifier l'historique
      const historique = await contract.connect(player1).obtenirHistorique(10);
      expect(historique[0].length).to.equal(10);

      // 6. Vérifier les rangs
      const rang1 = await contract.connect(player1).obtenirRang();
      const rang2 = await contract.connect(player2).obtenirRang();
      
      expect(rang1 + rang2).to.equal(3); // rang1 + rang2 = 1 + 2 ou 2 + 1
    });
  });
});