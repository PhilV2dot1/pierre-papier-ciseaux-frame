# 🚀 Guide de Déploiement Complet

Ce guide vous accompagne étape par étape pour déployer votre jeu Pierre-Papier-Ciseaux sur Farcaster.

## 📦 Étape 1 : Préparation du Projet

### 1.1 Cloner et installer

```bash
# Créer un nouveau projet
mkdir pierre-papier-ciseaux
cd pierre-papier-ciseaux

# Initialiser le projet
npm init -y

# Installer les dépendances
npm install next react react-dom ethers @vercel/og
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

### 1.2 Structure des fichiers

```
pierre-papier-ciseaux/
├── contracts/
│   └── PierrePapierCiseauxSolo.sol
├── scripts/
│   └── deploy.js
├── pages/
│   ├── index.tsx
│   └── api/
│       ├── play.ts
│       ├── create-profile.ts
│       ├── leaderboard.ts
│       └── image/
│           └── [type].tsx
├── hardhat.config.js
├── package.json
├── next.config.js
├── vercel.json
├── tsconfig.json
└── .env.local
```

## 🔧 Étape 2 : Déployer le Smart Contract

### 2.1 Installer Hardhat

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Choisir "Create a TypeScript project"
```

### 2.2 Configurer Hardhat

Créez `hardhat.config.js` avec la configuration fournie.

### 2.3 Obtenir une clé privée

```bash
# IMPORTANT : Ne JAMAIS commit votre clé privée !
# Créez un wallet de test sur MetaMask
# Exportez la clé privée
```

### 2.4 Obtenir des fonds de test

Pour **Base Sepolia** (Testnet) :
1. Visitez : https://www.coinbase.com/faucet
2. Ou : https://bridge.base.org/
3. Obtenez des ETH Sepolia : https://sepoliafaucet.com

Pour **Optimism Sepolia** :
1. Visitez : https://www.alchemy.com/faucets/optimism-sepolia

### 2.5 Créer le fichier .env

```bash
# À la racine du projet
touch .env.local
```

Ajoutez :
```env
PRIVATE_KEY=votre_private_key_sans_0x
BASESCAN_API_KEY=votre_api_key
ALCHEMY_API_KEY=votre_api_key
```

### 2.6 Déployer le contrat

```bash
# Sur Base Sepolia (testnet recommandé)
npx hardhat run scripts/deploy.js --network baseSepolia

# Ou sur Base Mainnet (production)
npx hardhat run scripts/deploy.js --network base

# Ou sur Optimism Sepolia
npx hardhat run scripts/deploy.js --network optimismSepolia
```

**Notez l'adresse du contrat déployé !**

### 2.7 Vérifier le contrat

```bash
npx hardhat verify --network baseSepolia ADRESSE_DU_CONTRAT
```

## 🌐 Étape 3 : Configurer le Frontend

### 3.1 Mettre à jour .env.local

Ajoutez ces variables :

```env
# Adresse du contrat déployé
CONTRACT_ADDRESS=0xVOTRE_ADRESSE_CONTRAT

# RPC URL selon votre réseau
RPC_URL=https://sepolia.base.org

# URL temporaire pour le développement local
NEXT_PUBLIC_URL=http://localhost:3000

# Clé privée pour signer les transactions (création de profil)
PRIVATE_KEY=votre_private_key
```

### 3.2 Tester localement

```bash
npm run dev
```

Visitez `http://localhost:3000` et vérifiez que :
- La page s'affiche correctement
- Les métadonnées Frame sont présentes (voir le code source)

## 📡 Étape 4 : Déployer sur Vercel

### 4.1 Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Créez un nouveau repository GitHub pour votre projet

### 4.2 Pousser le code sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
git push -u origin main
```

### 4.3 Importer sur Vercel

1. Cliquez sur "New Project" dans Vercel
2. Sélectionnez votre repository
3. Framework Preset : **Next.js**
4. Cliquez sur "Deploy"

### 4.4 Configurer les variables d'environnement

Dans Vercel Dashboard :
1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez :

```
CONTRACT_ADDRESS = 0xVOTRE_ADRESSE
RPC_URL = https://sepolia.base.org
PRIVATE_KEY = votre_private_key
NEXT_PUBLIC_URL = https://votre-app.vercel.app
```

⚠️ **Important** : Pour `NEXT_PUBLIC_URL`, utilisez l'URL que Vercel vous a donnée.

### 4.5 Redéployer

Après avoir ajouté les variables :
1. Allez dans **Deployments**
2. Cliquez sur les 3 points du dernier déploiement
3. Cliquez sur "Redeploy"

## 🧪 Étape 5 : Tester la Frame

### 5.1 Utiliser le Frame Validator

1. Visitez : https://warpcast.com/~/developers/frames
2. Entrez votre URL Vercel : `https://votre-app.vercel.app`
3. Vérifiez que :
   - L'image s'affiche
   - Les 4 boutons apparaissent (Pierre, Papier, Ciseaux, Stats)
   - Les clics fonctionnent

### 5.2 Tester les interactions

Cliquez sur chaque bouton et vérifiez :
- ✅ **Pierre/Papier/Ciseaux** : L'image change et affiche le résultat
- ✅ **Stats** : Affiche vos statistiques
- ✅ Navigation fluide entre les écrans

### 5.3 Vérifier sur la blockchain

1. Allez sur BaseScan : https://sepolia.basescan.org
2. Recherchez votre adresse de contrat
3. Vérifiez les transactions dans l'onglet "Transactions"
4. Vérifiez les événements dans "Events"

## 📱 Étape 6 : Publier sur Farcaster

### 6.1 Créer un cast

Dans Warpcast ou tout autre client Farcaster :

```
🎮 Jouez à Pierre-Papier-Ciseaux on-chain !

Statistiques, séries de victoires, et classement global 🏆

https://votre-app.vercel.app
```

### 6.2 La Frame devrait apparaître automatiquement

Farcaster détecte les métadonnées Frame et affiche votre jeu directement dans le feed !

## 🐛 Résolution des Problèmes Courants

### Problème : "Les images ne s'affichent pas"

**Solution** :
```bash
# Vérifiez que @vercel/og est installé
npm install @vercel/og

# Vérifiez les logs Vercel
vercel logs
```

### Problème : "Invalid frame message"

**Solution** :
- Vérifiez que `untrustedData` et `trustedData` sont bien reçus
- Ajoutez des logs dans votre API route pour débugger
- Testez avec le Frame Validator officiel

### Problème : "Transaction failed"

**Solutions possibles** :
1. **Pas assez de gas** : Augmentez votre balance sur le testnet
2. **Profil déjà créé** : Le contrat refuse si le profil existe déjà
3. **RPC down** : Changez de provider RPC

```typescript
// Ajoutez plus de gas
const tx = await contract.creerProfil(playerName, {
  gasLimit: 500000
});
```

### Problème : "Rate limit exceeded"

**Solution** :
Ajoutez un rate limiter avec Upstash :

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Problème : "CORS errors"

**Solution** :
Vérifiez votre `next.config.js` :

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

## 🔐 Sécurité et Production

### Pour la production, vous devez :

1. **Ne jamais exposer PRIVATE_KEY dans le frontend**
2. **Utiliser un relayer pour les transactions gasless**
3. **Implémenter la validation des messages Farcaster**

```typescript
// Installation
npm install @farcaster/hub-nodejs

// Dans votre API route
import { Message, NobleEd25519Signer } from '@farcaster/hub-nodejs';

async function validateMessage(trustedData: string) {
  try {
    const frameMessage = Message.decode(Buffer.from(trustedData, 'hex'));
    // Valider le message
    return true;
  } catch (error) {
    return false;
  }
}
```

4. **Ajouter un système de rate limiting**
5. **Monitorer les transactions et les coûts**

## 📊 Monitoring et Analytics

### Suivre l'utilisation

1. **Vercel Analytics** : Automatique avec Vercel
2. **Blockchain Explorer** : BaseScan/Optimism Explorer
3. **Custom Analytics** :

```typescript
// Ajoutez dans votre API route
const analytics = {
  totalPlays: 0,
  uniquePlayers: new Set(),
  winRate: 0
};

// Track chaque action
analytics.totalPlays++;
analytics.uniquePlayers.add(userAddress);
```

## 🎨 Personnalisation Avancée

### Modifier les images

Éditez `pages/api/image/[type].tsx` :

```typescript
// Changez les couleurs
backgroundColor: '#VOTRE_COULEUR'
backgroundImage: 'linear-gradient(...)'

// Changez les emojis
const choices = ['🗿', '📋', '✂️']; // Autres emojis

// Ajoutez des animations (avec CSS)
style={{ animation: 'fadeIn 0.3s ease-in' }}
```

### Ajouter de nouveaux boutons

Dans vos API routes :

```typescript
<meta property="fc:frame:button:5" content="🏆 Classement" />
<meta property="fc:frame:button:5:action" content="post" />
<meta property="fc:frame:button:5:target" content="${url}/api/leaderboard" />
```

### Ajouter des achievements

```solidity
// Dans le contrat
mapping(address => uint256[]) public achievements;

function checkAchievements(address player) internal {
  if (joueurs[player].victoires == 10) {
    achievements[player].push(1); // First blood
  }
  if (joueurs[player].meilleureSerie >= 5) {
    achievements[player].push(2); // Hot streak
  }
}
```

## 🚀 Améliorations Futures

### Idées à implémenter :

1. **Mode multijoueur** : Défier d'autres joueurs
2. **NFT Rewards** : Mint des NFT pour les achievements
3. **Tournois** : Organiser des compétitions
4. **Paris** : Parier sur les résultats
5. **Statistiques avancées** : Graphiques, tendances
6. **Intégration avec d'autres protocoles** : ENS, Lens, etc.

## 📚 Ressources Utiles

- [Farcaster Frames Documentation](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)
- [Vercel Documentation](https://vercel.com/docs)
- [Base Documentation](https://docs.base.org)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Hardhat Documentation](https://hardhat.org/docs)

## ✅ Checklist Finale

Avant de lancer en production :

- [ ] Contrat déployé et vérifié
- [ ] Tests locaux passent
- [ ] Frame testée avec le validator
- [ ] Variables d'environnement configurées sur Vercel
- [ ] URLs mises à jour partout
- [ ] Rate limiting implémenté
- [ ] Validation des messages Farcaster active
- [ ] Monitoring en place
- [ ] Documentation à jour
- [ ] Cast publié sur Farcaster

## 🎉 Félicitations !

Votre jeu Pierre-Papier-Ciseaux est maintenant live sur Farcaster ! 🚀

N'oubliez pas de :
- Partager votre Frame avec la communauté
- Écouter les retours des utilisateurs
- Itérer et améliorer
- Suivre les transactions et les coûts

Bon jeu ! 🎮