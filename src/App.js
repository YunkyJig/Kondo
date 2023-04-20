import React, { useState } from "react";
import './App.css';
import FilesInput from './FilesInput'
import FolderInput from './FolderInput';
import StartBtn from './StartBtn';
import FilePreview from './FilePreview';
import FolderBtns from "./FolderBtns";

{/* https://stackoverflow.com/questions/43274925/development-server-of-create-react-app-does-not-auto-refresh */}
// WATCHPACK_POLLING=true in .env file worked 
function App() {
  const [ files, setFiles ] = useState(undefined)
  const [ destinationFolder, setDestinationFolder ] = useState(`${encodeURIComponent('C:\\Users\\dimit\\Desktop\\selfhost\\spotify songs')}`)
  const [ sourceFolder, setSourceFolder ] = useState(`${encodeURIComponent('C:\\Users\\dimit\\Desktop\\selfhost\\spotify songs')}`)
  const [ subFolders, setSubFolders ] = useState([])
  const [ currFile, setCurrFile ] = useState(null)
  const [ currFileIndex, setCurrFileIndex ] = useState(0)
  const [ startOrganizing, setStartOrganizing ] = useState(false)
  
  const handleFilesChange = (files) => {
    setFiles(files)
    setCurrFile(files[0])
    // setCurrFileIndex(0)
  }

  const handleStartClick = async () => {
    const PORT = 3001
    const serverURL = `http://localhost:${PORT}`

    setStartOrganizing(true)
    console.log(destinationFolder)
    
    const res = await fetch(`${serverURL}/subfolders/${destinationFolder}`)
    const data = await res.json()
    setSubFolders(data)
    console.log(data)
  }

  const updateFileIndex = () => {
    if(currFileIndex < files.length - 1) {
      setCurrFile(files[currFileIndex + 1])
      setCurrFileIndex(currFileIndex + 1)
    }
  }

  return (
    <div className="App">
      <FilesInput handleFilesChange={handleFilesChange} />
      <FolderInput placeholder={'Source Folder'} folderSetter={setSourceFolder} />
      <FolderInput placeholder={'Destination Folder'} folderSetter={setDestinationFolder} />
      <StartBtn onClick={handleStartClick} />
      <FolderBtns currFile={currFile} destinationFolder={destinationFolder} sourceFolder={sourceFolder} updateFileIndex={updateFileIndex} subFolders={subFolders} />
      <FilePreview startOrganizing={startOrganizing} files={files} currIndex={currFileIndex} />
    </div>
  );
}

export default App;
