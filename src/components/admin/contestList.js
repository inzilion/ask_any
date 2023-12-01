export default function ContestList({list}){
  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="flex justify-between justify-center p-1 bg-yellow-500">
            <th className="w-1/12">구분</th>
            <th className="w-6/12">평 가 명</th>
            <th className="w-1/12">문제수</th>
            <th className="w-2/12">제한시간</th>
            <th className="w-1/12">상태</th>
            <th className="w-1/12">결과</th>
          </tr>
        </thead>
        <tbody>
        { list.map((contest, i) =>{
            const isEndContest = (new Date(contest.endTime) - new Date(new Date().toISOString()) - 3600*9*1000) > 0 ? false : true;
            return( 
              <tr key={i} className="flex justify-between justify-center p-1 border-b border-blue-300" >
                <td className="grid justify-items-center w-1/12">{contest.contestType}</td>
                <td className="grid justify-items-center w-6/12"><a href={`/contest/${contest._id}`}>{contest.title}</a></td>
                <td className="grid justify-items-center w-1/12">{contest.numOfProblems}</td>
                <td className="grid justify-items-center w-2/12">{contest.period}분</td>
                <td className="grid justify-items-center w-1/12">{isEndContest ? <p className='text-rose-500'>종료</p> : <p className='text-green-500'>진행중</p>}</td>
                <td className="grid justify-items-center w-1/12">
                  <a href={`/admin/eval?contestID=${contest._id}`}>
                    {contest.isFinished ? <p className='bg-green-500 text-green-100 h-5'>확인</p> : <p className='bg-rose-500 text-rose-100 h-5'>미채점</p>}
                  </a>
                </td>
              </tr>
            )
          }
        )}
        </tbody>
      </table>
    </>
  )
}