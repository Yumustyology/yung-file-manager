import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { app } from '../../Config/FirebaseConfig'
import { useSession } from 'next-auth/react'
import { FileListType } from '@/types/generalTypes';
import getStorageByType from '@/Services/StroageSize';

function StorageInfo() {
  const { data: session } = useSession();
  const db = getFirestore(app)
  const [totalSizeUsed, setTotalSizeUsed] = useState('0');
  const [imageSize, setImageSize] = useState(0);
  const [fileList, setFileList] = useState<FileListType[]>([])
  let totalSize = 0;
  useEffect(() => {
    if (session) {
      totalSize = 0;
      getAllFiles();

    }
  }, [session])

  useEffect(() => {
    setImageSize(getStorageByType(fileList, ['png', 'jpg']));
  }, [fileList])
  const getAllFiles = async () => {
    const q = query(collection(db, "files"),
      where("createdBy", "==", session?.user?.email));
    const querySnapshot = await getDocs(q);
    setFileList([])
    querySnapshot.forEach((doc: any) => {

      totalSize = totalSize + doc.data()['size'];
      setFileList(fileList => ([...fileList, doc.data()]))

    })

    setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + " MB");

  }

  return (
    <div className='mt-7'>
      <h2
        className="text-[22px] 
       font-bold text-gray-400"
      >
        {totalSizeUsed} {" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div className='w-full
        bg-gray-200  h-2.5 flex'>
        <div className=' bg-green-200 h-2.5 w-[25%]'></div>
        <div className='bg-blue-200 h-2.5 w-[20%]'></div>
        <div className='bg-yellow-200 h-2.5 w-[15%]'></div>
        <div className='bg-red-200  h-2.5 w-[35%]'></div>
      </div>

    </div>
  )
}

export default StorageInfo