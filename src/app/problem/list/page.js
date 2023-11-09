'use client'

import { useState, useEffect } from 'react';
import AllProblemList from '@/components/problem/allProblemList';

export default function List(){
  const [ problemList, setProblemList ] = useState([]);
  const [ currentUser, setCurrentUser] = useState('');

  useEffect(()=>{
    fetch("/api/problem/list", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      const resData = (JSON.parse(data));
      setProblemList(resData.problemList);
      setCurrentUser(resData.currentUserData);
    })
  }, [])


  return(
    <>
      {
        problemList.length ? <AllProblemList problemList={problemList} userData={currentUser}/> : ""
      }
    </>
  )
}