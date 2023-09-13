import { FileListType } from "@/types/generalTypes";

const getStorageByType = (data: any, types: [string, string]): number => {
  let totalSize = 0;
  const result = data.filter((item: FileListType) => types.includes(item.type));
  result.forEach((element: { size: number }) => {
    totalSize = totalSize + element.size;
  });
  console.log((totalSize / 1024 ** 2).toFixed(2));
  return parseInt((totalSize / 1024 ** 2).toFixed(2));
};

export default getStorageByType;
