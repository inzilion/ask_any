import client from "@/util/database";

export default async function handler(req, res){
  const category = JSON.parse(req.body).category;
  //console.log(category)
  const db = client.db("ASK_ANY");
  let list = [];
  if (category =="전체" || category == "")
    list = await db.collection('PROBLEMS').find({}).project({_id: 1, category: 1, title: 1, author: 1}).sort({_id:-1}).toArray();
  else
    list = await db.collection('PROBLEMS').find({category:category}).project({_id: 1, category: 1, title: 1, author: 1}).sort({_id:-1}).toArray();
  return res.json(JSON.stringify(list));
}