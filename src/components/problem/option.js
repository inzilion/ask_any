export default function Option({item, idx, changeState}){
  return(
    <div className='flex gap-2'>
      <input 
        id="option" 
        type="checkbox" 
        defaultChecked={item.isTrue}
        onChange={(e)=>changeState(e, idx)}
      />
      {item.content}
      <button 
        id="removeOption"
        onClick={(e)=>changeState(e, idx)}
      >❌</button>
    </div>
  )
}