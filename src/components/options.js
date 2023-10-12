import Option from "./option"
export default function Options({options}){
  return(
    <div>
      {options.map((e, i) => <Option item={e} key={i}/>)}
    </div>
  )
}