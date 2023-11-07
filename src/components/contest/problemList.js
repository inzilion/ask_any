export default function ProblemList({isSelected, list, title, handler})
{
  return(
    <>
      <div className="flex-col w-5/12">
        <div className="flex justify-center">{title}</div>
        <div className="container border-4 h-1/3 overflow-auto">
          {
            list.length > 0 
            ? list.map((p, i) => p.isSelected 
              ? <div 
                  className= "bg-green-300 hover:cursor-pointer"
                  key={i}
                  onClick={()=>{handler(i)}}
                >
                  {p.category}: {p.title}
                </div> 
              :
                <div 
                  className= "hover:bg-green-400 hover:cursor-pointer"
                  key={i}
                  onClick={()=>{handler(i)}}
                >
                  {p.category}: {p.title}
                </div>) 
            : ""
          }
        </div>
      </div>
    </>
  )
}