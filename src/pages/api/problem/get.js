import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  const db = await client.db("ASK_ANY");
  const result = await db.collection("PROBLEMS").findOne({_id: new ObjectId(req.body)});

  return res.status(200).json(JSON.stringify(result));
}