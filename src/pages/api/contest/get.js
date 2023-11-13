import client from '@/util/database';
import { ObjectId } from 'mongodb';
import fs from "fs";

export default async function handler(req, res){
  const contestID = JSON.parse(req.body).contestID;
  const db = client.db("ASK_ANY");
  const contest = await db.collection('CONTESTS').findOne({_id: new ObjectId(contestID)})

  let problemList = await db.collection('PROBLEMS').find({_id: { $in: contest.problems.map(p=> new ObjectId(p))}}).toArray(); 
  
  problemList = problemList.map(p=>{
    if(p.image)
      try{
        p.image = fs.readFileSync(p.image, 'utf-8');
      } catch {
        p.image = '';
      }
    return p;
  }) 
  
  contest.problems = problemList;
  
  return res.json(JSON.stringify(contest));
}