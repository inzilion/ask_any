export default function Option({item}){
  return(
    <div>
      <input type="checkbox" defaultChecked={item.isTrue}/>{item.content}
    </div>
  )
}