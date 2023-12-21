'use client'

import { useEffect, useState, useRef } from "react"
import Modal from "@/components/common/modal";
const MAX_PROBLEM = 20;

export default function Practice(){
  const [ problemList, setProblemList ] = useState([]);
  const [ problemData, setProblemData ] = useState({options:[]});
  const [ userOptions, setUserOptions ] = useState(Array(MAX_PROBLEM).fill([]));
  const [ userAnswer, setUserAnswer] = useState(Array(MAX_PROBLEM).fill(''));
  const [ modal, setModal ] = useState('');
  const [ ptr, setPtr] = useState(0);
  const [ ready, setReady ] = useState(false);
  const [ numberOfProblems, setNumberOfProblems ] = useState(5);

  const inputRef = useRef();

  const getProblems = () => {
    fetch('/api/problem/practice', { 
      method: 'POST', 
      body: JSON.stringify({number: numberOfProblems}) 
    })
    .then(res=>res.json())
    .then(result=>{
      setProblemList(JSON.parse(result));
      setReady(true);
    })
  }

  useEffect(()=>{
    setProblemData(problemList[ptr]);
    const copyOptions = JSON.parse(JSON.stringify(problemList.map(p=>p.options)));
    setUserOptions(copyOptions.map(p=>p.map(op=>{op.isTrue = false; return op;})));
    }, [problemList])

  useEffect(()=> {
    ptr < numberOfProblems ? setProblemData(problemList[ptr]) : "";
    if(inputRef.current) {
      inputRef.current.value = userAnswer[ptr];
    // console.log(inputRef.current, userAnswer)
    }
  }, [ptr]);
  
  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[ptr][i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const setUserAnswerHandler = (e) => {
    const copy = [...userAnswer];
    copy[ptr] = e.target.value;
    setUserAnswer(copy);
  }

  const checkUserOptions = (offset) => {
    setPtr(ptr+offset);
  }

  const showResult = () => {
    const descriptionArray = problemList.map((p, i) => {
      if(i>=numberOfProblems) return '';
      let isRight = false;
      if(p.options.length > 0 && (p.options.length == p.options.map((op, j) => op.isTrue == userOptions[i][j].isTrue).reduce((acc, cur) => acc + cur, 0))) isRight = true;
      if((p.answer != "") && (p.answer == userAnswer[i])) isRight = true;
      let resultStr = `${i+1}번: ${p.title}:`;
      if(isRight) resultStr += "⭕\n";
      else        resultStr += "❌\n"
      return resultStr;
    })
    const description = descriptionArray.reduce((acc, cur)=> acc + cur, '');
    const modalContents = { title:"결과", description: description, btnLabel: "확인" }
    setModal(<Modal contents={modalContents}/>)
  }

  return(
    <>
      { ready 
        ?
        <div className="flex flex-col gap-1">
          {modal}
          {problemData ? 
          <div className="flex flex-col divide-y">
            <div className="bg-blue-100 p-2 text-black-100">{ptr+1}번 문제</div>
            <div className="p-2 text-black-100 text-center">제목: {problemData.title}</div>
            {
              problemData.category == "초성퀴즈"
              ? <div className="p-3 text-center text-7xl">{problemData.description}</div>
              : <div className="p-3 text-center">{problemData.description}</div>
            }
            <div className="flex justify-center">
              {problemData.image ? <img className="w-1/3" src={problemData.image}/> : ""}
            </div>
            {problemData.type =="선택형"
            ? <div className="flex-col flex gap-2 bg-blue-100 p-5">
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
            : <div className="flex justify-center">
                <input
                  ref={inputRef}
                  id='answer'
                  placeholder="정답을 입력하세요."
                  className="w-1/2 rounded-md border-2 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{setUserAnswerHandler(e)}}
                />
              </div>
            }
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
                ptr < numberOfProblems-1  ?
                  <button 
                    className="w-1/6 rounded-md bg-green-600 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={()=>{checkUserOptions(1)}}
                  >
                    다음 문제
                  </button>
    
                :
                  <button 
                    className="w-1/6 rounded-md bg-red-700 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
        :
        <div className="flex-col pt-10 flex gap-5">
          <div className="flex justify-center">연습할 문제 수를 선택하고 확인 버튼을 누르세요.</div>
          <div className="flex justify-center gap-2">
            <span>문제 수 : </span>
            <select className="border " onChange={(e) => setNumberOfProblems(e.target.value)}>
              <option defaultValue={5}>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button 
              className="w-1/6 rounded-md bg-green-700 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={ getProblems }
            >
              확 인
            </button>
          </div>
        </div>
      }
    </>
  )
}