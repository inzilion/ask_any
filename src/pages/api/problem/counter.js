import client from "@/util/database";
import { ObjectId } from "mongodb";
import { findDOMNode } from "react-dom";

export default async function handler(req, res){
  const data = JSON.parse(req.body);
  console.log(data);
  const db = await client.db("ASK_ANY");
  const foundDoc = await db.collection("PROBLEMS").findOne({_id: new ObjectId(data.id)});

  if(!foundDoc.countRight) foundDoc.countRight = 0;
  if(!foundDoc.countTry)   foundDoc.countTry = 0;
  foundDoc.countRight += data.countRight;
  foundDoc.countTry += 1;
  
  const result  = await db.collection("PROBLEMS").updateOne({_id: new ObjectId(data.id)},
  {$set: foundDoc}
  );

  
  return res.status(200).json(JSON.stringify(result));
}