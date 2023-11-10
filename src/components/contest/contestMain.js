'use client'

import { useEffect, useState } from 'react'

export default function ContestMain({contestID}){
  const [ contest, setContest ] = useState({})
  useEffect(()=>{
    fetch('/api/contest/get', { method: "POST", body: JSON.stringify({contestID: contestID})})
    .then(res=>res.json())
    .then(contest=>setContest(JSON.parse(contest)))
  },[])

  useEffect(()=>{
    console.log(contest)

  },[contest])

  return(
    <>
      <div>
        <div className='text-xl text-center'>{contestID}</div>
        <div>
          {
            contest
            ? contest.problems?.map((p, i) => <div key={i}>{p.title}</div>)
            : ""
          }
        </div>
      </div>
    </>
  )
}