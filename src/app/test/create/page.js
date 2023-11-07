'use client'
import dayjs from "@/util/myDay";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Modal from '@/components/modal';
import ProblemList from "@/components/contest/problemList";
import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mockData = {
  startDate: dayjs().toString(),
  endDate: dayjs().toString(),
  title: '대회 제목을 입력하세요.',
  problems: [],
  participants: [],
}

export default function Create(){
  const { data: session } = useSession();
  const [ contest, setContest ] = useState(mockData);
  const [ modal, setModal ] = useState('');
  const [ problemList, setProblemList ] = useState([]);
  const [ selectedProblemList, setSelectedProblemList] = useState([]);

  useEffect(() => {
    fetch("/api/contest/list",{ method: "POST",})
    .then(res=>res.json())
    .then(list=>{
      setProblemList(JSON.parse(list));
    })
  },[]);


  const changeState = (e) => {
    let copy = {...contest};   
  }
  
  const createContest = () => {
    fetch('/api/contest/create', {
      method: 'POST',
      body: JSON.stringify(setContest),
    })
    .then(res=>res.json())
    .then(json=>{
      setModal(
        <Modal contents={{ 
          title:"등록완료", 
          description: "문제 등록이 완료되었습니다.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 5000);
    });
    setContest(mockData);
  }
  
  if(!session) 
    return 
      <Modal contents={{ 
        title:"로그인에러", 
        description: "로그인이 필요합니다..",
        btnLabel: "확인"}}
      />

  return(
    <div>
      {modal}
      <div className=" flex gap-2 flex-col m-5 ">
        <div className="flex items-center gap-3">
          <div> 시작 시간 : </div>
          <input type="datetime-local" defaultValue={(new Date().toISOString().slice(0, 19))}/>
        </div>
        <div className="flex items-center gap-3">
          <div> 소요 시간 : </div>
          <div>
            <input type="number" defaultValue={10} className="text-right bg-red-200 w-1/4"/>분
          </div>
        </div>

        <div className="flex items-center">
          <label>제목 : </label>
          <input
            id='title'
            placeholder="대회 제목을 입력하세요"
            className="w-1/2 rounded-md border-0 py-1.5 pl-3 pr-20 ml-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
          />
        </div>
        <div className="flex gap-3">
          <ProblemList list={problemList} title="모든 문제"/>
          <div className="flex flex-col gap-3 mt-40">
            <FontAwesomeIcon style={{color: "green", fontSize: "30px"}} icon={faArrowAltCircleRight}/>
            <FontAwesomeIcon style={{color: "red", fontSize: "30px"}} icon={faArrowAltCircleLeft}/>
          </div>
          <ProblemList list={selectedProblemList} title="대회 출제 문제"/>
        </div>
        

        <button
          type="button"
          onClick={createContest}
          className="rounded-md bg-green-800 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          대회 등록
        </button>
      </div>        
    </div>
  )
}