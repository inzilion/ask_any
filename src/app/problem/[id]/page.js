'use client'

import { useEffect, useState } from "react"
import Modal from "@/components/modal";

export default function Id({params}){
  const [ problemData, setProblemData ] = useState({});
  const [ userOptions, setUserOptions ] = useState([]);
  const [ modal, setModal ] = useState('');
  
  useEffect(()=>{
    fetch('/api/problem/get',
    {
      method: 'POST',
      body: params.id,
    })
    .then(res=>res.json())
    .then(result=>{
      const data = JSON.parse(result);
      let copy = JSON.parse(JSON.stringify([...data.options]));
      setUserOptions(copy.map(e=>{e.isTrue=false; return e}));
      setProblemData(data);
    })

  }, [])
  
  const setUserOptionsHandler = (e, i) => {
    const copy = [...userOptions];
    copy[i].isTrue = e.target.checked;
    setUserOptions(copy);
  }

  const checkUserOptions = () => {
    const result = problemData.options.filter((e, i)=> e.isTrue !== userOptions[i].isTrue);
    let modalContents = ''
    if (result.length)  modalContents = { title:"오답", description: "틀렸습니다.", btnLabel: "확인" }
    else                modalContents = { title:"정답", description: "정답입니다.", btnLabel: "확인" }
    setModal(<Modal contents={modalContents}/>)
    setTimeout(() => {
      setModal('')
    }, 3000);
    const countRight = modalContents.title ==="정답" ? 1 : 0;
    fetch('/api/problem/counter', {
        method: "POST",
        body: JSON.stringify({ id: params.id, key: 'countRight', value: countRight}),
    })
    .then(res=>res.json())
    .then(json=>console.log(json));  

}

  return(
    <div className="flex flex-col gap-1">
      {modal}
      <div className="bg-blue-100 p-5 text-black-100">{problemData.title}</div>
      <div className="bg-blue-100 p-5">{problemData.description}</div>
      <div className="flex justify-center">
        {problemData.image ? <img className="w-1/2" src={problemData.image}/> : ""}
      </div>
      <div className="flex-col flex gap-2 bg-blue-100 p-5">
        {userOptions.map((e, i)=>
          <div key={i} className="flex gap-2">
            <div>
              <input 
                type="checkbox"
                onChange={(e)=>{setUserOptionsHandler(e, i)}}
              />
            </div>
            <div>
              {e.content}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center p-3">
        <button 
          className="w-1/2 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={checkUserOptions}
        >
          정답제출
        </button>
      </div>
    </div>
  )
}