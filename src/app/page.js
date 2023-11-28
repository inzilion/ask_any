import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-col text-center gap-5 pt-20'>
      <div className="text-3xl font-bold"><span className='text-blue-500'>웹 사이트 제작</span> <span className='text-red-500'>수업 프로젝트</span></div>
      <div>"나 혼자 쓸라고 만든"</div>
      <div className='text-4xl font-bold text-green-500'>"온라인 문제 제작 및 평가 사이트"</div>
      <div className='text-xl font-bold'>구글 계정으로 로그인하면 이용 가능</div>
    </div>
  )
}
