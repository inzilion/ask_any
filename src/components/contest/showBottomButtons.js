import { Button } from "../common/buttons"

export default function ShowBottomButtons({numOfProblems, currentPtr, handler}){
  return(
    <>
      <div className="flex justify-center p-3 gap-3">
      {
        currentPtr>0 
        ? <Button 
            id="preButton"
            caption="이전문제"
            color="gray"
            size="w-1/6"
            handler={handler}
          />
        : ''
      }
      {
        currentPtr < numOfProblems-1  
        ? <Button 
            id="nextButton"
            caption="다음문제"
            color="green"
            size="w-1/6"
            handler={handler}
          />
        : <Button 
            id="submitButton"
            caption="제 출"
            color="red"
            size="w-1/6"
            handler={handler}
          />
        }
    </div>

    </>
  )
}