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

    return(
    <>
      <ul className="divide-y divide-gray-300 p-3">
        <li className="flex justify-between py-2">
          <div className='flex justify-center w-1/8'><p>순위</p></div>
          <div className='flex justify-center w-1/8'><p>이름</p></div>
          <div className='flex justify-center w-1/2'><p>하고 싶은 말</p></div>
          <div className='flex justify-center w-1/8'><p>맞춘문제수</p></div>
          <div className='flex justify-center w-1/8'><p>정답률</p></div>
        </li>
        {rankList.map((user, i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5">
            <div className='flex justify-center w-1/8'>
              <p className='text-xs pl-3'>{i+1}</p>
            </div>
            <div className="flex justify-center w-1/8 gap-2">
              <img className="h-6 w-6 flex-none rounded-full bg-gray-50" src={user.image} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
              </div>
            </div>
            <div className='flex justify-center w-1/2'>
              <div className='text-xs'>{user.memo}</div>
            </div>
            <div className='flex justify-center w-1/8'>
              <div className='text-xs'>{user.sumOfSolved}</div>
            </div>
            <div className='flex justify-center w-1/8'>
              <div className='text-xs'>{user.rightRate}%</div>
            </div>
          </li>
        ))}
      </ul>    
    </>
  )
}