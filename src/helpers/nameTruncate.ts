export function truncateName(folderName: string, maxLength = 15): string {
    if (folderName.length <= maxLength) {
      return folderName;
    }
  
    const ellipsis = '...';
    const availableSpace = maxLength - ellipsis.length;
  
    // Check if availableSpace is less than 3 to handle very short folder names.
    if (availableSpace < 3) {
      return folderName.slice(0, maxLength); // Truncate the folder name.
    }
  
    // Split the folder name into two parts: the beginning and the end.
    const beginning = folderName.slice(0, availableSpace / 2);
    const end = folderName.slice(-availableSpace / 2);
  
    // Combine the beginning, ellipsis, and end to form the shortened folder name.
    return beginning + ellipsis + end;
  }
  