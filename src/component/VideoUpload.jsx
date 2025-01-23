import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "500px",
    marginTop: "100px",
    margin: "50px auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  header: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
    letterSpacing: "0.5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    fontSize: "14px",
    color: "#888",
    fontWeight: "500",
    marginBottom: "5px",
    textAlign: "left",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    transition: "border 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#0072ff",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    fontWeight: "600",
    letterSpacing: "1px",
  },
  error: {
    color: "#f44336",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "20px",
  },
};

const AddVideo = () => {
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token)
    if (!videoName || !videoDescription || !url) {
      setErrorMessage("All fields are required!");
      return;
    }

    setErrorMessage("");

    const payload = {
      videoName,
      videoDescription,
      url,
    };

    try {
      const response = await fetch("http://localhost:8080/admin/addVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Video added successfully!");
        setVideoName("");
        setVideoDescription("");
        setUrl("");
        navigate("/adminDashboard"); // Redirect to admin dashboard or any other route
      } else {
        const error = await response.json();
        setErrorMessage(`Failed to add the video: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding the video. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Video</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Video Name:</label>
          <input
            style={styles.input}
            type="text"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
          />
        </div>
        <div>
          <label style={styles.label}>Video Description:</label>
          <textarea
            style={{
              ...styles.input,
              height: "100px",
              resize: "none",
            }}
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>
        <div>
          <label style={styles.label}>Video URL:</label>
          <input
            style={styles.input}
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#005bb5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0072ff")}
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
