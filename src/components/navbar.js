import Link from "next/link";
import AuthButton from "./authButton";

export default function Navbar(){
  const menuItemClassName = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  const menuItemClassNameMobile = "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
  const isMobile = (isTrue) => isTrue ? menuItemClassNameMobile : menuItemClassName ;
  const menuItems = [
    {
      name: "Home",
      href: "/",
      isMobile: isMobile,
    },
    {
      name: "Problems",
      href: "/problem/list",
      isMobile: isMobile,
    },
    {
      name: "Create",
      href: "/problem/create",
      isMobile: isMobile,
    },
    {
      name: "Test",
      href: "/problem/test",
      isMobile: isMobile,
    },
    {
      name: "Rank",
      href: "/problem/rank",
      isMobile: isMobile,
    },
  ];

  return(
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden md:block ">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="ml-10 flex items-baseline space-x-4">
                {
                  menuItems.map((menuItem, i) => 
                    <Link href={menuItem.href} className={menuItem.isMobile(false)} key={i}>
                      {menuItem.name}  
                    </Link>
                  )
                }
              </div>
            </div>
            <AuthButton/> 
          </div>
        </div>  
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {
            menuItems.map((menuItem, i) => 
              <Link href={menuItem.href} className={menuItem.isMobile(true)} key={i}>
                {menuItem.name}  
              </Link>
            )
          }
          </div>
          <AuthButton/>
        </div>
      </div>
    </nav>
  )
}