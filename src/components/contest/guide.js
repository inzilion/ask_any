import { useEffect, useState } from 'react';
import Button from '../common/button';

export default function Guide({handler}){
  const [ isChecked, setIsChecked ] = useState(false);

  return(
    <>
      <div className='grid justify-items-center gap-5 mt-10 bg-green-100 p-5'>
        <div>
          <p className='text-3xl text-center text-red-600'>주의 사항</p>
          <p className='text-lg p-7'>참가 도중 브라우저를 끄거나, 다른 페이지로 이동하면 평가에 <span className='text-red-600 text-xl'>불이익</span>을 당할 수 있습니다.</p>
        </div>
        <div className='flex gap-3'>
          <input type="checkbox" onChange={(e)=>{setIsChecked(e.target.checked)}} /><p className='text-lg'>예, 동의합니다.</p> 
        </div>
        { 
          isChecked
          ? <Button size={"1/3"} color={"red"} caption={"시 작"} handler={handler}/>
          : ""
        }  
      </div>
    </>
  )
}