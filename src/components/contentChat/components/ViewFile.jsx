import { useEffect, useState } from "react";
import "../../../sass/ViewFile.scss";

const ViewFile = ({ url }) => {
  const [images, setImages] = useState([
    "png",
    "jpeg",
    "jpg",
    "gif",
    "bmp",
    "tiff",
  ]);
  const [excels, setExcels] = useState(["xls", "xlsx"]);
  const [words, setWords] = useState(["doc", "docx"]);
  const [texts, setTexts] = useState(["csv", "txt"]);
  const [powerPoints, setPowerPoints] = useState(["ppt", "pptx"]);
  const [videos, setVideos] = useState(["mp3", "mp4"]);
  const [zips, setZips] = useState(["rar", "zip"]);
  const [file, setFile] = useState("fa-file");


  useEffect(() => {
    if (images.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "images",
        color : "blue"
      });
    } else if (url.split(".").slice(-1)[0] === "pdf") {
      setFile({
        icon : "fa-file-pdf",
        color : "#b20a01"
      });
    } else if (excels.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-excel",
        color : "#1A7441"
      });
    } else if (words.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-word",
        color : "#285397"
      });
    } else if (texts.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-lines",
        color : "black"
      });
    } else if (powerPoints.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-powerpoint",
        color : "#C94930"
      });
    } else if (videos.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-video",
        color : "#45BAC4"
      });
    } else if (zips.indexOf(url.split(".").slice(-1)[0]) >= 0) {
      setFile({
        icon : "fa-file-zipper",
        color : "#EE90EC"
      });
    } else {
      setFile({
        icon : "fa-file",
        color : "#F0CD4B"
      });
    }
  }, []);

  return (
    <a href={`${url}`} target="_blank" rel="noopener noreferrer">
      {file.icon === "images" ? (
        <img
          src={`${url}`}
          style={{
            width: "200px",
            height: "200px",
            cursor: "pointer",
          }}
        />
      ) : (
        <div className="container-view-file">
          <i className={`fa-solid ${file.icon} icon-file`} style={{color : file.color, marginRight : "10px"}}></i>
          <span style={{fontSize : "15px", fontWeight : "bold"}}>{`${url.split(".").slice(-2)[0].split("--").slice(-1)[0]}.${
            url.split(".").slice(-1)[0]
          }`}</span>
        </div>
      )}
    </a>
  );
};

export default ViewFile;