import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Eval({searchParams}){
  const contestID = searchParams.contestID;
  const db = client.db("ASK_ANY");
  const contest = await db.collection("CONTESTS").findOne({_id: new ObjectId(contestID)})
  const problemList = await db.collection('PROBLEMS').find({_id: { $in: contest.problems.map(p=> new ObjectId(p))}}).toArray(); 

  const evalTable = Array.from(Array(contest.participants.length+1), ()=>new Array());
  evalTable[0].push("아이디");
  problemList.map((p, i) => evalTable[0].push(`${i+1}번`));

  contest.participants.map((part, i)=>{
    evalTable[i+1].push(part.email);
    problemList.map((pro, j)=>{
      evalTable[i+1].push(
        pro.options.length > 0 && contest.participants[i].answers.length > 0
        ? pro.options.map((op, k)=>op.isTrue == contest.participants[i].answers[j].options[k].isTrue).filter(e=>e).length==pro.options.length ? true: false
        : pro.answer == contest.participants[i].answers[j]?.answer ? true : false
      )
    })
  })
  console.log(evalTable);
  
  return(
    <>
      <table className="table-auto w-full mt-2">
        <tbody className="divide-y divide-gray-300">
        {
          evalTable.map((row, i)=>
            <tr key={i}>{row.map((el, j)=><td key={j}>{typeof(el)=='boolean'? el ? "⭕":"❌" : el}</td>)}</tr>
          )
        }
        </tbody>
      </table>         
    </>
  )
}