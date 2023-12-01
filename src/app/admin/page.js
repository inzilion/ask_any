'use client'

import ContestList from '@/components/admin/contestList';
import Msg from '@/components/common/msg';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react'
import { ADMINS } from '@/util/data';
import { Tab } from '@headlessui/react';
import ContestCreate from '@/components/admin/contestCreate';

export default function Admin(){
  const [ contestList, setContestList ] = useState([]);
  const { data: session } = useSession();
  
  useEffect(()=>{
    fetch("/api/contest/contestList", { method: "POST" })
    .then(res => res.json())
    .then(list => setContestList(JSON.parse(list)))
  }, [])


  return (
    <>
      { ADMINS.includes(session?.user.email)
        ? 
          <Tab.Group>
            <Tab.List className="flex gap-10 justify-center p-2 text-lg">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected ? 'bg-yellow-500 text-white p-1' : 'bg-white text-black'
                    }
                  >
                    대회관리
                  </button>
                )}
              </Tab>
              <Tab>대회만들기</Tab>
              <Tab>사용자관리</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ContestList list={contestList}/>
              </Tab.Panel>
              <Tab.Panel>
                <ContestCreate/>
              </Tab.Panel>
              <Tab.Panel>개발중</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

        : <Msg msg="관리자만 확인할 수 있습니다."/>
      }
    </>
  )
}