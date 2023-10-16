export default function AddOption({ Ref, changeOptionContent, changeState}) 
{
  return(
    <div className="flex gap-1">
      <input
        id='option'
        ref={Ref}
        placeholder="보기를 입력하세요."
        className="flex-auto rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e)=>changeOptionContent(e)}
      />
      <button 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        id='addOption' 
        onClick={(e)=>changeState(e)}>
          추가
      </button>
    </div>
  )
}