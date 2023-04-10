import { hashPassword } from '@/lib/auth';
import { verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method !== 'PATCH') {
    const errorMessage = `Incorrect method ${method}`;

    console.error(errorMessage);
    res.status(400).json({ message: errorMessage });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const email = session.user?.email as string;
  const { oldPassword, newPassword } = body;

  try {
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    const passwordVerified = await verifyPassword(oldPassword, user.password);

    if (!passwordVerified) {
      throw new Error('Incorrect old password provided');
    }

    const hashedPassword = await hashPassword(newPassword);
    const updated = await prisma.user.update({
      data: { password: hashedPassword },
      where: { email },
    });

    res.status(201).json({ message: 'Password updated!' });
  } catch (error: any) {
    console.error(JSON.stringify(error.message));
    res.status(500).json({ message: error.message });
  }
}

export default handler;
