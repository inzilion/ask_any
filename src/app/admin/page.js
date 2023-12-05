'use client'

import ContestList from '@/components/admin/contestList';
import Msg from '@/components/common/msg';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import { ADMINS } from '@/util/data';
import { Tab } from '@headlessui/react';
import ContestCreate from '@/components/admin/contestCreate';

export default function Admin(){
  const [ contestList, setContestList ] = useState([]);
  const { data: session } = useSession();
  const mockData = {
    '대회관리': ()=><ContestList list={contestList}/>,
    '대회만들기': ()=><ContestCreate/>,
    '사용자관리': ()=>'개발중',
  }
  const [ tabContents, setTabContent ] = useState(mockData)
  
  const classNames = (...classes) => classes.filter(Boolean).join(' ');

  useEffect(()=>{
    fetch("/api/contest/contestList", { method: "POST" })
    .then(res => res.json())
    .then(list => setContestList(JSON.parse(list)))
  }, [])

  useEffect(()=>{
    if(contestList.length==0) return;
    setTabContent(mockData);
  }, [contestList])

  return (
    <>
      { ADMINS.includes(session?.user.email)
        ? 
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-lg bg-yellow-700 p-1 mt-1">
              {Object.keys(tabContents).map(tab => 
                <Tab 
                  key={tab}
                  className={({ selected }) => (
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm leading-5',
                      'ring-yellow/60 ring-offset-2 ring-offset-yellow-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-yellow-500 text-lg shadow font-bold'
                        : 'text-yellow-100 hover:bg-yellow/[0.12] hover:text-white'
                    )
                  )}
                >
                  {tab}
                </Tab>
              )}
            </Tab.List>
            <Tab.Panels className="mt-1">
              {Object.values(tabContents).map((content, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-lg bg-white p-1',
                    'ring-white/60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {content()}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

        : <Msg msg="관리자만 확인할 수 있습니다."/>
      }
    </>
  )
}