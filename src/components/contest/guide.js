import { useEffect, useState } from 'react';
import { Button } from '../common/buttons';

export default function Guide({handler, contestType}){
  const [ isChecked, setIsChecked ] = useState(false);

  return(
    <>
      <div className='grid justify-items-center gap-5 mt-10 bg-green-100 p-5 text-center'>
        <div>
          <p className='text-3xl text-red-600'>주의 사항</p>
          <p className='text-lg p-7'>참가 도중 브라우저를 끄거나, 다른 페이지로 이동하면 평가에 <span className='text-red-600 text-xl'>불이익</span>을 당할 수 있습니다.</p>
          {
            contestType == "예능대회"
            ? <p className='text-lg p-7'><span className='text-red-600 text-2xl font-bold'>오답</span>을 제출하면 바로 <span className='text-red-600 text-2xl font-bold'>종료</span>됩니다.</p>
            : ""
          }
        </div>
        <div className='flex gap-3'>
          <input type="checkbox" onChange={(e)=>{setIsChecked(e.target.checked)}} /><p className='text-lg'>예, 동의합니다.</p> 
        </div>
        { 
          isChecked
          ? <Button size={"1/4"} color={'green'} caption={"시 작"} handler={handler}/>
          : ""
        }  
      </div>
    </>
  )
}