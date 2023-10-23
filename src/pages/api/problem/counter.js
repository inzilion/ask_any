import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const data = JSON.parse(req.body);
  const db = await client.db("ASK_ANY");
  const foundDoc = await db.collection("PROBLEMS").findOne({_id: new ObjectId(data.id)});

  if(!foundDoc.countRight) foundDoc.countRight = 0;
  if(!foundDoc.countTry)   foundDoc.countTry = 0;

  foundDoc[data.key] += data.value;
  foundDoc.countTry += 1;
  
  const result  = await db.collection("PROBLEMS").updateOne({_id: new ObjectId(data.id)},{$set: foundDoc});

  const session = await getServerSession(req, res, authOptions);
  let userData = await db.collection("USERS").findOne({email: session.user.email});

//  console.log(session.user.email);
  if(userData === null){
    userData = {
      user: session.user,
      email: session.user.email,
      problems:{},
    }
    await db.collection('USERS').insertOne(userData);
  }
  if(!userData.problems[data.id])
    userData.problems[data.id] = {isSolved: false, tryCount: 0};
  
  if(userData.problems[data.id].isSolved === false){
    if(data.value) userData.problems[data.id].isSolved = true;
    else           userData.problems[data.id].isSolved = false;
    userData.problems[data.id].tryCount += 1;

    await db.collection('USERS').updateOne(
      {email: session.user.email}, 
      {$set: userData}
    )
  }

  return res.status(200).json(JSON.stringify(result));
}