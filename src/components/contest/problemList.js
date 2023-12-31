export default function ProblemList({isSelected, list, title, handler})
{
  return(
    <>
      <div className="flex-col w-5/12">
        <div className="flex justify-center">{title}</div>
        <div className="container border-4 h-96 overflow-auto">
          {
            list.length > 0 
            ? list.map((p, i) => p.isSelected 
              ? <div 
                  className= "bg-green-300 hover:cursor-pointer"
                  key={i}
                  onClick={()=>{handler(i)}}
                >
                  {p.category}: {p.title}
                    <span className='font-bold'> {
                      p.answer == ''
                      ? (p.options.filter(op=>op.isTrue))[0].content
                      : `${p.answer}(단답형)`
                    }
                    </span>
                </div> 
              :
                <div 
                  className= "hover:bg-green-400 hover:cursor-pointer"
                  key={i}
                  onClick={()=>{handler(i)}}
                >
                  {p.category}: {p.title}
                  <span className='font-bold'> {
                      p.answer == ''
                      ? (p.options.filter(op=>op.isTrue))[0].content
                      : `${p.answer}(단답형)`
                    }
                    </span>
                </div>) 
            : ""
          }
        </div>
      </div>
    </>
  )
}