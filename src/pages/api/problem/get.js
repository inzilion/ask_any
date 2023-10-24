import client from "@/util/database";
import { ObjectId } from "mongodb";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  const db = await client.db("ASK_ANY");
  const problemData = await db.collection("PROBLEMS").findOne({_id: new ObjectId(req.body)});
  const userData = await db.collection("USERS").findOne({email: session.user.email});
  if(problemData.image) 
    try{
      problemData.image = fs.readFileSync(problemData.image, 'utf-8');
    } catch {
      problemData.image = '';
    }
  
  const data = {problemData: problemData, userData:userData} 
  console.log('called "get" API');
  return res.status(200).json(JSON.stringify(data));
}