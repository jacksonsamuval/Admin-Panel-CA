import React, { useState } from "react";

const AddSongs = () => {
  const [songName, setSongName] = useState("");
  const [songType, setSongType] = useState("");
  const [song, setSong] = useState(""); // To store the song lyrics
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSong = {
      songName,
      songType,
      song,
    };

    try {
      const response = await fetch("http://localhost:8080/admin/addSongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        setMessage("Song added successfully!");
        alert("Song added successfully!");
        setSongName("");
        setSongType("");
        setSong("");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage("Failed to add song. Please try again.");
      console.error("Error adding song:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add a New Song</h1>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="songName" style={styles.label}>
            Song Name
          </label>
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="songType" style={styles.label}>
            Song Type
          </label>
          <input
            type="text"
            id="songType"
            value={songType}
            onChange={(e) => setSongType(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="song" style={styles.label}>
            Song Lyrics
          </label>
          <textarea
            id="song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            style={styles.textArea}
            placeholder="Enter the lyrics of the song here..."
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Add Song
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    marginTop: "100px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  message: {
    fontSize: "16px",
    color: "#28a745",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textArea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddSongs;
