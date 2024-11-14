import connectToDatabase from '@/lib/mongodb';
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { name, email, password } = req.body;

    // Basic input validation (you should use Zod here as well)
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Correctly await the Promise to get the MongoClient
    const client = await connectToDatabase;
    const db = client.db(); // Access the database

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);

    await db.collection('users').insertOne({
      name,
      email,
      hashedPassword,
    });

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
