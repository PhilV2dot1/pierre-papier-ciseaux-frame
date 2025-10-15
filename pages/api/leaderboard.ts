// pages/api/leaderboard.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

const CONTRACT_ABI = [
  "function obtenirClassement() public view returns (address[] memory adresses, string[] memory noms, uint256[] memory victoires, uint256[] memory meilleuresSeries)"
];

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const { untrustedData } = body;
    const buttonIndex = untrustedData?.buttonIndex;

    // Connecter au contrat
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Récupérer le classement
    const [addresses, names, victories, bestStreaks] = await contract.obtenirClassement();

    // Générer l'URL de l'image du classement
    const params = new URLSearchParams();
    params.append('names', names.join(','));
    params.append('victories', victories.join(','));
    params.append('streaks', bestStreaks.join(','));

    const imageUrl = `${process.env.NEXT_PUBLIC_URL}/api/image/leaderboard?${params.toString()}`;

    let buttons: any[] = [];
    let postUrl = `${process.env.NEXT_PUBLIC_URL}/api/play`;

    if (buttonIndex === 2) {
      // Venant du menu stats, revenir au jeu
      buttons = [
        { label: '🎮 Rejouer', action: 'post' },
        { label: '📊 Mes Stats', action: 'post' }
      ];
      postUrl = `${process.env.NEXT_PUBLIC_URL}/api/play`;
    } else {
      // Navigation du classement
      buttons = [
        { label: '🎮 Jouer', action: 'post' },
        { label: '📊 Mes Stats', action: 'post' }
      ];
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
    console.error('Error fetching leaderboard:', error);
    
    // En cas d'erreur, retourner une image d'erreur
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL}/api/image/error?msg=Erreur classement" />
          <meta property="fc:frame:button:1" content="🔄 Réessayer" />
          <meta property="fc:frame:button:2" content="🎮 Retour au jeu" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/play" />
        </head>
      </html>
    `);
  }
}