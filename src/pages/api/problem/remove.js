import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  const problemId = req.body;
  const db = await client.db("ASK_ANY");
  const result = await db.collection("PROBLEMS").deleteOne({_id: new ObjectId(problemId)});
  return res.status(200).json(result);
}