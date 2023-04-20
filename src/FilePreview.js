import { useState } from "react";
function FilePreview({ startOrganizing, files, currIndex }) {
  const url = files ? URL.createObjectURL(files[currIndex]) : ''
  console.log('strat', startOrganizing)
 
  return (
    startOrganizing && files ?
    <div>
      {files[currIndex].type.split('/')[0] === "image" ?
        <img src={url}></img>
        :
        <video src={url} autoPlay></video>
      }
    </div>
    :
    <div>
      
    </div>
  );
}
export default FilePreview;