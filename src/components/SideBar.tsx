import React from 'react'
import Image from 'next/image'
import menu from '@/assets/js/menu'
import { CreateFolder } from '.'
import UploadFileModal from './Files/UploadFileModal'
import { useSession } from 'next-auth/react'

const SideBar = () => {
   const {data:session}=useSession();
  return session && (
        <div className='w-[280px] bg-white h-screen sticky top-0 z-10 shadow-[#46474a] shadow-md p-5'>
            <div className='flex justify-center'>
                <Image src='/logo.png' alt='logo' width={40} height={60} />
            </div>
            <div className='mt-3' />
        
            <CreateFolder />
            <div className="mt-2 mb-2"/>
            <UploadFileModal />
            <div className='mt-1' />

            <div>
                {menu.list.map((item, index) => (
                    <div key={item.id} className='flex gap-8 item-center p-2 mt-3 px-3 text-gray-500 hover:text-gray-400 flex-row hover:bg-gray-300 cursor-pointer rounded-sm'>
                        <span>{item.icon}</span>
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar
