'use client'

import ContestList from '@/components/contest/contestList';
import { useEffect, useState } from 'react'

export default function Contest(){
  const [ contestList, setContestList ] = useState([]);
  
  useEffect(()=>{
    fetch("/api/contest/contestList", { method: "POST" })
    .then(res => res.json())
    .then(list => setContestList(JSON.parse(list)))
  }, [])


  return (
    <>
      <div>
        <ContestList list={contestList}/>
      </div>
    </>
  )
}