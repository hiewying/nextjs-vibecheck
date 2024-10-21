import { Open_Sans, Tillana } from 'next/font/google'
import "./globals.css";
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Head from './head';
import Logout from '@/components/Logout';

const open_sans = Open_Sans({ subsets: ['latin'] })

const tillana = Tillana({ 
  weight: ['600'],
  subsets: ['latin'] 
})

export const metadata = {
  title: "Vibe Check",
  description: "Track your daily mood",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
      <Link href={'/'}>
        <h1 className={'text-lg sm:text-xl md:text-2xl textGradient ' + tillana.className}>VibeCheck</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-800 ' + tillana.className}>Created with 🔥</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={ 'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + open_sans.className }>

          {header}
          {children}
          {footer}

        </body>
      </AuthProvider>
      
    </html>
  );
}
