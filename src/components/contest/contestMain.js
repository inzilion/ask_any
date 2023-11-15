'use client'

import { useEffect, useRef, useState } from 'react'
import ShowProblem from './showProblem'
import ShowBottomButtons from './showBottomButtons'
import Msg from '../common/msg'
import Timer from './timer'

export default function ContestMain({contestID, email}){
  const [ contest, setContest ] = useState('')
  const [ userAnswers, setUserAnswers ] = useState('')
  const [ currentPtr, setCurrentPtr ] = useState(0);
  const [ isLoadData, setIsLoadData ] = useState(false);
  const answerInput = useRef();

  useEffect(()=>{
    fetch('/api/contest/get', { method: "POST", body: JSON.stringify({contestID: contestID, email: email})})
    .then(res=>res.json())
    .then(contest=>setContest(JSON.parse(contest)))
  },[])

  useEffect(()=>{
    if(contest.problems == undefined) return;
    
    const copy = JSON.parse(JSON.stringify(contest.problems));
    setUserAnswers(copy.map((p, i)=>{
      if(p.type === "선택형") return { options: p.options.map((op, j) => {op.isTrue = false; return op}), answer:''};
      if(p.type === "단답형") return { options: [], answer: ''};
    }))
  },[contest])

  useEffect(()=>{
    if(!userAnswers || !contest) return;
    // console.log(contest);
    // console.log(userAnswers);
    setIsLoadData(true);
  }, [userAnswers]);

  const setUserAnswersHandler = (e, i) => {
    if(e.target.id === "answer")
      return setUserAnswers(answers => { answers[currentPtr].answer = e.target.value; return answers });
    
    const copy = [...userAnswers];
    copy[currentPtr].options.map((op, j) => {
      op.isTrue = i==j ? e.target.checked : op.isTrue;
      return op;
    })
    setUserAnswers(copy);
  }

  const setCurrentPtrHandler = (e) => {
    if(e.target.id == 'nextButton') setCurrentPtr(currentPtr+1);
    if(e.target.id == 'preButton') setCurrentPtr(currentPtr-1);
    if(e.target.id == 'submitButton') setCurrentPtr(0);
    if(answerInput.current) answerInput.current.value = "";
  }

  return(
    <>
      <div>
        <div>
        {
          isLoadData
          ? <div>
              <div className='flex justify-end text-red-500'>
                <Timer limit={contest.period}/>
              </div>
              <ShowProblem 
                problemData={contest.problems[currentPtr]} 
                userData={userAnswers[currentPtr]}
                handler={setUserAnswersHandler}
                refer = {answerInput}
              />
              <ShowBottomButtons 
                numOfProblems={contest.numOfProblems} 
                currentPtr={currentPtr} 
                handler={setCurrentPtrHandler} 
              />
            </div>
          : <div> 
              <Msg msg="로딩중..."/>
            </div>
        }
        </div>
      </div>
    </>
  )
}