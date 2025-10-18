import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const buttonIndex = body?.untrustedData?.buttonIndex || 1;
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://pierre-papier-ciseaux-frame.vercel.app';
    
    // Générer l'image selon le bouton cliqué
    let imageUrl = `${baseUrl}/api/image/start`;
    
    if (buttonIndex === 1) {
      imageUrl = `${baseUrl}/api/image/result?player=0&computer=${Math.floor(Math.random() * 3)}&result=win`;
    } else if (buttonIndex === 2) {
      imageUrl = `${baseUrl}/api/image/result?player=1&computer=${Math.floor(Math.random() * 3)}&result=lose`;
    } else if (buttonIndex === 3) {
      imageUrl = `${baseUrl}/api/image/result?player=2&computer=${Math.floor(Math.random() * 3)}&result=tie`;
    } else if (buttonIndex === 4) {
      imageUrl = `${baseUrl}/api/image/stats?v=5&d=3&e=2&s=2&b=5`;
    }

    // Retourner une Frame response valide
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🪨 Pierre" />
          <meta property="fc:frame:button:2" content="📄 Papier" />
          <meta property="fc:frame:button:3" content="✂️ Ciseaux" />
          <meta property="fc:frame:button:4" content="📊 Stats" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/play" />
        </head>
        <body></body>
      </html>
    `);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}