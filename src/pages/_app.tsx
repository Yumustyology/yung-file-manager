import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SideBar, CreateFolder, Storage } from '@/components'
import { ParentFolderIdContextProvider } from '@/Context/ParentFolderIdContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ParentFolderIdContextProvider>
      <SessionProvider session={session}>
        <div className='flex bg-gray-100'>
          <SideBar />
          <div className='grid grid-cols-1 md:grid-cols-3 w-full'>
            <div className='col-span-2'>
              <Component {...pageProps} />
            </div>
            <>
              <Storage />
            </>
          </div>
        </div>
        <ToastContainer />
      </SessionProvider>
    </ParentFolderIdContextProvider>
  )
} 