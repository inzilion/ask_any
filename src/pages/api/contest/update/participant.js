import client from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
  const receiveData = JSON.parse(req.body);
  const contestID = receiveData.contestID;
  delete receiveData.contestID;
  console.log(receiveData)
  const db = client.db('ASK_ANY');
  
  let result = await db.collection('CONTESTS').updateOne(
    { _id: new ObjectId(contestID) },
    { $pull: { participants: { email: receiveData.email } } }
  )

  result = await db.collection('CONTESTS').updateOne(
    { _id: new ObjectId(contestID) },
    { $addToSet: { participants: receiveData } }
  )
  return res.json(result);
}