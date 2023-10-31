'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/modal";
const MAX_PROBLEM = 5;

export default function Practice(){
  const [ problemList, setProblemList ] = useState([]);
  const [ problemData, setProblemData ] = useState({options:[]});
  const [ userOptions, setUserOptions ] = useState(Array(MAX_PROBLEM).fill([]));
  const [ modal, setModal ] = useState('');
  const [ ptr, setPtr] = useState(0);
  
  useEffect(()=>{
    fetch('/api/problem/practice', { method: 'POST'})
    .then(res=>res.json())
    .then(result=>setProblemList(JSON.parse(result)))
  }, [])

  useEffect(()=>{
    setProblemData(problemList[ptr]);
    const copy = JSON.parse(JSON.stringify(problemList.map(p=>p.options)));
    setUserOptions(copy.map(p=>p.map(op=>{op.isTrue = false; return op;})));
    }, [problemList])

  useEffect(()=> ptr < MAX_PROBLEM ? setProblemData(problemList[ptr]) : "", [ptr]);
  
  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[ptr][i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const checkUserOptions = (offset) => {
    setPtr(ptr+offset);
    console.log(
      problemList.map((p, i)=>p.options.length == p.options.map((op, j)=> op.isTrue == userOptions[i][j].isTrue).reduce((acc, cur)=>acc+cur)).reduce((acc, cur)=>acc+cur)
    )
  }

  const showResult = () => {
    const sumRight = problemList.map((p, i)=>p.options.length == p.options.map((op, j)=> op.isTrue == userOptions[i][j].isTrue).reduce((acc, cur)=>acc+cur)).reduce((acc, cur)=>acc+cur)
    const modalContents = { title:"결과", description: `${sumRight}문제 맞췄습니다.`, btnLabel: "확인" }
    setModal(<Modal contents={modalContents}/>)

  }



  return(
    <div className="flex flex-col gap-1">
      {modal}
      {problemData ? 
      <div>
        <div className="bg-red-100 p-5 text-black-100">{ptr+1}번 문제</div>
        <div className="bg-blue-100 p-5 text-black-100">{problemData.title}</div>
        <div className="bg-blue-100 p-5">{problemData.description}</div>
        <div className="flex justify-center">
          {problemData.image ? <img className="w-1/2" src={problemData.image}/> : ""}
        </div>
        <div className="flex-col flex gap-2 bg-blue-100 p-5">
          {userOptions[ptr].map((e, i)=>
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
          {
            ptr>0 ?
              <button 
                className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={()=>{checkUserOptions(-1)}}
              >
                이전 문제
              </button>
            :''
          }
          {
            ptr < MAX_PROBLEM-1  ?
              <button 
                className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={()=>{checkUserOptions(1)}}
              >
                다음 문제
              </button>

            :
              <button 
                className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={showResult}
              >
                결과보기
              </button>
            }
        </div>
      </div>
      : ''
      }
    </div>
  )
}