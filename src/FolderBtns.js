import FolderBtn from "./FolderBtn";
import AddFolderBtn from "./AddFolderBtn";
import { useState } from "react";

function FolderBtns({ subFolders, ...props }) {
  const [ additonalFolders, setAdditionalFolders ] = useState([])
  // console.log('subfoldres', subFolders.length)
  
  return (
    subFolders.length ?
    <div>
      {
        subFolders.map(subFolder => 
          <FolderBtn 
            key={window.crypto.randomUUID()} 
            {...props}
            subFolder={subFolder}
          />)
      }
      {
        additonalFolders.length ?
        additonalFolders.map(additonalFolder => 
          <FolderBtn 
            key={window.crypto.randomUUID()} 
            {...props}
            subFolder={additonalFolder}
          />)
        :
        <></>
      }
      <AddFolderBtn additonalFolders={additonalFolders} setAdditionalFolders={setAdditionalFolders}/>
    </div>
    :
    <></>
  );
}
export default FolderBtns;