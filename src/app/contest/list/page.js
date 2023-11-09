'use client'

import ContestList from '@/components/contest/contestList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'

export default function Contest(){
  const [ contestList, setContestList ] = useState([]);
  const { data: session } = useSession();
  
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