'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/modal';

export default function Profile(){
  const [ userData, setUserData ] = useState('');
  const [ userName, setUserName ] = useState(''); 
  const [ userMemo, setUserMemo ] = useState('');
  const [ modal , setModal] = useState('');

  useEffect(()=>{
    fetch('api/profile/get',{
      method: 'POST',
    })
    .then(res=>res.json())
    .then(json=>setUserData(json))  
  },[])
  
  return(
    <>
      { modal }      
      { userData ?
      <div>
        <div className='flex-col flex gap-4 p-5'>
          <div className='flex gap-2'>
            <div>이름:</div>
            <input type='text' defaultValue={userData.name}
              className='border focus-visible' onChange={(e)=>setUserName(e.target.value)}/>

          </div>
          <div className='flex gap-2'>
            <div>email:</div><div>{userData.email}</div>
          </div>
          <div className='flex gap-2'>
            <div>하고싶은말:</div>
            <input type='text' defaultValue={userData.memo}
              className='border' onChange={(e)=>setUserMemo(e.target.value)}/>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            type='button'
            className='rounded-md bg-red-500 bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
            onClick={()=>{
              fetch('api/profile/edit',{ 
                method: "POST", body:JSON.stringify({ memo:userMemo, name:userName })})
              .then(res=>res.json()
              .then(json=>{
                setModal(<Modal contents={{
                  title:"수정완료", 
                  description: "정보 수정이 완료되었습니다.",
                  btnLabel: "확인",
                }}/>)
                setTimeout(()=>setModal(''), 3000);
              }))
            }}
            >수정</button>
        </div>
      </div> 
      : "" }
    </>
  )
}