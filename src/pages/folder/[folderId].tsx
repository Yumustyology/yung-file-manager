import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../Config/FirebaseConfig';
import { useSession } from 'next-auth/react';
import { FileListType, FolderListItem } from '@/types/generalTypes';
import { ParentFolderIdContext } from '@/Context/ParentFolderIdContext';
import { showToastMsg } from '@/components/Toast';
import { FileList, FolderList } from '@/components';
import { BsFillTrash3Fill } from 'react-icons/bs'

function FolderDetails() {
    const router=useRouter();
    const {name,id}=router.query;
    const {data:session}=useSession();
     const {parentFolderId,setParentFolderId}
     =useContext(ParentFolderIdContext)

        
    const [folderList,setFolderList]=useState<FolderListItem[]>([]);
    const [fileList,setFileList]=useState<FileListType[]>([]);
     const db=getFirestore(app)
     useEffect(()=>{
        setParentFolderId(id);
        if(session)
        {
          setFolderList([]);
          setFileList([]);
            getFolderList();
            getFileList();
        }
     },[id,session])

   
    const deleteFolder=async()=>{
        await deleteDoc(doc(db as any, "Folders", id as any)).then(resp=>{
            showToastMsg('Folder Deleted !','folder-delete')
            router.back();
        })
    }

     const getFolderList=async()=>{
        setFolderList([]);
        if(!session)return
        const q=query(collection(db,"Folders"),
        where("createBy",'==',session?.user?.email),
        where("parentFolderId","==",id));
        console.log("InFolderList")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
        setFolderList(folderList=>([...folderList,doc.data()]))
    }); 
      }

      const getFileList=async()=>{
        setFileList([]);
        const q=query(collection(db,"files"),
        where("parentFolderId",'==',id),
        where("createdBy",'==',session?.user?.email));
        console.log("fole")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
        // console.log(doc.id, " => ", doc.data());
        setFileList(fileList=>([...fileList,doc.data()]))
    }); 
      }
  return (  
    <div className='p-5'>
        <SearchBar/>
        <h2 className='text-[20px] text-gray-500 font-bold mt-5'>{
        name}
        <BsFillTrash3Fill size={20} className='hover:scale-110 transition-all cursor-pointer float-right text-red-500' onClick={()=>deleteFolder()}/>
        </h2>
   
       {folderList.length>0? <FolderList 
        folderList={folderList}
        isBig={false}/>:
        <h2 className='text-gray-400
        text-[16px] mt-5'>No Folder Found</h2>}

        <FileList fileList={fileList} />
    </div>
  )
}

export default FolderDetails