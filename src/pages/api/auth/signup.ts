import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { email, password } = body;

  if (method !== 'POST') {
    const errorMessage = `Incorrect method ${method}`;

    console.error(errorMessage);
    res.status(400).json({ message: errorMessage });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

export default handler;
