import client from '@/util/database';
import { ObjectId } from 'mongodb';

export default function handler(req, res){
  const receiveData = JSON.parse(req.body);
  console.log(receiveData)
  const db = client.db('ASK_ANY');
  const result = db.collection('CONTESTS').updateOne(
    { _id: new ObjectId(receiveData.contestID) },
    { $addToSet: { participants: receiveData } }
)
  return res.json(result);
}