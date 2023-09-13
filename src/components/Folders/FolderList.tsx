import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
import FolderItemSmall from "./FolderItemSmall";
import { FolderListItem, FolderListTypes } from "@/types/generalTypes";

function FolderList({ folderList, isBig = true }: FolderListTypes) {
    const [activeFolder, setActiveFolder] = useState<number>();
    const router = useRouter();

    const onFolderClick = (index: number, item: FolderListItem) => {
        setActiveFolder(index);
        router.push({
            pathname: "/folder/" + item.id,
            query: {
                name: item.name,
                id: item.id,
            },
        });
    };
    return (
        <div
            className="p-5 mt-5 
    bg-white rounded-lg"
        >
            {isBig ? (<>
                <h2 className='text-[18px] font-bold text-gray-400'>
                    Recent Folders
                    <span
                        className="float-right
        text-blue-400 font-normal
        text-[13px] cursor-pointer"
                    >
                        View All
                    </span>
                </h2>
            </>) : null}
            {isBig ? <div
                className="grid grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5 mt-3
        gap-4"
            >
                {folderList.map((item, index) => (
                    <div key={index} onClick={() => onFolderClick(index, item)}>
                        <FolderItem folder={item} />
                    </div>
                ))}
            </div>
                :
                <div
                    className=" 
      "
                >
                    {folderList.map((item, index) => (
                        <div key={index} onClick={() => onFolderClick(index, item)}>
                            <FolderItemSmall folder={item} />

                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default FolderList;