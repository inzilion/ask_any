import client from "@/util/database";
import fs from "fs";

export default async function handler(req, res){
  const db = await client.db("ASK_ANY");
  const numOfProblems = JSON.parse(req.body).number;
  //console.log(numOfProblems);
  let problemList = await db.collection("PROBLEMS").aggregate([{$sample: {size: Number(numOfProblems)}}]).toArray();

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