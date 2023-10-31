'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/modal";
import { useSession } from "next-auth/react";

export default function Practice(){
  const [ problemList, setProblemList ] = useState([]);
  const [ problemData, setProblemData ] = useState({options:[]});
  const [ userOptions, setUserOptions ] = useState([])
  const [ modal, setModal ] = useState('');
  const [ countRight, setCountRight] =  useState(0);
  const [ ptr, setPtr] = useState(0);
  
  
  useEffect(()=>{
    fetch('/api/problem/practice', { method: 'POST'})
    .then(res=>res.json())
    .then(result=>setProblemList(JSON.parse(result)))
  }, [])

  useEffect(()=>{
    setProblemData(problemList[ptr]);
    setUserOptions(problemList.map(p=>p.options.map(option=>{option.isTrue=false; return option;})))
  }, [problemList])

  useEffect(()=>setProblemData(problemList[ptr]), [ptr]);

  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const checkUserOptions = (offset) => {
    const result = problemData.options.filter((e, i)=> e.isTrue !== userOptions[ptr][i].isTrue);
    if (result.length)  setCountRight(countRight+1);
    setPtr(offset);
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
        <div className="flex justify-center p-3 gap-3">
          {ptr>0 ?
          <button 
            className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={()=>{checkUserOptions(-1)}}
          >
            이전 문제
          </button>
          :''}
          <button 
            className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={()=>{checkUserOptions(1)}}
          >
            다음 문제
          </button>
          {ptr==9 ?
          <button 
            className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={()=>{checkUserOptions(0)}}
          >
            결과보기
          </button>
          :''}

        </div>
      </div>
      : ''
      }
    </div>
  )
}