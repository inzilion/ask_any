import AddOption from './addOption'
import Option from "./option"
export default function Options({options, Ref, changeOptionContent, changeState}){
  return(
    <div className='flex gap-1 flex-col'>
      {options ? options.map((e, i) => <Option item={e} key={i}/>) : <div>보기없음</div>}
      <AddOption
        Ref={Ref}
        changeOptionContent={changeOptionContent}
        changeState={changeState}
      />
    </div>
  )
}