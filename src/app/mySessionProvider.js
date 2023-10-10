'use client'
import { SessionProvider } from "next-auth/react";

export default function MySessionProvider({component}){
  return (
    <SessionProvider>
      {component}
    </SessionProvider>
  )
}