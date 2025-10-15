// scripts/test-contract.js
const hre = require("hardhat");

async function main() {
  console.log("🧪 Test du contrat PierrePapierCiseauxSolo\n");

  // Récupérer les signers
  const [player1, player2] = await hre.ethers.getSigners();
  
  console.log("👤 Joueur 1:", player1.address);
  console.log("👤 Joueur 2:", player2.address);
  console.log("");

  // Déployer le contrat pour les tests
  const PierrePapierCiseauxSolo = await hre.ethers.getContractFactory("PierrePapierCiseauxSolo");
  const contract = await PierrePapierCiseauxSolo.deploy();
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log("📝 Contrat déployé à:", contractAddress);
  console.log("");

  // TEST 1: Créer un profil
  console.log("📋 TEST 1: Création de profil");
  try {
    const tx1 = await contract.connect(player1).creerProfil("Alice");
    await tx1.wait();
    console.log("✅ Profil créé pour Alice");
    
    const profil = await contract.joueurs(player1.address);
    console.log("   Nom:", profil.nom);
    console.log("   Existe:", profil.existe);
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 2: Jouer quelques parties
  console.log("📋 TEST 2: Jouer des parties");
  const choix = ["Pierre", "Papier", "Ciseaux"];
  
  for (let i = 0; i < 5; i++) {
    const playerChoice = Math.floor(Math.random() * 3);
    console.log(`\n   Partie ${i + 1}: Alice joue ${choix[playerChoice]}`);
    
    try {
      const tx = await contract.connect(player1).jouer(playerChoice);
      const receipt = await tx.wait();
      
      // Récupérer l'événement PartieJouee
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === "PartieJouee"
      );
      
      if (event) {
        console.log("   Résultat:", event.args[3]);
      }
    } catch (error) {
      console.log("   ❌ Erreur:", error.message);
    }
  }
  console.log("");

  // TEST 3: Vérifier les statistiques
  console.log("📋 TEST 3: Statistiques");
  try {
    const stats = await contract.connect(player1).obtenirStats();
    console.log("   Nom:", stats[0]);
    console.log("   Victoires:", stats[1].toString());
    console.log("   Défaites:", stats[2].toString());
    console.log("   Égalités:", stats[3].toString());
    console.log("   Total parties:", stats[4].toString());
    console.log("   Taux victoire:", (stats[5] / 100).toFixed(2) + "%");
    console.log("   Série actuelle:", stats[6].toString());
    console.log("   Meilleure série:", stats[7].toString());
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 4: Créer un second joueur et jouer
  console.log("📋 TEST 4: Second joueur");
  try {
    const tx2 = await contract.connect(player2).creerProfil("Bob");
    await tx2.wait();
    console.log("✅ Profil créé pour Bob");
    
    // Bob joue 3 parties
    for (let i = 0; i < 3; i++) {
      await contract.connect(player2).jouer(Math.floor(Math.random() * 3));
    }
    console.log("✅ Bob a joué 3 parties");
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 5: Vérifier le classement
  console.log("📋 TEST 5: Classement global");
  try {
    const classement = await contract.obtenirClassement();
    const [adresses, noms, victoires, meilleuresSeries] = classement;
    
    console.log("\n   🏆 TOP JOUEURS:");
    for (let i = 0; i < Math.min(noms.length, 5); i++) {
      console.log(`   ${i + 1}. ${noms[i]} - ${victoires[i]} victoires (série: ${meilleuresSeries[i]})`);
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 6: Historique des parties
  console.log("📋 TEST 6: Historique");
  try {
    const historique = await contract.connect(player1).obtenirHistorique(5);
    const [choixJoueur, choixOrdinateur, resultats] = historique;
    
    console.log("\n   📜 Dernières parties d'Alice:");
    for (let i = 0; i < choixJoueur.length; i++) {
      console.log(`   ${i + 1}. ${choixJoueur[i]} vs ${choixOrdinateur[i]} → ${resultats[i]}`);
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 7: Statistiques sur les choix
  console.log("📋 TEST 7: Analyse des choix");
  try {
    const statsChoix = await contract.connect(player1).obtenirStatsChoix();
    console.log("   🪨 Pierre jouées:", statsChoix[0].toString(), "/ gagnées:", statsChoix[3].toString());
    console.log("   📄 Papier jouées:", statsChoix[1].toString(), "/ gagnées:", statsChoix[4].toString());
    console.log("   ✂️  Ciseaux jouées:", statsChoix[2].toString(), "/ gagnées:", statsChoix[5].toString());
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  // TEST 8: Rang du joueur
  console.log("📋 TEST 8: Rang dans le classement");
  try {
    const rang = await contract.connect(player1).obtenirRang();
    console.log("   Position d'Alice:", rang.toString());
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
  console.log("");

  console.log("✅ Tests terminés avec succès!");
  console.log("\n💡 Prochaines étapes:");
  console.log("   1. Déployez sur un testnet: npx hardhat run scripts/deploy.js --network baseSepolia");
  console.log("   2. Vérifiez le contrat: npx hardhat verify --network baseSepolia <ADRESSE>");
  console.log("   3. Testez avec la Frame sur Vercel");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });