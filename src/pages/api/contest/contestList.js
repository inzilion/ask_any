import client from "@/util/database";

export default async function handler(req, res){
  const db = client.db("ASK_ANY");
  const list = await db.collection('CONTESTS').find()
    .project({_id: 1, contestType: 1, title: 1, numOfProblems: 1, endTime: 1, isFinished: 1, period: 1}).sort({_id:-1}).toArray();
  return res.json(JSON.stringify(list));
}