import client from "@/util/database";

export default async function handler(req, res){
  const data = JSON.parse(req.body);
  const db = await client.db('ASK_ANY')
  const result = await db.collection('CONTESTS').insertOne({...data})
  
  return res.status(200).json(result);
}