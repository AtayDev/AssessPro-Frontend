import React, { useState } from "react";
import * as XLSX from "xlsx";
import { iconPaths } from "../utils/iconPaths";

//import "../styles/ImportTeams.css";

const ImportManagers = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("file recognized: " + file);

      const response = await fetch(
        "http://localhost:8080/shifter_api/managers/import",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        const errorData = await response.json();
        setError("Failed to upload file: " + errorData.message);
      }
    } catch (err) {
      setError("Failed to upload file: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        id="fileInput"
        style={{ display: "none" }}
      />
      <label htmlFor="fileInput" className="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        >
          <path d={iconPaths.manager2} />
        </svg>
        Import Manager Data
      </label>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImportManagers;
