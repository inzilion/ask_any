'use client'

import { useEffect, useState } from 'react'
import ShowProblem from './showProblem'

export default function ContestMain({contestID}){
  const [ contest, setContest ] = useState({})
  const [ userAnswers, setUserAnswers] = useState([])
  const [ currentPtr, setCurrentPtr] = useState(0);

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
    console.log(contest.problems);
    console.log(userAnswers);
  },[userAnswers]);

  const setUserAnswersHandler = (e, i) => {
    if(e.target.id === "선택형")
      return setUserAnswers(answers => {answers[currentPtr] = e.target.value; return answers});
    setUserAnswers(answers => {
      answers[currentPtr] = answers[currentPtr].map((op, j) => {
        op.isTrue = i==j ? e.target.checked : op.isTrue;
        return op;
      });
      return answers;
    })
  }

  return(
    <>
      <div>
        <div className='text-xl text-center'>{contestID}</div>
        <div>
          {
            userAnswers?.length > 0
            ? <ShowProblem 
                problemData={contest.problems[currentPtr]} 
                userData={userAnswers[currentPtr]}
                handler={setUserAnswersHandler}
              />
              
            : ""
          }
        </div>
      </div>
    </>
  )
}