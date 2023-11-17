export default function ShowProblem({problemData, userData, handler, refer}){
  return(
    <>
      <div className="flex flex-col divide-y">
        <div className="p-2 text-black-100">제목: {problemData.title}</div>
        <div className="grid justify-items-center">
          <div className="p-5 text-lg">{problemData.description}</div>
          {problemData.image ? <img className="w-1/3 pb-5" src={problemData.image}/> : ""}
        </div>
        {problemData.type =="선택형"
        ? <div className="flex-col flex gap-2 bg-blue-100 p-5">
            {userData.options.map((e, i)=>
              <div key={i} className="flex gap-2">
                <div>
                  <input
                    type="checkbox"
                    checked={e.isTrue}
                    onChange={(e)=>handler(e, i)}
                  />
                </div>
                <div>
                  {e.content}
                </div>
              </div>
            )}
          </div>
        : <div className="flex justify-center pt-5">
            <input
              ref={refer}
              id='answer'
              placeholder="정답을 입력하세요."
              defaultValue={userData.answer}
              className="w-full rounded-md border-2 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e)=>{handler(e)}}
            />
          </div>
        }
      </div>
    </>
  )
}