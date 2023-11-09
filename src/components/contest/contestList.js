export default function ContestList({list}){
  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="flex justify-between justify-center gap-10 p-2 bg-blue-600 text-white">
            <th className="w-2/12">대회유형</th>
            <th className="w-6/12">대회명</th>
            <th className="w-1/12">문제수</th>
            <th className="w-2/12">참가자수</th>
            <th className="w-1/12">종료</th>
          </tr>
        </thead>
        <tbody>
        { list.map((contest, i) => 
          <tr key={i} className="flex justify-between justify-center gap-10" >
            <td className="w-2/12">{contest.contestType}</td>
            <td className="w-6/12">{contest.title}</td>
            <td className="w-1/12">{contest.numOfProblems}</td>
            <td className="w-2/12">{contest.numOfParticipants}</td>
            <td className="w-1/12">{contest.isFinished ? "마감" : "진행중"}</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}