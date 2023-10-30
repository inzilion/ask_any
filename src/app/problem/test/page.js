'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/modal";
import { useSession } from "next-auth/react";

export default function Test(){
  const { data: session } = useSession();
  const [ problemList, setProblemList ] = useState([]);
  const [ problemData, setProblemData ] = useState('');
  const [ userOptions, setUserOptions ] = useState([])
  const [ modal, setModal ] = useState('');
  const [ countRight, setCountRight] =  useState(0);
  const sendBtnRef = useRef();

  const changeProblem = () => {
    const copyList = [...problemList];
    setProblemData(copyList.pop());
    setProblemList(copyList);
  }
  
  useEffect(()=>{
    fetch('/api/problem/test',
    {
      method: 'POST',
    })
    .then(res=>res.json())
    .then(result=>{
      const data = JSON.parse(result);
      setProblemList(data);
    })

  }, [])

  useEffect(()=>{
    const copyList = [...problemList];
    setProblemData(copyList.pop());
  }, [problemList])
  
  
  useEffect(()=>{
    console.log(problemData.options);
    const copy = Array.from(problemData.options, x=>x); 
    setUserOptions(copy.map(e=>{e.isTrue=false; return e}));
  }, [problemData])



  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const checkUserOptions = () => {
    const result = problemData.options.filter((e, i)=> e.isTrue !== userOptions[i].isTrue);
    if (result.length)  setCountRight(countRight+1);
    changeProblem();
  }

  return(
    <div className="flex flex-col gap-1">
      {modal}
      {problemData ? 
      <div>
        <div className="bg-blue-100 p-5 text-black-100">{problemData.title}</div>
        <div className="bg-blue-100 p-5">{problemData.description}</div>
        <div className="flex justify-center">
          {problemData.image ? <img className="w-1/2" src={problemData.image}/> : ""}
        </div>
        <div className="flex-col flex gap-2 bg-blue-100 p-5">
          {userOptions.map((e, i)=>
            <div key={i} className="flex gap-2">
              <div>
                <input 
                  type="checkbox"
                  checked={e.isTrue}
                  onChange={(e)=>setUserOptionsHandler(e, i)}
                />
              </div>
              <div>
                {e.content}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center p-3">
          <button 
            ref={sendBtnRef}
            className="w-1/2 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={checkUserOptions}
          >
            정답제출
          </button>
        </div>
      </div>
      : ''
      }
    </div>
  )
}