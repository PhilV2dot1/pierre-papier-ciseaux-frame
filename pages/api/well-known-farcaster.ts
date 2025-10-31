import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const manifest = {
    "accountAssociation": {
      "header": "eyJmaWQiOjQ5MTM1MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGExZkM5MEYyMDU1MzlBNjlDOTg5OTdBYTEwMGEzQmJjOEYyRjY0OTIifQ",
      "payload": "eyJkb21haW4iOiJwaWVycmUtcGFwaWVyLWNpc2VhdXgtZnJhbWUudmVyY2VsLmFwcCJ9",
      "signature": "0phUl8Af3Dz9nRJJ2Q4q/T8ruKUFddsbCepLvU4nkbtsCacn6KkvazWn8MmIyd4aqsVWl64lGWGLwnnhlrcgwxs="
    },
    "frame": {
      "version": "1",
      "name": "Pierre Papier Ciseaux",
      "iconUrl": "https://pierre-papier-ciseaux-frame.vercel.app/icon.svg",
      "homeUrl": "https://pierre-papier-ciseaux-frame.vercel.app/game",
      "imageUrl": "https://pierre-papier-ciseaux-frame.vercel.app/splash.svg",
      "buttonTitle": "Jouer",
      "splashImageUrl": "https://pierre-papier-ciseaux-frame.vercel.app/splash.svg",
      "splashBackgroundColor": "#764ba2"
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(manifest);
}