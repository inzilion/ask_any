export default function Selection({content, id, options, handler, value}){
  return(
    <div className='p-3 flex justify-between bg-gray-100'>
      <label className="text-sm">{content}: </label>
      <select 
        id = {id}
        className="h-full ring-1 rounded-md border-1 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        onChange={(e)=>handler(e)}
      >
      {
        options.map((e, i)=>{
          if(value == e)
            return <option selected key={i}>{e}</option>
          else
            return <option key={i}>{e}</option>
        }) 
      }
      </select>
    </div>
  )
}