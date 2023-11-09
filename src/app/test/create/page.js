'use client'
import dayjs from "@/util/myDay";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Modal from '@/components/modal';
import ProblemList from "@/components/contest/problemList";
import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contestType } from '@/util/data';
import Selection from '@/components/selection';
import ContestPeriod from '@/components/contest/contestPeriod';
import { RemoveScrollBar, noScrollbarsClassName, fullWidthClassName  } from "react-remove-scroll-bar";

const timeOffset = 1000*60*60*9;
const mockData = {
  contestType: "모의평가",
  startTime: new Date(new Date().getTime() + timeOffset),
  endTime: new Date(new Date().getTime() + timeOffset + 1000*60*10),
  period: 10,
  title: '대회 제목을 입력하세요.',
  problems: [],
  participants: [],
  isFinished: false,
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
      list = JSON.parse(list);
      list = list.map(e => {e.isSelected = false; return e;})
      setProblemList(list);
    })
  },[]);

  const setProblemListHandler = (i) => {
    let copy = [...problemList];
    copy[i].isSelected = copy[i].isSelected ? false : true;
    setProblemList(copy);
  };

  const setSelectedProblemListHandler = (i) => {
    let copy = [...selectedProblemList];
    copy[i].isSelected = copy[i].isSelected ? false : true;
    setSelectedProblemList(copy);
  };

  const moveToSelectedList = () => {
    let selectedCopy = JSON.parse(JSON.stringify(problemList.filter(e=>e.isSelected)));
    let originCopy = problemList.filter(e => !e.isSelected);

    selectedCopy = selectedCopy.map(e => {e.isSelected = false; return e;});

    setProblemList([...originCopy])
    setSelectedProblemList([...selectedProblemList, ...selectedCopy]);
  };

  const moveToOriginList = () => {
    let selectedCopy = JSON.parse(JSON.stringify(selectedProblemList.filter(e=>e.isSelected)));
    let originCopy = selectedProblemList.filter(e => !e.isSelected);

    selectedCopy = selectedCopy.map(e => {e.isSelected = false; return e;});

    setSelectedProblemList([...originCopy])
    setProblemList([...problemList, ...selectedCopy]);

  }

  const contestHandlerMap = {
    startTime: (copy, e) => copy.startTime = new Date(e.target.value),
    endTime: (copy, e) => copy.endTime = new Date(e.target.value),
    period: (copy, e) => {
      copy.period = e.target.value;
      copy.endTime = new Date(copy.startTime.getTime() + timeOffset + 1000 * 60 * copy.period);
    },
  }

  const setContestHandler = (e) => {
    const copy = {...contest};
//    console.log(e.target.id, e.target.value)
    try{
      contestHandlerMap[e.target.id](copy, e);
    } catch {
      copy[e.target.id] = e.target.value;
    }
//    console.log(copy);
    setContest(copy);
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

  const selectionData = {
    contestType: {
      id: 'contestType',
      options: contestType,
      handler: setContestHandler,
    },
  }

  if(!session) 
    return 
      <Modal contents={{ 
        title:"로그인에러", 
        description: "로그인이 필요합니다..",
        btnLabel: "확인"}}
      />

  return(
    <div className={fullWidthClassName}>
      {modal}
      <div className="flex gap-5 flex-col m-5">
        <Selection content="대회 유형" {...selectionData.contestType}/>
        <ContestPeriod handler={setContestHandler} startTime={contest.startTime} endTime={contest.endTime} />

        <div className="flex items-center">
          <label>제목 : </label>
          <input
            id='title'
            placeholder="대회 제목을 입력하세요"
            className="w-1/2 rounded-md border-0 py-1.5 pl-3 pr-20 ml-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>setContestHandler(e)}
          />
        </div>
        
        <div className="flex gap-3 flex justify-between">
          <ProblemList isSelected={false} list={problemList} title="모든 문제" handler={setProblemListHandler}/>
          <div className="flex flex-col gap-10 mt-40">
            <FontAwesomeIcon 
              className="hover:cursor-pointer" 
              style={{color: "green", fontSize: "30px"}} 
              icon={faArrowAltCircleRight}
              onClick={moveToSelectedList}
            />
            <FontAwesomeIcon 
              className="hover:cursor-pointer" 
              style={{color: "red", fontSize: "30px"}} 
              icon={faArrowAltCircleLeft}
              onClick={moveToOriginList}
            />
          </div>
          <ProblemList isSelected={true} list={selectedProblemList} title="대회 출제 문제" handler={setSelectedProblemListHandler}/>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={createContest}
            className="absolute bottom-5 w-1/2 rounded-md bg-green-800 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            대회 만들기
          </button>
        </div>
      </div>        
    </div>
  )
}