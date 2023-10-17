import client from "@/util/database";
import { ObjectId } from "mongodb";
import fs from "fs";

export default async function handler(req, res){
  const db = await client.db("ASK_ANY");
  const result = await db.collection("PROBLEMS").findOne({_id: new ObjectId(req.body)});

  if(result.image)
    try{
      result.image = fs.readFileSync(result.image, 'utf-8');
    } catch {
      result.image = '';
    }
  
  return res.status(200).json(JSON.stringify(result));
}