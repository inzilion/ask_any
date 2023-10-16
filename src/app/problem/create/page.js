'use client'
import dayjs from "@/util/myDay";
import Selection from "@/components/selection";
import Options from "@/components/options";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import Modal from '@/components/modal';

export default function Create(){
  const { data: session } = useSession();
  const mockData = {
    date: dayjs().toString(),
    author: session?.user,
    category: "상식",
    level: "상",
    type: "선택형",
    title: "",
    description: "",
    image:"",
    options: [],
  }
  
  const [ problemData, setProblemData ] = useState(mockData);
  const [ optionContent, setOptionContent] = useState('');
  const optionContentRef = useRef();

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
      copy.options.push({isTrue: false, content: optionContent});
      optionContentRef.current.value = "";
      optionContentRef.current.focus();
      setProblemData(copy);
    },
    removeOption: (copy, e, idx) => {
      copy.options.splice(idx,1)
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
      options: ['상', '중', '하'],
      handler: changeState,
    },
    
    category: {
      id: 'category',
      options: ['상식', '넌센스', '컴일'],
      handler: changeState,
    },

    type: {
      id: 'type',
      options: ['선택형', '단답형', '서술형'],
      handler: changeState,
    }
  }


  const [modal, setModal] = useState('');
  const createProblem = () => {
    if (!(problemData.title && problemData.description && problemData.options.length)){
      setModal(
        <Modal title={"문제등록에러"} content={"제목 또는 설명 또는 보기가 비어있습니다."} btnLabel={ "확인"} />
      );
      setTimeout(()=>setModal(''), 5000)
    }
      

  //problemData 서버로 전송

  }
  
  if(!session) return <Modal title={"로그인"} content={"로그인이 필요합니다."} btnLabel={ "확인"} />

  return(
    <div>
      {modal}
      <div className="m-5 flex gap-4 flex-col">
        <div className="flex-col flex gap-2 justify-between">
          <Selection content="분야" {...selectionData.category}/>
          <Selection content="난이도" {...selectionData.level}/>
          <Selection content="문제유형" {...selectionData.type}/>
        </div>
        <div>
          <input
            id='title'
            placeholder="제목을 입력하세요"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
          />
        </div>
        <div>
          <textarea
            id="description" 
            className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
            placeholder="문제 설명을 입력하세요"
          >
          </textarea>
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
        </div>
        <button
          type="button"
          onClick={createProblem}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          문제 등록
        </button>
      </div>        
    </div>
  )
}