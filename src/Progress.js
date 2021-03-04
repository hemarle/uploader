import React from "react";
import "./Progress.css";
import { useHistory } from "react-router-dom";
function Progress({ prog, loading }) {
  //Returns to main menu if user tries to hardcode url
  const history = useHistory();
  !prog && history.push("/");

  //shows successful page
  loading && history.push("/content");

  return (
    <div className="progress">
      <h3>Uploading ...</h3>
      <progress type="progress" min="1" value={prog} max="102" />
    </div>
  );
}

export default Progress;
