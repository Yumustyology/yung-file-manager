import {AiFillHome,AiFillStar} from 'react-icons/ai'
import {SiFiles} from 'react-icons/si'
import {BsTrash3Fill} from 'react-icons/bs'

const list=[
    {
        id:1,
        name:'Home',
        icon: <AiFillHome size={20} color="gray" className='mt-[1px]'/>
    },
    {
        id:2,
        name:'My Files',
        icon: <SiFiles size={20} color="gray" className='mt-[1px]'/>
    },
    {
        id:3,
        name:'Starred',
        icon: <AiFillStar size={20} color="gray" className='mt-[1px]'/>
    },
    {
        id:4,
        name:'Trash',
        icon: <BsTrash3Fill size={20} color="gray" className='mt-[1px]'/>
    },
]

export default{
    list
}