import client from '@/util/database';
import { ObjectId } from 'mongodb';
import fs from "fs";

export default async function handler(req, res){
  const receiveData = JSON.parse(req.body);
  const db = client.db("ASK_ANY");
  const contest = await db.collection('CONTESTS').findOne({_id: new ObjectId(receiveData.contestID)})

  if(/* receiveData.email != "inzilion@gmail.com" && */contest.participants.filter(p=>p.email == receiveData.email).length)
    return res.json(JSON.stringify({title: "Already joined user"}));

  console.log(await db.collection('CONTESTS').updateOne(
      { _id: new ObjectId(receiveData.contestID) },
      { $addToSet: { participants: { email: receiveData.email, answers: [], result: 0 , remainTime: 0, currentPtr: 0 } } }
  ))

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