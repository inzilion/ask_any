import client from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.redirect(302, '/info?msg=method');

  const db = (await client).db('ASK_ANY');
  const result = await db.collection('USERS').find({email:req.body.email}).toArray();

  if(result.length > 0) return res.redirect(302, '/info?msg=already');
  
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  req.body.memo = "열심히 공부하세";
  req.body.image = "";
  req.body.problems = {};

  await db.collection('USERS').insertOne(req.body);
  res.redirect(302, '/info?msg=OK');
}