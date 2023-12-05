'use client'

import { useEffect, useRef, useState } from 'react'
import ShowProblem from './showProblem'
import { Button } from '../common/buttons'
import Msg from '../common/msg'
import Timer from './timer'
import Modal from '../common/modal'

export default function FuntestMain({contestID, email}){
  const [ contest, setContest ] = useState('')
  const [ userAnswers, setUserAnswers ] = useState('')
  const [ currentPtr, setCurrentPtr ] = useState(0);
  const [ isLoadData, setIsLoadData ] = useState(false);
  const [ remainTime, setRemainTime ] = useState(100);
  const [ modal, setModal ] = useState('');
  const [ isEverythingOK, setIsEverythingOK ] = useState(false);
  const [ msg, setMsg ] = useState('로딩중...')
  const answerInput = useRef();

  useEffect(()=>{
    fetch('/api/contest/get', { method: "POST", body: JSON.stringify({contestID: contestID, email: email})})
    .then(res=>res.json())
    .then(contest=>setContest(JSON.parse(contest)))
  },[])

  useEffect(()=>{
    if(contest.title == "Already joined user") return setMsg("이미 참가하였습니다.");
    if(contest.problems == undefined) return;
    
    const copy = JSON.parse(JSON.stringify(contest.problems));
    setUserAnswers(copy.map((p, i)=>{
      if(p.type === "선택형") return { options: p.options.map((op, j) => {op.isTrue = false; return op}), answer:''};
      if(p.type === "단답형") return { options: [], answer: ''};
    }))
  },[contest])

  useEffect(()=>{
    if(!userAnswers || !contest) return;
    setIsLoadData(true);
  }, [userAnswers]);

  useEffect(()=>{
    if(answerInput.current) answerInput.current.value = userAnswers[currentPtr].answer || '';   
  }, [currentPtr]);
  
  useEffect(()=>{
    if(isEverythingOK) transferUserAnswers();
  },[isEverythingOK]);

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

  const checkUserAnswers = () => {
    if(userAnswers[currentPtr].options.filter(el=>el.isTrue).length == 0 && userAnswers[currentPtr].answer ==''){
      setModal(
        <Modal contents={{ 
          title:"오류", 
          description: "답을 입력하세요.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 3000);
      return    
    }
    
    if(contest.problems[currentPtr].type == "선택형"){ 
      if(contest.problems[currentPtr].options.filter((op, i) => op.isTrue != userAnswers[currentPtr].options[i].isTrue).length > 0)
        transferUserAnswers(currentPtr);
      else {
        if(currentPtr == contest.problems.length - 1)  transferUserAnswers(currentPtr+1);
        else                                           setCurrentPtr(currentPtr+1);
      }
      return
    }
    
    if(contest.problems[currentPtr].answer != userAnswers[currentPtr].answer.trim())
      transferUserAnswers(currentPtr);
    else {
      if(currentPtr == contest.problems.length - 1)  transferUserAnswers(currentPtr+1);
      else                                           setCurrentPtr(currentPtr+1);
    }


    // const isFinishAnswerArr = userAnswers.map(ans => ans.answer == '' &&  ans.options.filter(op => op.isTrue == true).length == 0)
    // if(isFinishAnswerArr.filter(e=>e).length > 0){
    //   setModal(
    //     <Modal contents={{ 
    //       title:"답안 확인", 
    //       description: "답안을 입력하지 않은 문제가 있습니다.",
    //       btnLabel: "확인"}}
    //     />
    //   );
    //   setTimeout(()=>setModal(''), 3000);
    //   return 
    // }
    // setIsEverythingOK(true);
  }
  
  useEffect(()=>{
    if(remainTime) return;
    transferUserAnswers(currentPtr);    
  }, [remainTime])

  const transferUserAnswers = (current) => {
    fetch('/api/contest/update/participant',{
      method: "POST",
      body: JSON.stringify({
        contestID: contestID, 
        email: email, 
        answers: userAnswers, 
        result: 0 , 
        remainTime: remainTime, 
        currentPtr: currentPtr,
      }),
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setIsLoadData(false);
      setModal(
        <Modal contents={{ 
          title:"제출 완료", 
          description: "답안 제출이 완료되었습니다.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 3000);
      setMsg(`총 ${current}문제 성공.`);
    })
  }


  return(
    <>
      <div>
        { modal }
        <div>
        {
          isLoadData
          ? <div>
              <div className='flex justify-end text-red-500'>
                <Timer limit={contest.period} handler={setRemainTime}/>
              </div>
              <div className='flex flex-col gap-3'>
                <ShowProblem 
                  problemData={contest.problems[currentPtr]} 
                  userData={userAnswers[currentPtr]}
                  handler={setUserAnswersHandler}
                  refer = {answerInput}
                />
                <Button 
                  id="confirm"
                  caption="확 인"
                  color="green"
                  size="w-1/3"
                  handler={checkUserAnswers}
                />
              </div>
            </div>            
          : <div> 
                <Msg msg={msg}/>
            </div>
        }
        </div>
      </div>
    </>
  )
}