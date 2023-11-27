import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Eval({searchParams}){
  const contestID = searchParams.contestID;
  const db = client.db("ASK_ANY");
  const contest = await db.collection("CONTESTS").findOne({_id: new ObjectId(contestID)})
  const problemList = await db.collection('PROBLEMS').find({_id: { $in: contest.problems.map(p=> new ObjectId(p))}}).toArray(); 
  console.log(contest.participants)
  return(
    <>
      {
        <table className="table-auto w-full mt-2">
        <thead>
          <tr className="flex justify-between justify-center p-2 bg-green-500 text-white">
            <th className="">이름</th>
            {
              problemList.map((p, i)=><th className="text-center">{i+1}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            contest.participants.map((part, i)=>
              <tr key={i}>
                <td>{part.email.slice(0,6)}</td>
              </tr>
            )
          }
        </tbody>
        </table>         
      }
    </>
  )
}