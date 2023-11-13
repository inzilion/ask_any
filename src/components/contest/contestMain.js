'use client'

import { useEffect, useState } from 'react'
import ShowProblem from './showProblem'
import ShowBottomButtons from './showBottomButtons'
import Loading from '../common/loading'

export default function ContestMain({contestID}){
  const [ contest, setContest ] = useState('')
  const [ userAnswers, setUserAnswers ] = useState('')
  const [ currentPtr, setCurrentPtr ] = useState(0);
  const [ isLoadData, setIsLoadData ] = useState(false);

  useEffect(()=>{
    fetch('/api/contest/get', { method: "POST", body: JSON.stringify({contestID: contestID})})
    .then(res=>res.json())
    .then(contest=>setContest(JSON.parse(contest)))
  },[])

  useEffect(()=>{
    if(contest.problems == undefined) return;
    
    const copy = JSON.parse(JSON.stringify(contest.problems));
    setUserAnswers(copy.map((p, i)=>{
      if(p.type === "선택형") return p.options.map((op, j) => {op.isTrue = false; return op});
      if(p.type === "단답형") return p.answer = '';
    }))
  },[contest])

  useEffect(()=>{
    if(!userAnswers || !contest) return;
    console.log(contest);
    console.log(userAnswers);
    setIsLoadData(true);
  }, [userAnswers]);

  const setUserAnswersHandler = (e, i) => {
    if(e.target.id === "선택형")
      return setUserAnswers(answers => {answers[currentPtr] = e.target.value; return answers});
    
    const copy = [...userAnswers];
    copy[currentPtr].map((op, j) => {
      op.isTrue = i==j ? e.target.checked : op.isTrue;
      return op;
    })
    setUserAnswers(copy);
  }

  const setCurrentPtrHandler = (e) => {
    if(e.target.id == 'nextButton') setCurrentPtr(currentPtr+1);
    if(e.target.id == 'preButton') setCurrentPtr(currentPtr-1);
    if(e.target.id == 'submitButton') setCurrentPtr(0);
  }

  return(
    <>
      <div>
        <div className='text-xl text-center p-5'>대회번호 : {contestID}</div>
        <div>
        {
          isLoadData
          ? <div>
              <ShowProblem 
                problemData={contest.problems[currentPtr]} 
                userData={userAnswers[currentPtr]}
                handler={setUserAnswersHandler}
              />
              <ShowBottomButtons 
                numOfProblems={contest.numOfProblems} 
                currentPtr={currentPtr} 
                handler={setCurrentPtrHandler} 
              />
            </div>
          : <Loading/>
        }
        </div>
      </div>
    </>
  )
}