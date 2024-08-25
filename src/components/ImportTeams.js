import React, { useState } from "react";
import * as XLSX from "xlsx";
import { iconPaths } from "../utils/iconPaths";

import "../styles/ImportTeams.css";

const ImportTeams = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      const response = await fetch(
        "http://localhost:8080/shifter_api/teams/import",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSuccess("File uploaded successfully!");
        setError("");
      } else {
        const errorData = await response.json();
        setError("Failed to upload file: " + errorData.message);
        setSuccess("");
      }
    } catch (err) {
      setError("Failed to upload file: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div className="import-teams">
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
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
          <path d={iconPaths.users} />
        </svg>
        Import Team Data
      </label>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default ImportTeams;
