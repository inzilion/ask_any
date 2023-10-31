import client from "@/util/database";
import fs from "fs";
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
  const data = JSON.parse(req.body);
  const {_id, ...newData} = data;
  if(newData.image){
    const copyImgStr = newData.image;
    const file = _id.toString();
    const path = `src/_imgData/${file}.txt`;
    fs.writeFile(path, copyImgStr, (err)=>console.log(err));
    newData.image = path;
    newData.countTry = 0;
    newData.countRight = 0;
  }
  
  const db = client.db("ASK_ANY");
  const result = await db.collection("PROBLEMS").updateOne(
    {_id: new ObjectId(_id)},
    {$set: newData}
  )
  const ret = await db.collection('USERS').updateMany(
    {
      [`problems.${_id}.isSolved`]: true
    }, 
    {
      $set: {
        [`problems.${_id}`]: {
          isSolved: false, 
          countTry: 0
        }
      }
    }
  );
  return res.status(200).json(ret);
}