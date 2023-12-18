export default function Register() {
  return (
    <div className="flex justify-center pt-10">
      <form method="POST" action="/api/auth/signUp" className="flex flex-col gap-5">
        <div className="flex gap-3 border-b-2">
          <label>이름: </label>
          <input name="name" type="text" placeholder="이름" required/> 
        </div>
        <div className="flex gap-3 border-b-2">
          <label>학번: </label>
          <input name="email" type="text" placeholder="학번" required/>
        </div>
        <div className="flex gap-3 border-b-2">
          <label>비번: </label>
          <input name="password" type="password" placeholder="비번" required />
        </div>
        <button type="submit" className="bg-blue-300 p-2 rounded-md">가입요청</button>
      </form>
    </div>
  )
}