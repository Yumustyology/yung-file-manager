import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { app } from "../../Config/FirebaseConfig";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { showToastMsg } from "../Toast";
import { ParentFolderIdContext } from "@/Context/ParentFolderIdContext";
import { AiFillFileAdd } from 'react-icons/ai'
import { newItemBtnStyles } from "@/utils/utils";


function UploadFileModal() {
  const { data: session } = useSession();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );


  const docId = Date.now();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const onFileUpload = async (file: any) => {
    if (file) {
      if (file?.size > 1000000) {
        showToastMsg("File Size Too Large!", 'file-size-large');
        return;
      }
      const fileRef = ref(storage, "file/" + file.name);

      uploadBytes(fileRef, file)
        .then((snapshot: any) => {
          console.log("Uploaded a blob or file!");
          showToastMsg("File Uploaded Successfully!", 'file-upload');
        })
        .then((resp: any) => {
          getDownloadURL(fileRef).then(async (downloadURL: string) => {
            console.log("File available at", downloadURL);
            await setDoc(doc(db, "files", docId.toString()), {
              name: file.name,
              type: file.name.split(".")[1],
              size: file.size,
              modifiedAt: file.lastModified,
              createdBy: session?.user?.email,
              parentFolderId: parentFolderId,
              imageUrl: downloadURL,
              id: docId
            });
            showToastMsg("File Uploaded Successfully!", 'file-upload');
          }).catch((err) => {
            console.log(err)
            showToastMsg("An Error Occurred, Retry...", 'file-upload-error')
          })
        }).catch((err) => {
          showToastMsg("An Error Occurred, Retry...", 'file-upload-error');
          console.log(err)
        })

    }
  };
  return (
    <div>
      <button className={newItemBtnStyles} onClick={() => {
        const uploadFileModal = document.getElementById("upload_file") as HTMLDialogElement;
        if (uploadFileModal) {
          uploadFileModal.showModal();
        }
      }}>
        <span className='text-[13px]'>Add New File</span>
        <span className='flex item-center mt-[1px]'><AiFillFileAdd color={'#fff'} style={{ color: '#fff' }} size={19} /></span>
      </button>

      <dialog id="upload_file" className="modal-box p-9 items-center w-[360px]">
        <div className="modal-action block">

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div
              className="w-full items-center 
        flex flex-col justify-center gap-3"
            >
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e: any) => onFileUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UploadFileModal;