export default function Option({item}){
  return(
    <div>
      <input name="option" type="checkbox" defaultChecked={item.isTrue}/>{item.content}
    </div>
  )
}