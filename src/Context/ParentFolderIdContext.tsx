import { createContext, useState } from "react";

export const ParentFolderIdContext = createContext<any>(null)


export const ParentFolderIdContextProvider = ({ children }: { children: any }) => {
    const [parentFolderId, setParentFolderId] = useState('');

    return (

        <ParentFolderIdContext.Provider value={{ parentFolderId, setParentFolderId }}>
            {children}
        </ParentFolderIdContext.Provider>
    )

}