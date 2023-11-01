'use client'
import Selection from "@/components/selection";
import Options from "@/components/options";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Modal from '@/components/modal';
import  TextareaAutosize from "react-textarea-autosize";
import { level, category, type } from '@/util/data';

export default function Edit(props){
  const { data: session } = useSession();
  const [ problemData, setProblemData ] = useState('');
  const [ optionContent, setOptionContent] = useState('');
  const optionContentRef = useRef();

  useEffect(()=>{
    fetch('/api/problem/get', {
      method: 'POST',
      body: props.searchParams.id,
    })
    .then(res=>res.json())
    .then(json=>{
      const data = JSON.parse(json).problemData;
      setProblemData(data);
    })
  },[])

  useEffect(()=>{
    if(session && problemData)
      if(!(problemData.author.email === session.user.email || session.user.email ==="inzilion@gmail.com")){
      setModal(
        <Modal contents={{ 
          title:"비정상적인 접근", 
          description: "접근이 허가 되지 않은 사용자입니다.",
          btnLabel: "확인"}}
        />);
      setProblemData('');
      }
  }, [session, problemData])
  

  const changeOptionContent = (e) => setOptionContent(e.target.value);
  
  const changeStateMap = {
    image: (copy, e) => {
      const file = e.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        copy.image = reader.result;
        setProblemData(copy);
      }
    },
    addOption: (copy) => {
      if(optionContentRef.current.value){
        copy.options.push({isTrue: false, content: optionContent});
        setProblemData(copy);
      }
      optionContentRef.current.value = "";
      optionContentRef.current.focus();
    },
    removeOption: (copy, e, idx) => {
      copy.options.splice(idx,1)
      setProblemData(copy);
    },
    option: (copy, e, idx) => {
      copy.options[idx] = {
        isTrue: e.target.checked,
        content: copy.options[idx].content,
      }
      setProblemData(copy);
    },
    answer: (copy, e) => {
      copy.answer = e.target.value;
      setProblemData(copy);
    },
    type: (copy, e) => {
      copy.type = e.target.value;
      if(copy.type == "선택형") copy.answer = '';
      if(copy.type == "단답형") copy.options = [];
      setProblemData(copy);
    }
  }

  const changeState = (e, idx) => {
    const copyData = {...problemData}

    try {
      changeStateMap[e.target.id](copyData, e, idx);
    } catch {
      copyData[e.target.id] = e.target.value;
      setProblemData(copyData);
    }
  }

  const selectionData = {
    level: {
      id: 'level',
      options: level,
      handler: changeState,
    },
    
    category: {
      id: 'category',
      options: category,
      handler: changeState,
    },

    type: {
      id: 'type',
      options: type,
      handler: changeState,
    }
  }

  const [modal, setModal] = useState('');
  const editProblem = () => {

    if (!(problemData.title && problemData.description && (problemData.options.length||problemData.answer))){
      setModal(
        <Modal contents={{ 
          title:"문제등록에러", 
          description: "제목 또는 설명 또는 정답이 비어있습니다.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 5000);
      return;
    }
    
    if(problemData.type=="선택형" && !problemData.options.filter((e)=>e.isTrue===true).length){
      setModal(
        <Modal contents={{ 
          title:"정답에러", 
          description: "정답을 체크해주세요.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 5000);
      return;
    }

    fetch('/api/problem/edit', {
      method: 'POST',
      body: JSON.stringify(problemData),
    })
    .then(res=>res.json())
    .then(json=>{
      setModal(
        <Modal contents={{ 
          title:"수정완료", 
          description: "문제 수정이 완료되었습니다.",
          btnLabel: "확인"}}
        />
      );
      setTimeout(()=>setModal(''), 5000);
    });

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
      <div className="m-5 flex gap-4 flex-col">
        <div className="flex-col flex gap-2 justify-between">
          <Selection content="분야" {...selectionData.category} value={problemData.category}/>
          <Selection content="난이도" {...selectionData.level} value={problemData.level}/>
          <Selection content="문제유형" {...selectionData.type} value={problemData.type}/>
        </div>
        <div>
          <input
            id='title'
            defaultValue={problemData.title}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
          />
        </div>
        <div>
          <TextareaAutosize
            cacheMeasurements
            id="description" 
            className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
            defaultValue={problemData.description}
          >
          </TextareaAutosize>
        </div>
        <div className='flex-col grid justify-items-center gap-2'>
          <img src={problemData.image} width="50%"/>
          <input id="image" type="file" onChange={changeState} className='hidden'/>
          <label htmlFor="image" className='bg-blue-900 text-white hover:bg-blue-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>이미지 파일 선택</label>
        </div>
        <div>
          {problemData.type ==="선택형" ?
            <Options 
              options={problemData.options}
              Ref={optionContentRef}
              changeOptionContent={changeOptionContent}
              changeState={changeState}
            />
            : ""
          }
          {problemData.type ==="단답형" ?
            <input
              id='answer'
              placeholder="정답을 입력하세요."
              defaultValue={problemData.answer}
              className="w-1/2 rounded-md border-2 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e)=>{changeState(e)}}
            />
          : ""
          }
        </div>
        <button
          type="button"
          onClick={editProblem}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          문제 수정
        </button>
      </div>        
    </div>
  )
}