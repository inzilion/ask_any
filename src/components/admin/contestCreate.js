'use client'
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Modal from '@/components/common/modal';
import ProblemList from "@/components/contest/problemList";
import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contestType } from '@/util/data';
import Selection from '@/components/common/selection';
import ContestPeriod from '@/components/contest/contestPeriod';
import { category } from "@/util/data";

const timeOffset = 1000*60*60*9;
const mockData = {
  contestType: "모의평가",
  startTime: new Date(new Date().getTime() + timeOffset),
  endTime: new Date(new Date().getTime() + timeOffset + 1000*60*10),
  period: 10,
  title: '',
  problems: [],
  numOfProblems: 0,
  participants: [],
  numOfParticipants: 0,
  isFinished: false,
  result:[],
}

export default function ContestCreate(){
  const { data: session } = useSession();
  const [ contest, setContest ] = useState(mockData);
  const [ modal, setModal ] = useState('');
  const [ problemList, setProblemList ] = useState([]);
  const [ selectedProblemList, setSelectedProblemList] = useState([]);
  const [ topic, setTopic ] = useState('');

  useEffect(() => {
    setProblemList([]);
    setSelectedProblemList([]);
    fetch("/api/contest/problemList",{ method: "POST", body: JSON.stringify({category: topic})})
    .then(res=>res.json())
    .then(list=>{
      list = JSON.parse(list);
      list = list.map(e => {e.isSelected = false; return e;})
      setProblemList(list);
    })
  },[topic]);

  const setTopicHander = (e) => setTopic(e.target.value);

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
      copy.endTime = new Date(new Date(copy.startTime).getTime() + 1000 * 60 * e.target.value);
    },
    create:(copy, e) => {
      copy.problems = selectedProblemList.map(p=>p._id);
      copy.numOfProblems = selectedProblemList.length;
    },
  }

  const setContestHandler = (e) => {
    const copy = {...contest};
    try{
      contestHandlerMap[e.target.id](copy, e);
    } catch {
      copy[e.target.id] = e.target.value;
    }
    setContest(copy);
  }

  const createContest = (e) => {
    if(!contest.title){
      setModal(
        <Modal contents={{ 
          title:"입력오류", 
          description: "대회 제목을 입력하세요.",
          btnLabel: "확인"}}
        />) 
      setTimeout(() => setModal(''), 3000);
      return;
    }
    if(!selectedProblemList.length){
      setModal(
        <Modal contents={{ 
          title:"문제선택 오류", 
          description: "문제를 선택하세요.",
          btnLabel: "확인"}}
        />) 
      setTimeout(() => setModal(''), 3000);
      return;
    }

    setContestHandler(e);
  }

  useEffect(()=>{
  if(!contest.problems.length) return;

  fetch('/api/contest/create', {
      method: 'POST',
      body: JSON.stringify(contest),
    })
    .then(res=>res.json())
    .then(json=>{
      setModal(
        <Modal contents={{ 
          title:"등록완료", 
          description: "대회 등록이 완료되었습니다.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 3000);
    });
    setContest(mockData);

  }, [contest.problems])

  
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
    <div>
      {modal}
      <div className="flex gap-2 flex-col m-1">
        <div className="w-1/3 border-2 border-red-300">
          <Selection content="대회 유형" {...selectionData.contestType}/>
        </div>
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
        
        <div className="w-1/3">
          <Selection content="주제" {...{ id: 'category',  options: category, handler: setTopicHander }}/>
        </div>
        
        <div className="flex gap-3 flex justify-between">
          <ProblemList isSelected={false} list={problemList} title="미선택 문제" handler={setProblemListHandler}/>
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
            <button
              id='create'
              type="button"
              onClick={(e)=>createContest(e)}
              className="rounded-md bg-yellow-500 p-2 text-sm font-medium hover:p-3"
            >
              대회만들기
            </button>
          </div>
          <ProblemList isSelected={true} list={selectedProblemList} title="출제 문제" handler={setSelectedProblemListHandler}/>
        </div>
      </div>        
    </div>
  )
}