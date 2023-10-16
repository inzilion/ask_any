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
    })

  }, [])
  
  return(
    <div className="flex flex-col gap-2 pl-3 pt-3">
      <div>{problemData.title}</div>
      <div>{problemData.description}</div>
      <div>
        {problemData.options?.map((e, i)=>
          <div className="flex">
            <div>
              <input type="checkbox"/>
            </div>
            <div>
              {e.content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}