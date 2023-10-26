import client from '@/util/database';

export default async function Rank(){
  const db = client.db("ASK_ANY");
  let rankList = await db.collection("USERS").find().toArray();
  
  rankList = rankList
    .map(user => {
      const initValue = 0;
      const sumOfTry = Object.keys(user.problems)
        .reduce((acc, cur)=>acc + user.problems[cur].countTry, initValue);
      const sumOfSolved = Object.keys(user.problems)
        .reduce((acc, cur)=>acc + user.problems[cur].isSolved, initValue);
      user.sumOfSolved = sumOfSolved;
      user.rightRate = (sumOfSolved/sumOfTry*100).toFixed(1);
      return user;
    })
  
  rankList.sort((a, b)=>(b.sumOfSolved - a.sumOfSolved))

  return(
    <>
      <ul className="divide-y divide-gray-300 p-3">
        <li className="flex justify-between py-2">
          <div className='grid justify-items-center w-1/12'><p>순위</p></div>
          <div className='grid justify-items-center w-3/12'><p>이름</p></div>
          <div className='grid justify-items-center w-5/12'><p>하고 싶은 말 (25자)</p></div>
          <div className='grid justify-items-center w-2/12'><p>맞춘문제수</p></div>
          <div className='grid justify-items-center w-1/12'><p>정답률</p></div>
        </li>
        {rankList.map((user, i) => (
          <li key={i} className="flex justify-between py-2">
            <div className='grid justify-items-center w-1/12'>
              <p className='text-xs'>{i+1}</p>
            </div>
            <div className="grid justify-items-start w-3/12">
              <div className='flex gap-1'>
                <img className="h-6 w-6 rounded-full bg-gray-50" src={user.image} alt="" />
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
              </div>
            </div>
            <div className='grid justify-items-center w-5/12'>
              <div className='text-sm'>{user.memo}</div>
            </div>
            <div className='grid justify-items-center w-2/12'>
              <div className='text-sm'>{user.sumOfSolved}</div>
            </div>
            <div className='grid justify-items-end w-1/12'>
              <div className='text-sm'>{user.rightRate}%</div>
            </div>
          </li>
        ))}
      </ul>    
    </>
  )
}