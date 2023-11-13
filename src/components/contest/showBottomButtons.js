export default function ShowBottomButtons({numOfProblems, currentPtr, handler}){
  return(
    <>
      <div className="flex justify-center p-3 gap-3">
      {
        currentPtr>0 ?
          <button
            id="preButton" 
            className="w-1/6 rounded-md bg-black bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={(e)=>{handler(e)}}
          >
            이전 문제
          </button>
        :''
      }
      {
        currentPtr < numOfProblems-1  ?
          <button
            id="nextButton"
            className="w-1/6 rounded-md bg-green-600 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={(e)=>{handler(e)}}
          >
            다음 문제
          </button>

        :
          <button
            id="submitButton" 
            className="w-1/6 rounded-md bg-red-700 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={(e)=>handler(e)}
          >
            제 출
          </button>
        }
    </div>

    </>
  )
}