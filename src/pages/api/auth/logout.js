import { setCookie } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Cookie'yi sil
  setCookie('token', '', { req, res, maxAge: -1 });

  res.status(200).json({ message: 'Logout successful' });
}
