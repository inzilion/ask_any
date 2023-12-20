'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/common/modal";
import { useSession } from "next-auth/react";
import Button from '@/components/common/buttons';

export default function Id({params}){
  const { data: session } = useSession();
  const [ problemData, setProblemData ] = useState({});
  const [ userData, setUserData ] = useState('');
  const [ userOptions, setUserOptions ] = useState([]);
  const [ userAnswer, setUserAnswer ] = useState('');
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

  const setUserAnswerHandler = (e) => {
    setUserAnswer(e.target.value);
  }

  const checkUserOptions = () => {
    
    let result = [];
    if(problemData.type == "선택형") result = problemData.options.filter((e, i) => e.isTrue !== userOptions[i].isTrue);
    if(problemData.type == "단답형" && problemData.answer != userAnswer) result.push(true);

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
    <div className="flex flex-col divide-y gap-2">
      {modal}
      { userData ? (
        userData.problems[params.id]?.isSolved ? 
          <div className='flex justify-center p-3 items-center gap-3'>
            <p>이미 문제를 해결하셨습니다.</p>
            <button 
              className='rounded-md bg-lime-300 px-4 py-2 text-sm font-medium text-black  hover:bg-lime-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              onClick={()=>{
                setUserOptions(problemData.options); 
                setUserAnswer(problemData.answer); 
                sendBtnRef.current.className="hidden";
              }}
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
              <a href={`/api/problem/remove?_id=${problemData._id}`}
                className='rounded-md bg-red-300 px-4 py-2 text-sm font-medium text-black  hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              >
                문제삭제
              </a>
            </div>
          </div>
        : ""
        : ""
      }        
      <div className="p-3 text-center text-black-100">제목: {problemData.title}</div>
      {
        problemData.category == "초성퀴즈"
        ? <div className="p-3 text-center text-7xl">{problemData.description}</div>
        : <div className="p-3 text-center">{problemData.description}</div>
      }
      <div className="flex justify-center">
        {problemData.image ? <img className="border w-1/2 m-2" src={problemData.image}/> : ""}
      </div>
      { problemData.type == "선택형" 
      ? <div className="flex-col flex gap-2 bg-blue-100 p-5">
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
      : 
        <div className="flex justify-center">
          <input
            id='answer'
            placeholder="정답을 입력하세요."
            defaultValue={userAnswer}
            className="w-1/2 rounded-md border-2 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{setUserAnswerHandler(e)}}
          />
        </div>
      }
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