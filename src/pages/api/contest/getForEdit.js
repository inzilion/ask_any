import client from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
  const receiveData = JSON.parse(req.body);
  const db = client.db("ASK_ANY");
  const contest = await db.collection('CONTESTS').findOne({_id: new ObjectId(receiveData.contestID)})
  return res.json(JSON.stringify(contest));
}