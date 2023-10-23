'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";

export default function Test(){
  return(
    <div className='flex justify-center items-center p-10 gap-5 '>
      <FontAwesomeIcon style={{color: "grey", fontSize:50}} icon={faHammer}/>
      <div>Under Construction...</div>      
    </div>
  )
}