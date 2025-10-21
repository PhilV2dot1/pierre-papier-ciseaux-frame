import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(307, 'https://api.farcaster.xyz/miniapps/hosted-manifest/0199fcb9-42f5-56f0-d6fd-9c5a7fca8daf');
}