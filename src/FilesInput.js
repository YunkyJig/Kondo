import { useState } from "react";
function FilesInput({ handleFilesChange }) {
  // const [ files, setFiles ] = useState(undefined)
  const [ filename, setFilename ] = useState('')

  console.log('im fiels input')
  const handleChange = (e) => {
    // console.log(e.target.files)
    // console.log(e.target.value)
    // set files
    handleFilesChange(e.target.files)
    setFilename(e.target.value)
  }

  return (
    <input 
      value={filename} 
      type={"file"} 
      webkitdirectory="" 
      directory="" 
      multiple
      onChange={handleChange}
    />
  );
}
export default FilesInput;