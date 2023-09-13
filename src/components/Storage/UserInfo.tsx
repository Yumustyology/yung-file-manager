import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'
import { IoLogOut } from 'react-icons/io5'
function UserInfo() {
    const { data: session } = useSession();
    // onClick={() => signOut()
    return (
        <div>
            {session ?
                <div className='flex gap-2 items-center'>
                    {session?.user?.image && (<Image src={session.user.image}
                        alt='user-image'
                        width={40}
                        height={40}
                        className='rounded-full' />
                    )}
                    <div>
                        <h2 className='text-[15px] font-bold'>{session?.user?.name}</h2>
                        <h2 className='text-[13px] text-gray-400
                mt-[-4px]'>{session?.user?.email}</h2>
                    </div>
                    <div className='bg-gray-300 ml-10 p-2 rounded-lg
            cursor-pointer'>
                        <IoLogOut color="#6f7275" size={28} />
                    </div>
                </div> : null}
        </div>
    )
}

export default UserInfo