export default function Selection({id, options, handler}){
  return(
    <select 
      id = {id}
      className="h-full ring-1 rounded-md border-1 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      onChange={(e)=>handler(e)}
    >
    {
      options.map((e, i)=><option key={i}>{e}</option>)
    }
    </select>
  )
}