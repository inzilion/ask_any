import Navbar from '@/components/navbar'
import './globals.css'
import MySessionProvider from './mySessionProvider'

export const metadata = {
  title: 'Ask Any',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <MySessionProvider>
            <Navbar/>
            {children}
          </MySessionProvider>
      </body>
    </html>
  )
}
