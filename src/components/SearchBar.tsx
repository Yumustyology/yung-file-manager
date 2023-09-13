import React from 'react'
import { CiSearch } from 'react-icons/ci'
function SearchBar() {
    return (
        <div className='mt-2'>
            <div className='flex gap-3 bg-gray-300
    p-2 rounded-lg items-center w-full'>
                <span className="w-4 h-4 text-gray-400"><CiSearch color=" text-gray-400" size={18} /></span>

                <input type='text'
                    placeholder='Search'
                    onKeyDown={(e: any) => e.key == 'Enter' && console.log(e.target.value)}
                    className='bg-transparent
                    outline-none w-full text-[14px
                  text-black'
                />

            </div>
        </div>
    )
}

export default SearchBar