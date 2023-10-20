import client from "@/util/database"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List(){
  const session = await getServerSession(authOptions);
  const db = client.db("ASK_ANY");
  const list = await db.collection('PROBLEMS').find()
    .project({title: 1, author: 1, countRight: 1, countTry: 1}).sort({_id:-1}).toArray();
  const userData = await db.collection('USERS').findOne({email: session.user.email});
  return(
    <>
      <ul className="divide-y divide-gray-100 p-3">
        {list.map((item, i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 pl-3">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.author?.image} alt="" /> */}
              <div>
                { userData ? (userData.problems[item._id] === undefined ? <div className="w-3"></div>
                  : userData.problems[item._id]?.isSolved ? <FontAwesomeIcon style={{color: "green"}} icon={faCheck}/> 
                  : <FontAwesomeIcon style={{color: "red"}} icon={faXmark}/>) : ""}
              </div>
              <div className="min-w-0 flex-auto">
                <a href={`/problem/${item._id.toString()}`} className="text-sm font-semibold leading-6 text-gray-900">{item.title}</a>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">출제자: {item.author.name}</p>
              </div>
            </div>
            <div className='pr-3'>
              <div className='text-xs'>정답률</div>
              <div className='text-xs'>{(item.countRight/item.countTry*100).toFixed(1)}%</div>
            </div>
          </li>
        ))}
      </ul>    
    </>
  )
}