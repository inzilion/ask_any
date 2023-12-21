'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProblemList(){
  const [ problemList, setProblemList ] = useState([]);
  //const [ currentUser, setCurrentUser] = useState('');

  useEffect(()=>{
    fetch("/api/problem/listForAdmin", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      const resData = (JSON.parse(data));
      setProblemList(resData.problemList);
//  setCurrentUser(resData.currentUserData);
//      console.log(resData)
    })
  }, [])


  return(
    <>
      {
        problemList.length 
        ? problemList.map((p, i) => 
          <div className='border-b-2 pt-1' key={i}>
              <Link href={`/problem/${p._id}`}> {`${p.title}(${p.description}):`}</Link>
              <span> {
                p.answer == ''
                ? (p.options.filter(op=>op.isTrue))[0].content
                : p.answer
              }
              </span>
          </div>)
        :  ""
      }
    </>
  )
}


// import { useSession } from 'next-auth/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { useEffect, useState } from 'react';
// import Pagination from '../common/pagination';

// export default function ProblemList({problemList, userData}){
//   const { data: session } = useSession();
//   const [ currentPage, setCurrentPage] = useState(1);
//   const [ currentList, setCurrentList] = useState([])

//   useEffect(() => setCurrentList(problemList.slice(0,10)), [])

//   useEffect(() => setCurrentList(problemList.slice(currentPage*10-10, currentPage*10)), [currentPage])

//   const setCurrentPageHandler = (e, i) => {
//     i = i<1 ? 1 : i;
//     i = i>parseInt(problemList.length/10)+1 ? parseInt(problemList.length/10)+1 : i;
//     setCurrentPage(i<1?1:i)
//   };
  
//   return (
//     <>
//       <div>
//         <ul className="divide-y divide-gray-300 p-2">
//         {currentList.map((p, i) => {
//           // if(p.hidden == undefined || p.hidden == "공개" || session?.user?.email == "inzilion@gmail.com") 
//           return (
//             <li key={i} className="flex justify-between gap-x-6 py-2">
//               <div className="flex min-w-0 gap-x-4 pl-3">
//                 <div>
//                   { userData ? (userData.problems[p._id] === undefined ? <div className="w-4"></div>
//                     : userData.problems[p._id]?.isSolved ? <FontAwesomeIcon style={{color: "green"}} icon={faCheck}/> 
//                     : <FontAwesomeIcon style={{color: "red"}} icon={faXmark}/>) : ""}
//                 </div>
//                 <div className="flex flex-col">
//                   <div className='flex items-center'>
//                     <span className='text-sm'>{`${p.category}:`}&nbsp; </span>
//                     {
//                       (session && p.hidden == "공개") || session?.user?.email == "inzilion@gmail.com" 
//                       ? <a href={`/problem/${p._id.toString()}`} className="text-sm font-semibold leading-6 text-gray-900">{`${p.title}(${p.hidden})`}</a>
//                       : <p className="text-sm font-semibold leading-6 text-gray-900">{`${p.title}(${p.hidden})`}</p>
//                     }
//                   </div>
//                   <p className="mt-1 truncate text-xs leading-5 text-gray-500">출제자: {p.author.name}</p>
//                 </div>
//               </div>
//               <div className='flex justify-ps-end flex-col w-9'>
//                 <div className='text-xs'>정답률</div>
//                 <div className='text-xs'>{(p.countRight/p.countTry*100).toFixed(1)}%</div>
//               </div>
//             </li>
//           )}
//         )}
//         </ul>
//       </div>
//       <div>
//         <Pagination 
//           numOfElements={problemList.length} 
//           currentPage={currentPage} 
//           handler={setCurrentPageHandler}/>  
//       </div>    
//     </>
//   )
// }


