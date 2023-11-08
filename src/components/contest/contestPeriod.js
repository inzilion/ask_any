export default function ContestPeriod({handler, startTime, endTime}){
  return(
    <>
      <div className="flex items-center gap-3">
        <div> 시작 시간 : </div>
        <input
          id='startTime' 
          type="datetime-local" 
          defaultValue={startTime.toISOString().slice(0, 19)}
          onChange={(e)=>handler(e)}
        />
      </div>
      <div className="flex items-center gap-3">
        <div> 소요 시간 : </div>
        <div>
          <input
            id='period' 
            type="number" 
            defaultValue={10}
            min={1} 
            className="text-right bg-red-200 w-1/4"
            onChange={(e)=>handler(e)}
          />
            분
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div> 종료 시간 : </div>
        <input 
          id='endTime'
          type="datetime-local" 
          defaultValue={endTime.toISOString().slice(0, 19)}
          onChange={(e)=>handler(e)}
        />
      </div>
    </>
  ) 
}