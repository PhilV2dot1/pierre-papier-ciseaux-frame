// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Déploiement du contrat PierrePapierCiseauxSolo...");

  // Obtenir le contrat
  const PierrePapierCiseauxSolo = await hre.ethers.getContractFactory("PierrePapierCiseauxSolo");
  
  // Déployer
  const contract = await PierrePapierCiseauxSolo.deploy();
  
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  
  console.log("✅ Contrat déployé à l'adresse:", contractAddress);
  console.log("\n📋 Prochaines étapes:");
  console.log("1. Ajoutez cette adresse dans votre fichier .env.local:");
  console.log(`   CONTRACT_ADDRESS=${contractAddress}`);
  console.log("\n2. Vérifiez le contrat sur l'explorateur de blocs:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
  console.log("\n3. Testez le contrat:");
  console.log("   - Créez un profil");
  console.log("   - Jouez quelques parties");
  console.log("   - Vérifiez les statistiques");
  
  // Sauvegarder l'adresse dans un fichier
  const fs = require('fs');
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deploymentDate: new Date().toISOString(),
    deployer: (await hre.ethers.getSigners())[0].address
  };
  
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n💾 Informations sauvegardées dans deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });