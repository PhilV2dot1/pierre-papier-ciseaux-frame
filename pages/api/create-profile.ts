// pages/api/create-profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

const CONTRACT_ABI = [
  "function creerProfil(string memory _nom) public",
  "function joueurs(address) public view returns (string memory nom, uint256 victoires, uint256 defaites, uint256 egalites, uint256 serieActuelle, uint256 meilleureSerie, bool existe)"
];

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!; // Pour signer les transactions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const { untrustedData } = body;
    const fid = untrustedData?.fid;
    const userAddress = untrustedData?.address;

    if (!fid || !userAddress) {
      return res.status(400).json({ error: 'Invalid frame message' });
    }

    // Connecter au contrat avec un wallet pour signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    // Vérifier si le profil existe déjà
    const player = await contract.joueurs(userAddress);
    
    if (player.existe) {
      // Profil existe déjà, rediriger vers le jeu
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL}/api/image/start" />
            <meta property="fc:frame:button:1" content="🪨 Pierre" />
            <meta property="fc:frame:button:2" content="📄 Papier" />
            <meta property="fc:frame:button:3" content="✂️ Ciseaux" />
            <meta property="fc:frame:button:4" content="📊 Stats" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/play" />
          </head>
        </html>
      `);
    }

    // Créer le profil (utilise FID comme nom par défaut)
    const playerName = `Player${fid}`;
    
    try {
      // Note: Dans une vraie app, vous devriez demander à l'utilisateur de signer
      // ou utiliser un système de gasless transactions (comme un relayer)
      const tx = await contract.creerProfil(playerName);
      await tx.wait();

      // Profil créé avec succès
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL}/api/image/welcome?name=${playerName}" />
            <meta property="fc:frame:button:1" content="🎮 Commencer à jouer" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/play" />
          </head>
        </html>
      `);
    } catch (error: any) {
      console.error('Error creating profile:', error);
      
      // En cas d'erreur, retourner une image d'erreur
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL}/api/image/error?msg=Erreur creation profil" />
            <meta property="fc:frame:button:1" content="🔄 Réessayer" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/create-profile" />
          </head>
        </html>
      `);
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}