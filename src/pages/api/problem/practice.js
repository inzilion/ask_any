import client from "@/util/database";
import fs from "fs";

export default async function handler(req, res){
  const db = await client.db("ASK_ANY");
  let problemList = await db.collection("PROBLEMS").aggregate([{$sample: {size: 10}}]).toArray();

  problemList = problemList.map(p=>{
    if(p.image)
      try{
        p.image = fs.readFileSync(p.image, 'utf-8');
      } catch {
        p.image = '';
      }
    return p;
  }) 
  return res.status(200).json(JSON.stringify(problemList));
}