export default function Option({item, idx, changeState}){
  return(
    <div className='flex gap-2'>
      <input name="option" type="checkbox" defaultChecked={item.isTrue}/>
      {item.content}
      <button 
        id="removeOption"
        onClick={(e)=>changeState(e, idx)}
      >❌</button>
    </div>
  )
}