export default function Button({id, caption, color, size, handler }){
  return(
    <>
      <button
        id={id}
        type="button"
        onClick={(e)=>handler(e)}
        className={`w-${size} rounded-md bg-${color}-800 bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {caption}
      </button>
    </>
  )
} 
