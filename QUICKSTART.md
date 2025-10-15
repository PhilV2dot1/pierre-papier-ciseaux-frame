# ⚡ Quick Start Guide

Guide ultra-rapide pour démarrer en 10 minutes !

## 🚀 Installation rapide

```bash
# 1. Créer le projet
mkdir pierre-papier-ciseaux && cd pierre-papier-ciseaux

# 2. Initialiser
npm init -y

# 3. Installer les dépendances
npm install next react react-dom ethers @vercel/og
npm install --save-dev typescript @types/node @types/react hardhat
```

## 📁 Structure des fichiers

Créez cette structure :

```
pierre-papier-ciseaux/
├── contracts/
│   └── PierrePapierCiseauxSolo.sol
├── scripts/
│   ├── deploy.js
│   └── test-contract.js
├── pages/
│   ├── index.tsx
│   └── api/
│       ├── play.ts
│       ├── create-profile.ts
│       ├── leaderboard.ts
│       └── image/
│           └── [type].tsx
├── .env.local
├── .gitignore
├── hardhat.config.js
├── next.config.js
├── package.json
├── tsconfig.json
└── vercel.json
```

## 🔧 Configuration rapide

### .env.local

```env
CONTRACT_ADDRESS=0x...
RPC_URL=https://sepolia.base.org
PRIVATE_KEY=votre_key
NEXT_PUBLIC_URL=http://localhost:3000
```

## 📝 Commandes essentielles

### Développement local

```bash
# Compiler le contrat
npx hardhat compile

# Tester le contrat localement
npx hardhat run scripts/test-contract.js

# Lancer le dev server Next.js
npm run dev
```

### Déploiement

```bash
# 1. Déployer le contrat sur Base Sepolia (testnet)
npx hardhat run scripts/deploy.js --network baseSepolia

# 2. Noter l'adresse du contrat et l'ajouter dans .env.local

# 3. Vérifier le contrat
npx hardhat verify --network baseSepolia <ADRESSE_CONTRAT>

# 4. Build Next.js
npm run build

# 5. Déployer sur Vercel
vercel
```

## 🧪 Tests rapides

### Test 1: Page locale
```bash
npm run dev
# Visitez http://localhost:3000
# Vérifiez le code source pour les métadonnées Frame
```

### Test 2: Frame Validator
```
1. Allez sur: https://warpcast.com/~/developers/frames
2. Entrez votre URL Vercel
3. Testez les boutons
```

### Test 3: Contrat sur testnet
```bash
# Vérifiez sur BaseScan
https://sepolia.basescan.org/address/<VOTRE_CONTRAT>
```

## ✅ Checklist rapide

- [ ] Contrat compilé sans erreur
- [ ] Tests locaux passent
- [ ] Contrat déployé sur testnet
- [ ] Contrat vérifié sur l'explorer
- [ ] Variables .env configurées
- [ ] Frame teste locale fonctionne
- [ ] Déployé sur Vercel
- [ ] Frame validée sur Warpcast
- [ ] Cast publié sur Farcaster

## 🆘 Problèmes courants

| Problème | Solution rapide |
|----------|----------------|
| "Cannot find module" | `npm install` |
| "Invalid frame" | Vérifiez les métadonnées dans index.tsx |
| "Transaction failed" | Vérifiez votre balance ETH sur le testnet |
| "Image not loading" | Vérifiez @vercel/og est installé |
| "CORS error" | Vérifiez next.config.js headers |

## 📚 Commandes utiles

```bash
# Voir les logs Vercel
vercel logs

# Redéployer sur Vercel
vercel --prod

# Tester avec ngrok (local)
ngrok http 3000

# Nettoyer Hardhat
npx hardhat clean

# Compiler à nouveau
npx hardhat compile

# Lister les comptes
npx hardhat accounts --network baseSepolia
```

## 🎯 Prochaines étapes

1. ✅ Testez localement
2. ✅ Déployez sur testnet
3. ✅ Déployez sur Vercel
4. ✅ Testez la Frame
5. ✅ Publiez sur Farcaster
6. 🚀 Partagez avec la communauté !

## 💡 Tips

- Utilisez Base Sepolia pour les tests (gratuit, rapide)
- Gardez votre PRIVATE_KEY secrète
- Testez avec le Frame Validator avant de publier
- Monitez les transactions sur BaseScan
- Ajoutez du rate limiting en production

## 🔗 Liens rapides

- Frame Validator: https://warpcast.com/~/developers/frames
- Base Sepolia Faucet: https://www.coinbase.com/faucet
- BaseScan Testnet: https://sepolia.basescan.org
- Vercel Dashboard: https://vercel.com/dashboard

Bon courage ! 🚀