'use client'

import ContestMain from '@/components/contest/contestMain';
import FuntestMain from '@/components/contest/funtestMain';
import Guide from '@/components/contest/guide';
import { useSession } from 'next-auth/react';
import { useState } from 'react'

export default function Id({params, searchParams}){
  const contestType = searchParams.ct;
  const { data: session } = useSession();
  const [ isReady , setIsReady ] = useState(false);
  const setIsReadyHandler = () => setIsReady(true);

  return(
    <>
    {
      !session 
      ? <div className='text-center text-3xl text-green-700 p-10'>로그인하세요.</div> 
      : <div>
        {
          !isReady
          ? <Guide handler={setIsReadyHandler} contestType={contestType}/>
          : contestType != "예능대회"
            ? <ContestMain contestID={params.id} email={session.user.email}/>
            : <FuntestMain contestID={params.id} email={session.user.email}/>
        }
        </div>
    }
    </>
  )
}