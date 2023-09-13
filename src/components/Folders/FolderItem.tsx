import { truncateName } from '@/helpers/nameTruncate'
import { FolderListItem } from '@/types/generalTypes'
import React from 'react'
import {FcFolder} from 'react-icons/fc'

function FolderItem({folder}:{folder:FolderListItem}) {
  return (
    <div className={`w-full
    flex flex-col justify-center 
    items-center h-[120px]
    border-[1px] 
    rounded-lg p-5 bg-white
    hover:scale-105 hover:shadow-sm
    cursor-pointer `}>
        <FcFolder size={36}/>
        <h2 className='line-clamp-2
        text-[12px] text-center'>{truncateName(folder.name)}</h2>
    </div>
  )
}

export default FolderItem