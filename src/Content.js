import React, { useRef } from "react";
import "./Content.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useHistory } from "react-router-dom";
function Content({ url }) {
  const inputRef = useRef();

  //prevents hard coded url
  const history = useHistory();
  !url && history.push("/");

  //function to copy url to clipboard
  const copyFunc = () => {
    if (inputRef) {
      console.log(inputRef);
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);
      document.execCommand("copy");

      alert("Text Copied");
    }
  };
  return (
    <div className="content">
      <CheckCircleIcon />
      <h1>Uploaded SuccessFul</h1>
      <img src={url} alt="image_Uploaded" />

      <div className="content__clipboard">
        <input type="text" value={url} ref={inputRef} />
        <button className="btn btn-primary" onClick={copyFunc}>
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default Content;
