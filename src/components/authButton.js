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
      href: "/proflie/setting",
      isMobile: isMobile,
      handler: null,
    },
    {
      name: "Create",
      href: "/",
      isMobile: isMobile,
      handler: ()=>signOut(),
    }
  ];


  return(
    <div>
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
        { !session ?
          <span 
            className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            onClick={()=>signIn()}
          >
            Sign In
          </span>
          :
          <Menu as="div" className="relative">
            <Menu.Button className="relative flex items-center cursor-pointer ">
              <span className="text-gray-400 mx-2">{session.user.name}</span>
              <Image src={session.user.image} width={40} height={40} alt="no Photo"/>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({active})=>(
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Your Profile</a>
                )}  
              </Menu.Item>
              <Menu.Item>
                {({active})=>(
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Settings</a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({active})=>(
                  <a href="/" onClick={()=>signOut} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                )}
              </Menu.Item>
            </Menu.Items> 
          </Menu>
        } 
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">{session?.user.name}</div>
              <div className="text-sm font-medium leading-none text-gray-400">{session?.user.email}</div>
            </div>
          </div>
          { session ?
            <div className="mt-3 space-y-1 px-2">
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
              <span onClick={()=>signOut()} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</span>
            </div>
            : "" 
          }
      </div>
      </div>    
    </div>
  )
}