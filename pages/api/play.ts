// pages/api/play.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

// ABI simplifié du contrat
const CONTRACT_ABI = [
  "function jouer(uint256 _choix) public returns (string memory)",
  "function creerProfil(string memory _nom) public",
  "function obtenirStats() public view returns (string memory nom, uint256 victoires, uint256 defaites, uint256 egalites, uint256 totalParties, uint256 tauxVictoire, uint256 serieActuelle, uint256 meilleureSerie)",
  "function joueurs(address) public view returns (string memory nom, uint256 victoires, uint256 defaites, uint256 egalites, uint256 serieActuelle, uint256 meilleureSerie, bool existe)"
];

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // Valider la Frame Message
    const { untrustedData, trustedData } = body;
    const buttonIndex = untrustedData?.buttonIndex;
    const fid = untrustedData?.fid;
    const userAddress = untrustedData?.address;

    if (!buttonIndex) {
      return res.status(400).json({ error: 'Invalid frame message' });
    }

    // Connecter au contrat
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    let imageUrl = '';
    let buttons: any[] = [];
    let postUrl = `${process.env.NEXT_PUBLIC_URL}/api/play`;

    // Vérifier si le joueur existe
    const playerExists = await checkPlayerExists(contract, userAddress);

    if (!playerExists && buttonIndex !== 4) {
      // Créer automatiquement le profil
      imageUrl = `${process.env.NEXT_PUBLIC_URL}/api/image/welcome?fid=${fid}`;
      buttons = [
        { label: '🎮 Créer mon profil', action: 'post' }
      ];
      postUrl = `${process.env.NEXT_PUBLIC_URL}/api/create-profile`;
    } else {
      // Traiter l'action selon le bouton
      switch (buttonIndex) {
        case 1: // Pierre
          imageUrl = await generateResultImage(0, userAddress, contract);
          buttons = [
            { label: '🪨 Pierre', action: 'post' },
            { label: '📄 Papier', action: 'post' },
            { label: '✂️ Ciseaux', action: 'post' },
            { label: '📊 Stats', action: 'post' }
          ];
          break;
        case 2: // Papier
          imageUrl = await generateResultImage(1, userAddress, contract);
          buttons = [
            { label: '🪨 Pierre', action: 'post' },
            { label: '📄 Papier', action: 'post' },
            { label: '✂️ Ciseaux', action: 'post' },
            { label: '📊 Stats', action: 'post' }
          ];
          break;
        case 3: // Ciseaux
          imageUrl = await generateResultImage(2, userAddress, contract);
          buttons = [
            { label: '🪨 Pierre', action: 'post' },
            { label: '📄 Papier', action: 'post' },
            { label: '✂️ Ciseaux', action: 'post' },
            { label: '📊 Stats', action: 'post' }
          ];
          break;
        case 4: // Stats
          imageUrl = await generateStatsImage(userAddress, contract);
          buttons = [
            { label: '🎮 Rejouer', action: 'post' },
            { label: '🏆 Classement', action: 'post' }
          ];
          postUrl = `${process.env.NEXT_PUBLIC_URL}/api/play`;
          break;
      }
    }

    // Retourner la Frame response
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          ${buttons.map((btn, i) => `<meta property="fc:frame:button:${i + 1}" content="${btn.label}" />`).join('\n          ')}
          <meta property="fc:frame:post_url" content="${postUrl}" />
        </head>
      </html>
    `);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function checkPlayerExists(contract: ethers.Contract, address: string): Promise<boolean> {
  try {
    const player = await contract.joueurs(address);
    return player.existe;
  } catch {
    return false;
  }
}

async function generateResultImage(choice: number, userAddress: string, contract: ethers.Contract): Promise<string> {
  // Simuler le résultat (dans la vraie version, il faudrait appeler le contrat)
  const choices = ['🪨 Pierre', '📄 Papier', '✂️ Ciseaux'];
  const computerChoice = Math.floor(Math.random() * 3);
  
  const result = determineWinner(choice, computerChoice);
  
  return `${process.env.NEXT_PUBLIC_URL}/api/image/result?player=${choice}&computer=${computerChoice}&result=${result}`;
}

async function generateStatsImage(userAddress: string, contract: ethers.Contract): Promise<string> {
  try {
    const stats = await contract.obtenirStats();
    return `${process.env.NEXT_PUBLIC_URL}/api/image/stats?v=${stats[1]}&d=${stats[2]}&e=${stats[3]}&s=${stats[6]}&b=${stats[7]}`;
  } catch {
    return `${process.env.NEXT_PUBLIC_URL}/api/image/stats?v=0&d=0&e=0&s=0&b=0`;
  }
}

function determineWinner(player: number, computer: number): string {
  if (player === computer) return 'tie';
  if ((player === 0 && computer === 2) || 
      (player === 1 && computer === 0) || 
      (player === 2 && computer === 1)) {
    return 'win';
  }
  return 'lose';
}