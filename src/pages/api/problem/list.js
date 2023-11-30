import client from "@/util/database";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  const db = client.db("ASK_ANY");
  const problemList = await db.collection('PROBLEMS').find().project({_id: 1, category: 1, title: 1, author: 1, countRight: 1, countTry: 1}).sort({_id:-1}).toArray();
  const userData = await db.collection('USERS').findOne({email: session?.user.email});
  const data = { problemList: problemList, currentUserData: userData}

  return res.json(JSON.stringify(data));
}