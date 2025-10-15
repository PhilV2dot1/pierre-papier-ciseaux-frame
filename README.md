# 🎮 Pierre Papier Ciseaux - Farcaster Frame

Une mini-app Farcaster interactive pour jouer à Pierre-Papier-Ciseaux on-chain avec suivi des statistiques.

## 📋 Prérequis

- Node.js 18+ installé
- Compte Vercel
- Contrat Solidity déployé sur Base/Optimism/Ethereum
- Wallet avec des fonds pour les frais de gas

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
git clone <votre-repo>
cd pierre-papier-ciseaux-frame
npm install
```

### 2. Déployer le contrat Solidity

```bash
# Avec Hardhat ou Foundry
# Assurez-vous de noter l'adresse du contrat déployé
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_URL=http://localhost:3000
CONTRACT_ADDRESS=0xVOTRE_ADRESSE_CONTRAT
RPC_URL=https://mainnet.base.org
```

### 4. Tester localement

```bash
npm run dev
# Visitez http://localhost:3000
```

## 📦 Déploiement sur Vercel

### Méthode 1 : Via la CLI Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Suivez les instructions et ajoutez vos variables d'environnement.

### Méthode 2 : Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repo GitHub
4. Ajoutez les variables d'environnement :
   - `NEXT_PUBLIC_URL` : L'URL de votre déploiement Vercel
   - `CONTRACT_ADDRESS` : Adresse du contrat déployé
   - `RPC_URL` : URL du provider RPC
5. Cliquez sur "Deploy"

Une fois déployé, notez l'URL (ex: `https://votre-app.vercel.app`)

### Mettre à jour NEXT_PUBLIC_URL

Après le premier déploiement :

1. Allez dans Settings > Environment Variables
2. Modifiez `NEXT_PUBLIC_URL` avec votre URL Vercel
3. Redéployez le projet

## 🎯 Tester votre Frame sur Farcaster

### Option 1 : Frame Validator (Warpcast)

1. Visitez : https://warpcast.com/~/developers/frames
2. Entrez votre URL : `https://votre-app.vercel.app`
3. Testez les interactions

### Option 2 : Poster dans Farcaster

Créez un cast avec votre URL :

```
Jouez à Pierre-Papier-Ciseaux on-chain ! 🎮
https://votre-app.vercel.app
```

## 📊 Structure du Projet

```
.
├── pages/
│   ├── index.tsx              # Page d'accueil avec Frame
│   └── api/
│       ├── play.ts            # Gestion du jeu
│       ├── create-profile.ts  # Création de profil
│       └── image/
│           └── [type].tsx     # Génération d'images OG
├── public/                    # Assets statiques
├── .env.local                 # Variables d'environnement
├── next.config.js             # Configuration Next.js
├── vercel.json                # Configuration Vercel
└── package.json               # Dépendances
```

## 🔧 Fonctionnalités

### Interactions disponibles dans la Frame

1. **🪨 Pierre** - Jouer Pierre
2. **📄 Papier** - Jouer Papier
3. **✂️ Ciseaux** - Jouer Ciseaux
4. **📊 Stats** - Voir vos statistiques
5. **🏆 Classement** - Voir le classement global

### Contrat Smart Contract

Le contrat inclut :

- ✅ Création de profil joueur
- ✅ Système de jeu avec génération aléatoire
- ✅ Statistiques complètes (victoires, défaites, égalités)
- ✅ Système de séries de victoires
- ✅ Classement global des joueurs
- ✅ Historique des parties
- ✅ Événements pour chaque action

## 🎨 Personnalisation

### Modifier les images générées

Éditez `pages/api/image/[type].tsx` pour personnaliser :

- Couleurs de fond
- Tailles de police
- Emojis utilisés
- Layout des statistiques

### Ajouter de nouvelles fonctionnalités

1. **Classement global** : Créez une nouvelle route API
2. **Historique** : Ajoutez un bouton pour voir les dernières parties
3. **Défis** : Permettre aux joueurs de se défier

## 🔐 Sécurité

### Validation des messages Farcaster

Pour la production, ajoutez la validation des messages :

```typescript
import { validateFrameMessage } from '@farcaster/frame-sdk';

// Dans votre API route
const isValid = await validateFrameMessage(trustedData);
if (!isValid) {
  return res.status(400).json({ error: 'Invalid frame message' });
}
```

### Rate Limiting

Ajoutez un rate limiter pour éviter les abus :

```bash
npm install @upstash/ratelimit @upstash/redis
```

## 📱 Test en Local avec Ngrok

Pour tester avec Farcaster localement :

```bash
# Installer ngrok
npm install -g ngrok

# Lancer votre app
npm run dev

# Dans un autre terminal
ngrok http 3000

# Utilisez l'URL ngrok dans le Frame Validator
```

## 🐛 Résolution de problèmes

### Les images ne s'affichent pas

- Vérifiez que `@vercel/og` est installé
- Assurez-vous que les routes image utilisent `runtime: 'edge'`
- Vérifiez les logs Vercel pour les erreurs

### Le contrat ne répond pas

- Vérifiez l'adresse du contrat dans `.env.local`
- Testez la connexion RPC avec `curl $RPC_URL`
- Assurez-vous que le contrat est déployé sur le bon réseau

### Les boutons ne fonctionnent pas

- Vérifiez que `fc:frame:post_url` est correctement défini
- Testez avec le Frame Validator de Warpcast
- Regardez les logs des API routes dans Vercel

## 📚 Ressources

- [Documentation Farcaster Frames](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)
- [Vercel Documentation](https://vercel.com/docs)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Frame Validator](https://warpcast.com/~/developers/frames)

## 🎉 Améliorations futures

- [ ] Ajouter un système de tournois
- [ ] Permettre les défis entre joueurs
- [ ] Ajouter des NFT comme récompenses
- [ ] Intégrer un système de paris
- [ ] Ajouter des achievements
- [ ] Mode multijoueur en temps réel

## 📄 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une PR.

---

Fait avec ❤️ pour la communauté Farcaster