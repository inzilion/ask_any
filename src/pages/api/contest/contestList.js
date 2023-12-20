import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  const db = client.db("ASK_ANY");
  const list = await db.collection('CONTESTS').find()
    .project({_id: 1, contestType: 1, title: 1, numOfProblems: 1, endTime: 1, isFinished: 1, period: 1, result: 1, participants:1}).sort({_id:-1}).toArray();

  const modifyedList = list.map(el=>{ 
    if(el.participants.filter(p=>p.email === session?.user?.email).length>0)
      el.participants = true;
    else 
      el.participants = false;
    return el
    })
    //console.log(modifyedList);
  return res.json(JSON.stringify(modifyedList));
}