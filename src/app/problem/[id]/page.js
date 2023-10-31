'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/modal";
import { useSession } from "next-auth/react";

export default function Id({params}){
  const { data: session } = useSession();
  const [ problemData, setProblemData ] = useState({});
  const [ userData, setUserData ] = useState('');
  const [ userOptions, setUserOptions ] = useState([]);
  const [ modal, setModal ] = useState('');
  const sendBtnRef = useRef();

  useEffect(()=>{
    fetch('/api/problem/get',
    {
      method: 'POST',
      body: params.id,
    })
    .then(res=>res.json())
    .then(result=>{
      const data = JSON.parse(result);
      let copy = JSON.parse(JSON.stringify([...data.problemData.options]));
      setUserOptions(copy.map(e=>{e.isTrue=false; return e}));
      setProblemData(data.problemData);
      setUserData(data.userData);
    })

  }, [])
  
  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const checkUserOptions = () => {
    const result = problemData.options.filter((e, i)=> e.isTrue !== userOptions[i].isTrue);
    let modalContents = ''
    if (result.length)  modalContents = { title:"오답", description: "틀렸습니다.", btnLabel: "확인" }
    else                modalContents = { title:"정답", description: "정답입니다.", btnLabel: "확인" }
    setModal(<Modal contents={modalContents}/>)
    setTimeout(() => {
      setModal('')
    }, 3000);
    const countRight = modalContents.title ==="정답" ? 1 : 0;
    fetch('/api/problem/counter', {
        method: "POST",
        body: JSON.stringify({ id: params.id, key: 'countRight', value: countRight}),
    })
    .then(res=>res.json())
    .then(json=>console.log(json));  

}

  return(
    <div className="flex flex-col divide-y ">
      {modal}
      { userData ? (
        userData.problems[params.id]?.isSolved ? 
          <div className='flex justify-center p-3 items-center gap-3'>
            <p>이미 문제를 해결하셨습니다.</p>
            <button 
              className='rounded-md bg-lime-300 px-4 py-2 text-sm font-medium text-black  hover:bg-lime-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              onClick={()=>{setUserOptions(problemData.options); sendBtnRef.current.className="hidden";}}
            >
              정답보기
            </button>
          </div> : ""
        ): ""}
      {
        (session && problemData) ? 
          (session.user.email === problemData.author?.email) || (session.user.email === "inzilion@gmail.com") ?
          <div className="flex justify-center gap-3">
            <div className='grid justify-items-end py-2'>
              <a href={`/problem/edit?id=${params.id}`}
                className='rounded-md bg-blue-300 px-4 py-2 text-sm font-medium text-black  hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                onClick={()=>{}}
              >
                문제수정
              </a>
            </div>
            <div className='grid justify-items-end py-2'>
              <a href="#"
                className='rounded-md bg-red-300 px-4 py-2 text-sm font-medium text-black  hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                onClick={()=>{}}
              >
                문제삭제
              </a>
            </div>
          </div>
        : ""
        : ""
      }        
      <div className="p-3 text-black-100">제목: {problemData.title}</div>
      <div className="p-3">{problemData.description}</div>
      <div className="flex justify-center">
        {problemData.image ? <img className="w-1/3 p-2" src={problemData.image}/> : ""}
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
  )
}