'use client'
import dayjs from "@/util/myDay";
import Selection from "@/components/selection";
import Options from "@/components/options";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

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
  
  const [ problemData, setProblemData ] = useState(data);
  const [ optionContent, setOptionContent] = useState('');
  const optionContentRef = useRef();

  const changeOptionContent = (e) => setOptionContent(e.target.value);
  
  const changeStateMap = {
    image(copy,e){
      const file = e.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        copy.image = reader.result;
        setProblemData(copy);
      }
    },
    addOption(copy){
      copy.options.push({isTrue: false, content: optionContent});
      optionContentRef.current.value = "";
      optionContentRef.current.focus();
      setProblemData(copy);
    }
  }

  const changeState = (e) => {
    const copy = {...problemData}

    try {
      changeStateMap[e.target.id](copy,e);
    } catch {
      copy[e.target.id] = e.target.value;
      setProblemData(copy);
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

  return(
    <div>
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
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
          />
        </div>
        <div>
          <textarea
            id="description" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>changeState(e)}
          >
          </textarea>
        </div>
        <div className='flex-col grid justify-items-center gap-2'>
          <img src={problemData.image} width="50%"/>
          <input id="image" type="file" onChange={changeState} className='hidden'/>
          <label htmlFor="image" className='bg-blue-900 text-white hover:bg-blue-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>이미지 파일 선택</label>
        </div>
        <div>
          <Options 
            options={problemData.options}
            Ref={optionContentRef}
            changeOptionContent={changeOptionContent}
            changeState={changeState}
          />
        </div>
      </div>        
    </div>
  )
}