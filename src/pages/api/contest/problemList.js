import client from "@/util/database";

export default async function handler(req, res){
  const db = client.db("ASK_ANY");
  const list = await db.collection('PROBLEMS').find().project({_id: 1, category: 1, title: 1, author: 1}).sort({_id:-1}).toArray();
  return res.json(JSON.stringify(list));
}