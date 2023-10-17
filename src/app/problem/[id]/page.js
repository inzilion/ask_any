'use client'

import { useEffect, useState } from "react"

export default function Id({params}){
  const [ problemData, setProblemData ] = useState('');
  
  useEffect(()=>{
    fetch('/api/problem/get',
    {
      method: 'POST',
      body: params.id,
    })
    .then(res=>res.json())
    .then(result=>{
      setProblemData(JSON.parse(result))
      console.log(problemData);
    })

  }, [])
  
  return(
    <div className="flex flex-col gap-1">
      <div className="bg-blue-100 p-2 text-black-100">{problemData.title}</div>
      <div className="bg-blue-100 p-2">{problemData.description}</div>
      <div className="flex justify-center">
        {problemData.image ? <img className="w-1/2" src={problemData.image}/> : ""}
      </div>
      <div className="flex-col flex gap-2 bg-blue-100 p-3">
        {problemData.options?.map((e, i)=>
          <div key={i} className="flex gap-2">
            <div>
              <input type="checkbox"/>
            </div>
            <div>
              {e.content}
            </div>
          </div>
        )}
      </div>
      <button className="rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">정답제출</button>
    </div>
  )
}