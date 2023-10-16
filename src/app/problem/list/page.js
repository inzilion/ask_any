import client from "@/util/database"
export default async function List(){
  const db = await client.db("ASK_ANY");
  const list = await db.collection("PROBLEMS").find().toArray();
  return(
    <>
      <ul className="divide-y divide-gray-100 pl-3">
        {list.map((item) => (
          <li key={item.author?.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.author?.image} alt="" />
              <div className="min-w-0 flex-auto">
                <a href={`/problem/${item._id.toString()}`} className="text-sm font-semibold leading-6 text-gray-900">{item.title}</a>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">출제자: {item.author.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>    
    </>
  )
}