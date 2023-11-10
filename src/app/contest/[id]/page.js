'use client'

import Guide from '@/components/contest/guide';
import { useState } from 'react'

export default function Id({params}){
  const [ isReday , setIsReady ] = useState(false);
  
  return(
    <>
      {
        !isReday
        ? <Guide/>
        : ""
      }
    </>
  )
}