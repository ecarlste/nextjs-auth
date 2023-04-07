import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, password },
    });
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

export default handler;
