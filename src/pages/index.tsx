import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar';
import { FolderList, FileList } from '@/components';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../Config/FirebaseConfig';
import { ParentFolderIdContext } from '@/Context/ParentFolderIdContext';
import { FileListType, FolderListItem, FolderListTypes } from '@/types/generalTypes';


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState<FolderListItem[]>([])
  const [fileList, setFileList] = useState<FileListType[]>([])

  const db = getFirestore(app)

  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)

  useEffect(() => {
    console.log("User Session",)
    if (!session) {
      router.push("/Login")
    }
    else {
      setFolderList([]);
      getFolderList();
      getFileList();

      console.log("User Session", session.user)
    }
    setParentFolderId(0);

  }, [session])

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(collection(db, "Folders"),
      where("parentFolderId", '==', 0),
      where("createBy", '==', session?.user?.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFolderList(folderList => ([...folderList, doc.data()]))
    });
  }

  const getFileList = async () => {
    setFileList([]);
    const q = query(collection(db, "files"),
      where("parentFolderId", '==', 0),
      where("createdBy", '==', session?.user?.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFileList(fileList => ([...fileList, doc.data()]))
    });
  }
  return (
    <div className='p-5'>
      <SearchBar />
      <FolderList folderList={folderList} isBig={true} />
      <FileList fileList={fileList} />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
    </div>
  )
}