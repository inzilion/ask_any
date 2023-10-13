export default function Option({item}){
  return(
    <div className='flex gap-2'>
      <input name="option" type="checkbox" defaultChecked={item.isTrue}/>{item.content}
    </div>
  )
}