function AddFolderBtn({ additonalFolders, setAdditionalFolders }) {
  const handleClick = () => {
    const PORT = 3001
    const serverURL = `http://localhost:${PORT}`
    const newFolder = prompt('Enter the new folder\'s name')
    
    setAdditionalFolders(additonalFolders.concat(newFolder))
    fetch(`${serverURL}/subfolders/${encodeURIComponent(`C:\\Users\\dimit\\Desktop\\selfhost\\spotify songs\\${newFolder}`)}`,
      {method: 'POST'}
    )
  }
  
  return (
    <button
      onClick={handleClick}
    >
      Add folder
    </button>
  );
}
export default AddFolderBtn;