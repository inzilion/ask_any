export default function ProblemList({list, title})
{
  return(
    <>
      <div className="flex-col w-5/12">
        <div className="flex justify-center">{title}</div>
        <div className="container border-4 h-1/3 overflow-auto">
          {
            list.length > 0 
            ? list.map((p, i) => 
                <div 
                  className= "hover:bg-green-400 hover:cursor-pointer"
                  key={i}
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