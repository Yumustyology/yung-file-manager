export type FolderListItem = { name: string; id: number };

export type FolderListTypes = {
  isBig: boolean;
  folderList: FolderListItem[];
};

export type FileListType = {
  id: number;
  name: string;
  type: string;
//   type: "doc" | "pdf" | "png" | "jpeg" | "jpg" | 'image';
  size: string;
  modifiedAt: string;
  imageUrl?:string
};

export type StorageItemTypes = {type:string,logo:string,size:string,totalFile:string}