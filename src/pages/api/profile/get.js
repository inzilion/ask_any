import client from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  const db = client.db("ASK_ANY");
  const user = await db.collection('USERS').findOne({email: session.user.email});
  return res.status(200).json(user);
}