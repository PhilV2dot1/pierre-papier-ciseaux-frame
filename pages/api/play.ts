import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://pierre-papier-ciseaux-frame.vercel.app';
  
  // Récupérer le bouton cliqué
  const buttonIndex = req.body?.untrustedData?.buttonIndex || 1;
  
  // Changer l'image selon le bouton
  let imageType = 'start';
  if (buttonIndex >= 1 && buttonIndex <= 3) {
    imageType = `result?player=${buttonIndex - 1}&computer=${Math.floor(Math.random() * 3)}&result=win`;
  } else if (buttonIndex === 4) {
    imageType = 'stats?v=5&d=3&e=2&s=2&b=5';
  }

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/image/${imageType}" />
    <meta property="fc:frame:button:1" content="🪨 Pierre" />
    <meta property="fc:frame:button:2" content="📄 Papier" />
    <meta property="fc:frame:button:3" content="✂️ Ciseaux" />
    <meta property="fc:frame:button:4" content="📊 Stats" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/play" />
  </head>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}