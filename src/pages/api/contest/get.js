import client from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
  const contestID = JSON.parse(req.body).contestID;
  console.log(contestID);
  const db = client.db("ASK_ANY");
  const contest = await db.collection('CONTESTS').findOne({_id: new ObjectId(contestID)})
  console.log(contest.title);

  return res.json(JSON.stringify(contest));
}