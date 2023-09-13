import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../../Config/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ParentFolderIdContext } from "@/Context/ParentFolderIdContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify';
import { newItemBtnStyles } from "@/utils/utils";
import { AiFillFolderAdd, AiFillFileAdd } from 'react-icons/ai'
import { FcFolder } from 'react-icons/fc'
import { showToastMsg } from "../Toast";


function CreateFolder() {
  const docId = Date.now().toString();
  const [folderName, setFolderName] = useState('');

  const { data: session } = useSession();

  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)

  const db = getFirestore(app)


  const onCreate = async () => {
    try {
      console.log(folderName)
      await setDoc(doc(db, "Folders", docId), {
        name: folderName,
        id: docId,
        createBy: session?.user?.email,
        parentFolderId: parentFolderId
      })
      showToastMsg('Folder Created!', 'folder-creation')
    } catch (error) {
      showToastMsg('An Error Occurred, Retry...', 'folder-creation-error')
    }
  }


  return (
    <div>
      <button className={newItemBtnStyles} onClick={() => {
        const myModal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (myModal) {
          myModal.showModal();
        }
      }}>
        <span className='text-[13px]'>Add New Folder</span>
        <span className='flex item-center mt-[1px]'><AiFillFolderAdd color={'#fff'} style={{ color: '#fff' }} size={19} /></span>
      </button>
      <dialog id="my_modal_1" className="modal modal-box p-9 items-center modal-bottom sm:modal-middle">
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
              ✕
            </button>
            <div className="w-full items-center 
        flex flex-col justify-center gap-3">
              <div className="mb-4">
                <FcFolder size={36} />

              </div>
              <input
                type="text"
                placeholder="Folder Name"
                className="p-2 border-[1px] outline-none
                rounded-md"
                onChange={(e) => setFolderName(e.target.value)}
              />
              <button className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
                onClick={() => onCreate()}
              >Create</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default CreateFolder;