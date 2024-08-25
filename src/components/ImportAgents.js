import React, { useState, useEffect } from "react";
import { iconPaths } from "../utils/iconPaths";

const ImportAgents = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    console.log("MyFile : " + file);
    setFile(file);
  }, [file]);
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8080/shifter_api/agents/import",
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
    <div className="import-agents">
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
          <path d={iconPaths.agent} />
        </svg>
        Import Agent Data
      </label>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ImportAgents;
