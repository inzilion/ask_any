'use client'
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu } from '@headlessui/react';

export default function AuthButton(){
  const { data: session } = useSession();
  const menuItemClassName = "block px-4 py-2 text-sm text-gray-700";
  const menuItemClassNameMobile = "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
  const isMobile = (isTrue) => isTrue ? menuItemClassNameMobile : menuItemClassName ;
  const menuItems = [
    {
      name: "Your Profile",
      href: "/profile",
      isMobile: isMobile,
      handler: null,
    },
    {
      name: "Setting",
      href: "/profile/setting",
      isMobile: isMobile,
      handler: null,
    },
    {
      name: "Sign Out",
      href: "#",
      isMobile: isMobile,
      handler: ()=>signOut(),
    }
  ];


  return(
    <div>
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
        { !session ?
          <div 
            className="cursor-pointer text-gray-300 hover:text-white -md px-3 py-2 text-sm font-medium"
            onClick={()=>signIn()}
          >
            Sign In
          </div>
          :
          <Menu as="div" className="relative">
            <Menu.Button className="relative flex items-center cursor-pointer ">
              <div className="text-gray-400 mx-2">{session.user.name}</div>
              <Image src={session.user.image} width={40} height={40} alt="no Photo"/>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              { 
                menuItems.map((item, i)=>
                  <Menu.Item key={i}>
                    {({active})=><a href={item.href} className={item.isMobile(false)} onClick={item.handler}>{item.name}</a>}  
                  </Menu.Item>
                )
              }
            </Menu.Items> 
          </Menu>
        } 
        </div>
      </div>
      
      <div className="md:hidden pb-3 pt-4">
        {
          !session ? 
          <span 
            className="cursor-pointer text-gray-300  hover:text-white -md px-3 py-3 font-medium"
            onClick={()=>signIn()}
          >
            Sign In
          </span>
          :
          <Menu as="div"className="border-t border-gray-700 pb-3 pt-4">
            <Menu.Button className="flex flex-col px-5">
              <div className="text-base font-medium leading-none text-white">{session?.user.name}</div>
              <div className="text-sm font-medium leading-none text-gray-400">{session?.user.email}</div>
            </Menu.Button>
            <Menu.Items className="mt-3 space-y-1 px-2">
            { 
              menuItems.map((item, i)=>
                <Menu.Item key={i}>
                  {({active})=><a href={item.href} className={item.isMobile(true)} onClick={item.handler}>{item.name}</a>}  
                </Menu.Item>
              )
            }
            </Menu.Items> 
          </Menu>
        }
      </div>    
    </div>
  )
}