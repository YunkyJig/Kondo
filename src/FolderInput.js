import { useState } from "react";
function FolderInput({ placeholder, folderSetter }) {
  const [ folder, setFolder ] = useState('')

  const onFolderChange = (e) => {
    console.log(e.target.value)
    setFolder(e.target.value)
    folderSetter(e.target.value)
    // set Folder
  }

  return (
    <input 
      value={folder} 
      type={"text"} 
      onChange={onFolderChange}
      placeholder={placeholder}
    />
  );
}
export default FolderInput;