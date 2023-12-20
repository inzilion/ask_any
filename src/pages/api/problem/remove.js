import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ADMINS } from "@/util/data";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  if(!ADMINS.includes(session.user.email)) return res.redirect(302,'/info?msg=NOT_ADMIN')
  const problemId = req.query._id;
  const db = await client.db("ASK_ANY");
  const result = await db.collection("PROBLEMS").deleteOne({_id: new ObjectId(problemId)});
  return res.redirect(302, '/problem/list');
}