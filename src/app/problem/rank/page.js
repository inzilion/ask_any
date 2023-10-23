import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import client from '@/util/database';

export default async function Rank(){
  const db = client.db("ASK_ANY");
  const rankList = await db.collection("USERS").find().toArray();
  console.log(rankList);
  return(
    <>
      <div className='flex justify-center items-center p-10 gap-5 '>
        <FontAwesomeIcon style={{color: "grey", fontSize:50}} icon={faHammer}/>
        <div>Under Construction...</div>      
      </div>
    </>
  )
}