import { useEffect, useState } from "react";

export default function Timer({limit , handler}){
  const getSeconds = (time) => {
    const seconds = Number(time % 60);
    if(seconds < 10) {
      return "0" + String(seconds);
    } else {
      return String(seconds);
    }
  }

  const [time, setTime] = useState(limit*60); // 남은 시간 (단위: 초)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        handler(prev);
        return prev - 1
      });
      }, 1000);
      return () => clearInterval(timer);
  }, []);
  
  return (
      <div className="flex gap-5 p-2">
          <h1>남은 시간</h1>
          <div>
              <span>{parseInt(time / 60)}</span>
              <span> : </span>
              <span>{getSeconds(time)}</span>
          </div>
      </div>
  );

  return(
    <>

    </>
  )
}