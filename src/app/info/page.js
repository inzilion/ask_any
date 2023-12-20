'use client'
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useState } from "react";

export default function Info({searchParams}) {
  const { data: session } = useSession();
  const [ message, setMessage ] = useState(searchParams.msg);

  const msg = {
    'method' : "잘못된 접근입니다",
    'already' : "이미 가입한 학번입니다.",
    'OK' : "회원가입이 완료되었습니다. 상단의 우측의 로그인 클릭하세요.",
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='text-center text-2xl font-bold pt-10 text-sky-600'>
        {session?.user?.name == undefined
        ? <span>{msg[searchParams.msg]}</span>
        : <span>{session.user.name}님 환영합니다.</span>
        }
        </div>
        {
          session?.user?.name == undefined && message != "OK"
        ? <div className='flex justify-center'>
            <Link href='/register' className='text-center px-4 py-2 w-1/6 rounded text-2xl font-bold bg-gray-500 text-gray-200'>회원가입</Link>
          </div>
        : ""
        }
        </div>
    </>
  )
}
