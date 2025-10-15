# 🎯 Aide-Mémoire des Commandes

Toutes les commandes essentielles à portée de main !

## 🚀 Installation initiale

```bash
# Créer le projet
mkdir pierre-papier-ciseaux && cd pierre-papier-ciseaux

# Initialiser npm
npm init -y

# Installer toutes les dépendances en une fois
npm install next react react-dom ethers@^6 @vercel/og
npm install --save-dev typescript @types/node @types/react @types/react-dom hardhat @nomicfoundation/hardhat-toolbox dotenv eslint eslint-config-next

# Initialiser Hardhat
npx hardhat init
# Choisir: Create a TypeScript project
```

## 🔧 Développement local

```bash
# Lancer le serveur Next.js
npm run dev

# Build pour production
npm run build

# Lancer en mode production
npm start

# Compiler le contrat Solidity
npx hardhat compile

# Nettoyer le cache Hardhat
npx hardhat clean

# Lancer les tests Hardhat
npx hardhat test

# Tester le contrat avec le script
npx hardhat run scripts/test-contract.js
```

## 📡 Déploiement du contrat

```bash
# Déployer sur Base Sepolia (testnet)
npx hardhat run scripts/deploy.js --network baseSepolia

# Déployer sur Base Mainnet
npx hardhat run scripts/deploy.js --network base

# Déployer sur Optimism Sepolia
npx hardhat run scripts/deploy.js --network optimismSepolia

# Déployer sur Optimism Mainnet
npx hardhat run scripts/deploy.js --network optimism

# Vérifier le contrat sur BaseScan
npx hardhat verify --network baseSepolia <ADRESSE_CONTRAT>

# Vérifier sur Optimism
npx hardhat verify --network optimismSepolia <ADRESSE_CONTRAT>
```

## 🌐 Déploiement Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls

# Supprimer un déploiement
vercel rm <deployment-url>
```

## 🔍 Debugging

```bash
# Voir les logs Vercel en temps réel
vercel logs --follow

# Voir les logs d'un déploiement spécifique
vercel logs <deployment-url>

# Vérifier la compilation TypeScript
npx tsc --noEmit

# Linter le code
npm run lint

# Voir les informations du réseau Hardhat
npx hardhat node

# Console Hardhat
npx hardhat console --network baseSepolia
```

## 🧪 Tests et validation

```bash
# Tester le contrat localement
npx hardhat test

# Tester un fichier spécifique
npx hardhat test test/PierrePapierCiseauxSolo.test.js

# Tester avec coverage
npx hardhat coverage

# Tester le script de déploiement
npx hardhat run scripts/deploy.js --network hardhat

# Tester avec ngrok (pour Frame local)
ngrok http 3000
```

## 📦 Git

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit: Pierre-Papier-Ciseaux Frame"

# Ajouter un remote
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# Pousser sur GitHub
git push -u origin main

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Voir le statut
git status

# Voir l'historique
git log --oneline
```

## 🔐 Gestion des clés

```bash
# Générer une nouvelle clé privée (avec ethers)
node -e "console.log(require('ethers').Wallet.createRandom().privateKey)"

# Obtenir l'adresse depuis une clé privée
node -e "console.log(new (require('ethers').Wallet)('VOTRE_CLE_PRIVEE').address)"

# IMPORTANT: Ne jamais commit les clés !
echo ".env.local" >> .gitignore
```

## 📊 Monitoring

```bash
# Vérifier le solde d'une adresse (Base Sepolia)
cast balance <ADRESSE> --rpc-url https://sepolia.base.org

# Obtenir le nonce d'une adresse
cast nonce <ADRESSE> --rpc-url https://sepolia.base.org

# Appeler une fonction du contrat en lecture
cast call <CONTRAT> "obtenirStats()(string,uint256,uint256,uint256,uint256,uint256,uint256,uint256)" --rpc-url https://sepolia.base.org

# Envoyer une transaction
cast send <CONTRAT> "jouer(uint256)" 0 --private-key <KEY> --rpc-url https://sepolia.base.org
```

## 🛠️ Utilitaires

```bash
# Formater le code avec Prettier (si installé)
npx prettier --write "**/*.{ts,tsx,js,json,md}"

# Vérifier la taille du build
npm run build && du -sh .next

# Analyser les dépendances
npm list --depth=0

# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités
npm audit fix
```

## 🌐 Faucets pour testnets

```bash
# Base Sepolia Faucet (dans le navigateur)
open https://www.coinbase.com/faucet

# Ethereum Sepolia Faucet
open https://sepoliafaucet.com

# Optimism Sepolia Faucet
open https://www.alchemy.com/faucets/optimism-sepolia
```

## 🔗 URLs utiles

```bash
# Frame Validator Warpcast
open https://warpcast.com/~/developers/frames

# BaseScan Testnet
open https://sepolia.basescan.org

# BaseScan Mainnet
open https://basescan.org

# Optimism Sepolia Explorer
open https://sepolia-optimism.etherscan.io

# Vercel Dashboard
open https://vercel.com/dashboard

# GitHub du projet
open https://github.com/VOTRE_USERNAME/VOTRE_REPO
```

## 🎨 Commandes de personnalisation

```bash
# Créer une nouvelle page Next.js
touch pages/about.tsx

# Créer une nouvelle API route
touch pages/api/nouvelle-route.ts

# Créer un nouveau composant React
mkdir components && touch components/MonComposant.tsx

# Ajouter une nouvelle librairie
npm install nom-de-la-lib

# Supprimer une librairie
npm uninstall nom-de-la-lib

# Réinstaller toutes les dépendances
rm -rf node_modules package-lock.json && npm install
```

## 🚨 Commandes d'urgence

```bash
# Tuer le processus Next.js bloqué
killall node

# Nettoyer tous les caches
rm -rf .next node_modules .cache artifacts cache
npm install

# Redémarrer le serveur de dev
npm run dev

# Rollback sur Vercel
vercel rollback <deployment-url>

# Voir les variables d'environnement Vercel
vercel env ls

# Ajouter une variable d'environnement
vercel env add VARIABLE_NAME

# Supprimer une variable d'environnement
vercel env rm VARIABLE_NAME
```

## 📝 Snippets pratiques

### Tester rapidement une fonction du contrat

```bash
# Dans la console Hardhat
npx hardhat console --network baseSepolia

# Puis dans la console:
const Contract = await ethers.getContractFactory("PierrePapierCiseauxSolo");
const contract = await Contract.attach("ADRESSE_DU_CONTRAT");
await contract.joueurs("ADRESSE_JOUEUR");
```

### Déployer et vérifier en une commande

```bash
npx hardhat run scripts/deploy.js --network baseSepolia && \
ADDR=$(cat deployment-info.json | grep contractAddress | cut -d'"' -f4) && \
npx hardhat verify --network baseSepolia $ADDR
```

### Build et déployer sur Vercel

```bash
npm run build && vercel --prod
```

### Créer un backup du contrat

```bash
cp contracts/PierrePapierCiseauxSolo.sol contracts/PierrePapierCiseauxSolo.sol.backup
```

## 📋 Checklist de déploiement

Copiez-collez dans votre terminal pour vérifier chaque étape :

```bash
echo "✅ Checklist de déploiement"
echo ""
echo "1. Contrat compilé ?"
npx hardhat compile && echo "✓ Oui" || echo "✗ Non"
echo ""
echo "2. Tests passent ?"
npx hardhat test && echo "✓ Oui" || echo "✗ Non"
echo ""
echo "3. Build Next.js fonctionne ?"
npm run build && echo "✓ Oui" || echo "✗ Non"
echo ""
echo "4. Variables d'environnement configurées ?"
test -f .env.local && echo "✓ .env.local existe" || echo "✗ .env.local manquant"
echo ""
echo "5. Git est à jour ?"
git status --short
echo ""
echo "Prêt pour le déploiement ! 🚀"
```

## 🔄 Workflow complet

```bash
# 1. Développement
npm run dev

# 2. Test du contrat
npx hardhat test

# 3. Déployer le contrat
npx hardhat run scripts/deploy.js --network baseSepolia

# 4. Copier l'adresse du contrat dans .env.local
echo "CONTRACT_ADDRESS=0x..." >> .env.local

# 5. Vérifier le contrat
npx hardhat verify --network baseSepolia <ADRESSE>

# 6. Build Next.js
npm run build

# 7. Commit
git add .
git commit -m "Deploy: contrat + frame"
git push

# 8. Déployer sur Vercel
vercel --prod

# 9. Tester la Frame
open https://warpcast.com/~/developers/frames

# 10. Publier sur Farcaster 🎉
```

## 🎯 Commandes par objectif

### Je veux... créer un nouveau projet

```bash
npx create-next-app@latest pierre-papier-ciseaux --typescript
cd pierre-papier-ciseaux
npm install ethers @vercel/og
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### Je veux... tester localement

```bash
npm run dev
open http://localhost:3000
```

### Je veux... déployer rapidement

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
# Copier l'adresse du contrat
vercel --prod
```

### Je veux... debugger un problème

```bash
# Voir les logs
vercel logs --follow

# Vérifier la compilation
npx tsc --noEmit

# Nettoyer et réinstaller
rm -rf .next node_modules && npm install && npm run dev
```

### Je veux... mettre à jour le contrat

```bash
# 1. Modifier le contrat
vim contracts/PierrePapierCiseauxSolo.sol

# 2. Compiler
npx hardhat compile

# 3. Tester
npx hardhat test

# 4. Redéployer
npx hardhat run scripts/deploy.js --network baseSepolia

# 5. Mettre à jour .env.local avec la nouvelle adresse

# 6. Redéployer Vercel
vercel --prod
```

### Je veux... voir les transactions

```bash
# Sur BaseScan Sepolia
open https://sepolia.basescan.org/address/<ADRESSE_CONTRAT>

# Ou avec cast
cast logs --address <CONTRAT> --rpc-url https://sepolia.base.org
```

## 💡 Astuces et raccourcis

### Alias utiles à ajouter dans votre shell

```bash
# Ajoutez dans ~/.bashrc ou ~/.zshrc
alias hh="npx hardhat"
alias hhc="npx hardhat compile"
alias hht="npx hardhat test"
alias hhd="npx hardhat run scripts/deploy.js"
alias nd="npm run dev"
alias nb="npm run build"
alias vd="vercel"
alias vp="vercel --prod"
alias vl="vercel logs --follow"
```

### Scripts package.json personnalisés

Ajoutez dans votre `package.json` :

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "hardhat test",
  "compile": "hardhat compile",
  "deploy:testnet": "hardhat run scripts/deploy.js --network baseSepolia",
  "deploy:mainnet": "hardhat run scripts/deploy.js --network base",
  "verify": "hardhat verify --network baseSepolia",
  "deploy:vercel": "vercel --prod",
  "logs": "vercel logs --follow",
  "clean": "rm -rf .next node_modules cache artifacts && npm install"
}
```

Puis utilisez :

```bash
npm run deploy:testnet
npm run deploy:vercel
npm run logs
```

## 🔧 Configuration VSCode

Créez `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[solidity]": {
    "editor.defaultFormatter": "JuanBlanco.solidity"
  }
}
```

## 📚 Commandes de documentation

```bash
# Générer la documentation du contrat (avec Hardhat Docgen)
npm install --save-dev hardhat-docgen
npx hardhat docgen

# Générer un README automatique
npm install --save-dev readme-md-generator
npx readme-md-generator
```

## 🎉 Commande finale

Après avoir tout déployé :

```bash
echo "🎉 Félicitations !"
echo ""
echo "📝 Contrat déployé sur : https://sepolia.basescan.org/address/<VOTRE_ADRESSE>"
echo "🌐 Frame disponible sur : https://votre-app.vercel.app"
echo "🚀 Testez sur : https://warpcast.com/~/developers/frames"
echo ""
echo "Partagez votre Frame sur Farcaster ! 🎮"
```

## 📞 Support

Si une commande ne fonctionne pas :

1. Vérifiez la version de Node.js : `node -v` (doit être >= 18)
2. Nettoyez les caches : `npm run clean`
3. Réinstallez : `npm install`
4. Consultez les logs : `vercel logs`
5. Vérifiez les variables d'env : `cat .env.local`

## 🔖 Bookmark ces URLs

```bash
# Documentation
https://docs.farcaster.xyz
https://docs.base.org
https://vercel.com/docs
https://hardhat.org/docs

# Explorers
https://sepolia.basescan.org
https://basescan.org

# Faucets
https://www.coinbase.com/faucet
https://sepoliafaucet.com

# Tools
https://warpcast.com/~/developers/frames
https://vercel.com/dashboard
```

Bonne chance avec votre projet ! 🚀