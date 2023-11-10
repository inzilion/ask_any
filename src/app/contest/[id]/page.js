'use client'

import ContestMain from '@/components/contest/contestMain';
import Guide from '@/components/contest/guide';
import { useState } from 'react'

export default function Id({params}){
  const [ isReday , setIsReady ] = useState(false);
  
  const setIsReadyHandler = () => setIsReady(true);

  return(
    <>
      {
        ! true//isReday
        ? <Guide handler={setIsReadyHandler}/>
        : <ContestMain contestID={params.id}/>
      }
    </>
  )
}