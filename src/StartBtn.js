import { useState } from "react";
function StartBtn({ onClick }) {
//   const [ folder, setFolder ] = useState('')

  return (
    <button
        onClick={onClick}
    >
        Start Organizing
    </button>
  );
}
export default StartBtn;