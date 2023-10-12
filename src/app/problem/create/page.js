'use client'
import dayjs from "@/util/myDay";
import Selection from "@/components/selection";
import AddOption from "@/components/addOption";
import Options from "@/components/options";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Create(){
  const { data: session } = useSession();
  const data = {
    date: dayjs().toString(),
    author: session?.user,
    level: "상",
    category: "상식",
    type: "선택형",
    title: "",
    description: "",
    image:"",
    options: [
      {
        isTrue: false,
        content: '보기1',
      },
      {
        isTrue: true,
        content: '보기2',
      },
    ],
  }

  const [ problemData, setProblemData ] = useState(data)

  const changeState = (e) => {
    if(e.target.id === 'image'){
      const file = e.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        data.image = reader.result;
        setProblemData(data);    
      }
      return;
    }
    data[e.target.id] = e.target.value;
    setProblemData(data);
    console.log(problemData);
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
        <div className="flex justify-between ">
          <Selection {...selectionData.category}/>
          <Selection {...selectionData.level}/>
          <Selection {...selectionData.type}/>
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
        <div>
          <img src={problemData.image}/>
          <input id="image" type="file" onChange={changeState}/>
        </div>
        <div>
          <Options options={problemData.options}/>
          <AddOption/>
        </div>
      </div>        
    </div>
  )
}