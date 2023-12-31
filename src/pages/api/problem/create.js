import client from "@/util/database";
import fs from "fs";

export default async function handler(req, res){
  let copyImgStr = '';
  let path = '';
  const data = JSON.parse(req.body);

  if(data.image){
    copyImgStr = data.image;
    data.image =''
  } 

  const db = await client.db('ASK_ANY')
  const result = await db.collection('PROBLEMS').insertOne({...data})
  const file = result.insertedId.toString();
  
  if(copyImgStr){
    path = `src/_imgData/${file}.txt`;
    fs.writeFile(path, copyImgStr, (err)=>console.log(err));
  }

  const finalResult = await db.collection("PROBLEMS").updateOne(
    {_id: result.insertedId},
    {$set:{
      image: path,
    }}
  )
  return res.status(200).json(finalResult);
}