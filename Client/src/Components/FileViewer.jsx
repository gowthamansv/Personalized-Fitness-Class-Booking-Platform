import { useState, useEffect } from "react";

const FileViewer = ({ fileId }) => {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (fileId) {
      setFileUrl(
        `https://personalized-fitness-class-booking.onrender.com/api/video/file/${fileId}`
      );
    }
  }, [fileId]);

  return (
    <div>
      {fileUrl ? (
        <img src={fileUrl} alt="Uploaded File" style={{ width: "300px" }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FileViewer;
