import moment from "moment/moment";
import Image from "next/image";
import { BsFillTrash3Fill } from 'react-icons/bs'
import React from "react";
import { showToastMsg } from "../Toast";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { FileListType } from "@/types/generalTypes";

function FileItem({ file }: { file: FileListType }) {

    const db = getFirestore(app)

    const image = "/" + file.type + ".png"

    const deleteFile = async (file: any) => {
        await deleteDoc(doc(db, "files", file.id.toString())).then(resp => {
            showToastMsg('File Deleted!!!', 'file-delete')
        })
    }

    return (
        <div
            className="grid grid-cols-1
    md:grid-cols-2 justify-between
    cursor-pointer hover:bg-gray-100
    p-3 rounded-md"

        >
            <div className="flex gap-2 items-center" >
                <Image
                    src={image}
                    alt="file-icon"
                    width={26}
                    height={20}
                />
                <h2 className="text-[13px] truncate"
                onClick={()=>window.open(file.imageUrl)}
                >{file.name}</h2>
            </div>
            <div className="grid grid-cols-3 place-content-start">
                <h2 className="text-[13px]">
                    {moment(file.modifiedAt).format("MMMM DD, YYYY")}
                </h2>

                <h2 className="text-[13px]">
                    {(parseInt(file.size) / 1024 ** 2).toFixed(2) + " MB"}
                    <span onClick={() => deleteFile(file)} className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all">
                        <BsFillTrash3Fill size={20} color='text-red-500 hover:scale-110 transition-all cursor-pointer' />
                    </span>
                </h2>
            </div>

        </div>
    );
}

export default FileItem;