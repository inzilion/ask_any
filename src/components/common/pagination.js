'use Client'

import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'

export default function Pagination({numOfElements, currentPage, handler}) {

  const pageArray = new Array(parseInt(numOfElements/10)+1).fill(0);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            전체 문제수 : {numOfElements}문제
          </p>
        </div>
        <div>
          <nav className="inline-flex -space-x-px rounded-md ">
            <button
              href="#"
              className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" onClick={(e)=>handler(e, 1)}/>
            </button>
            <button
              href="#"
              className="inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="h-5 w-5" onClick={(e)=>handler(e, currentPage-1)}/>
            </button>
            {
              pageArray.map((e, i)=>
                (i+1)==currentPage
                ? <button key={i}
                    className="cursor-pointer inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e)=>handler(e, i+1)}
                  >
                    {i+1}
                  </button>
                : <button key={i}
                    className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={(e)=>handler(e, i+1)}
                  >
                    {i+1}
                  </button>  
              )
            }

            {/* <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </div> */}

            <button
              href="#"
              className="inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="h-5 w-5" onClick={(e)=>handler(e, currentPage+1)}/>
            </button>
            <button
              href="#"
              className="inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" onClick={(e)=>handler(e, pageArray.length)}/>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
