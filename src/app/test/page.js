'use client'

import { useState } from "react"

export default function Test() {
  const [ aaa, setAaa] = useState([]);

  const onClickHandler = (e) => {
    setAaa(prev => [...prev, 'a']);
    console.log(aaa);
  }
  


  return (
    <>
      <button onClick={(e)=>onClickHandler(e)}>눌러 눌러</button>
    </>
  )
}