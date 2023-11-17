import client from '@/util/database';

export default function handler(req, res){
  const receiveData = JSON.parse(req.body);
  console.log(receiveData)
  const db = client.db('ASK_ANY');
  //const result = db.collection('CONTESTS').updateOne({},{})
  return res.json({result: "OK"});
}