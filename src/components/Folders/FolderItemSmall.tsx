import { FolderListItem } from '@/types/generalTypes'
import Image from 'next/image'
import React from 'react'
import {FcFolder} from 'react-icons/fc'

function FolderItemSmall({folder}:{folder:FolderListItem}) {
  return (
    <div className=' flex gap-3
    hover:bg-gray-100
    p-2 rounded-md cursor-pointer'>
        {/* <Image src='/folder.png'
        alt='folder'
        width={20}
        height={20}
        /> */}
        <FcFolder size={26}/>
        <h1>{folder.name}</h1>
    </div>
  )
}

export default FolderItemSmall