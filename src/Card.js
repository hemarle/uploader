import React, { useRef, useState } from "react";
import "./Card.css";
import storage from "./firebase";
import cloud from "./images/cloud.png";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { FileDrop } from "react-file-drop";
import filesize from "filesize";
import Progress from "./Progress";
import Content from "./Content";

function Card() {
  //States needed
  const [fileState, setFileState] = useState(false);
  const [fileData, setFileData] = useState();
  const [url, setUrl] = useState("");
  const [prog, setProg] = useState(0);
  const [loading, setLoading] = useState(false);

  //DOM
  let dataRef = useRef();
  let sizeRef = useRef();
  let imgRef = document.querySelector("img");

  //File input handler
  const handleChange = (e) => {
    setFileState(true);
    setFileData(e.target.files[0]);
  };

  //To read file details
  const reader = new FileReader();

  if (fileData && dataRef.current) {
    dataRef.current.innerHTML = fileData.name;
    sizeRef.current.innerHTML = filesize(fileData.size);

    reader.readAsDataURL(fileData);

    reader.onload = (event) => {
      imgRef.src = event.target.result;
    };
  }

  //Upload handler
  const handleClick = (e) => {
    const storageRef = storage.ref(`images/${fileData.name}`);
    storageRef.put(fileData);
    setProg(1);

    storageRef.put(fileData).on(
      "state_change",
      (snapshot) => {
        let progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + 1;
        setProg(progress + 1);
        console.log(progress, "prog");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storageRef.getDownloadURL().then((urls) => {
          setUrl(urls);
          setLoading(true);
          console.log(url);
        });
      }
    );
  };

  return (
    <div className="card">
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Upload Your files</h1>
            <p>File should be Jpeg, Png</p>
            <div className="card__body">
              <FileDrop
                // onFrameDragEnter={(files, event) => {

                // }}
                //   onFrameDragLeave={(event) => console.log("onFrameDragLeave", event)}
                //   onFrameDrop={(event) => console.log("onFrameDrop", event)}
                //   onDragOver={(event) => console.log("onDragOver", event)}
                //   onDragLeave={(event) => console.log("onDragLeave", event)}
                onDrop={(files, event) => {
                  setFileState(true);
                  // fileData && console.log("onDrop!", fileData, event);
                  setFileData(files[0]);
                }}
              >
                <img src={cloud} alt="cloud" ref={(e) => imgRef} />
                <p>Drag and drop</p>
              </FileDrop>
            </div>
            <h6 id="data" ref={dataRef}></h6>
            <h6 id="size" ref={sizeRef}></h6>

            <h3>or</h3>
            <input
              type="file"
              id="file"
              className="btn btn-primary"
              value=""
              title=""
              onChange={handleChange}
            />

            <Link to="/progress">
              {fileState && (
                <button
                  className="btn btn-success card__button"
                  onClick={handleClick}
                >
                  Upload
                </button>
              )}
            </Link>
          </Route>

          <Route path="/progress">
            <Progress prog={prog} loading={loading} />
          </Route>
        </Switch>

        <Route path="/content">
          <Content url={url} />
        </Route>
      </Router>
    </div>
  );
}

export default Card;
