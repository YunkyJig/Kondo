import './FolderBtn.css';
import { useState } from "react";

function FolderBtn({ currFile, destinationFolder, sourceFolder, updateFileIndex, subFolder }) {
  const handleClick = () => {
    const PORT = 3001
    const serverURL = `http://localhost:${PORT}`
    
    // assuming we dont have backslash on folder variable and are on windows
    fetch(`${serverURL}/file?dest=${destinationFolder}\\${subFolder}\\${currFile.name}&source=${sourceFolder}\\${currFile.name}`,
      {method: 'POST'}
    )
    updateFileIndex()
  }
  return (
    <button
      onClick={handleClick}
      className='folder-btn'
    >
      {subFolder}
    </button>
  );
}
export default FolderBtn;