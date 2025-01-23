import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa"; // Font Awesome icons for view, delete, and edit
import "../css/ViewAllSongs.css"

const ViewAllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null); // Track the selected song
  const [isEditing, setIsEditing] = useState(false); // Track if editing is enabled
  const [editedSong, setEditedSong] = useState({
    songName: "",
    songType: "",
    song: "",
  }); // Song data to be edited
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/getAllSongs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSongs(data);
          setFilteredSongs(data); // Initialize filtered songs
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message || "Failed to fetch songs"}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch songs. Please try again.");
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [token]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = songs.filter(
      (song) =>
        song.songName.toLowerCase().includes(value) ||
        song.songType.toLowerCase().includes(value)
    );
    setFilteredSongs(filtered);
  };

  const handleViewSong = (song) => {
    setSelectedSong(song); // Set the selected song to display its lyrics
  };

  const handleDeleteSong = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteSongs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
        setFilteredSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message || "Failed to delete song"}`);
      }
    } catch (error) {
      setErrorMessage("Failed to delete song. Please try again.");
      console.error("Error deleting song:", error);
    }
  };

  const handleEditSong = (song) => {
    setSelectedSong(song); 
    setEditedSong({ songName: song.songName, songType: song.songType, song: song.song });
    setIsEditing(true);
  };

  const handleUpdateSong = async () => {
    if (!selectedSong) {
      setErrorMessage("No song selected for update.");
      return; // Stop the function if no song is selected
    }

    const { songName, songType, song } = editedSong;

    try {
      const response = await fetch(`http://localhost:8080/admin/editSongs/${selectedSong.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ songName, songType, song }),
      });

      if (response.ok) {
        const updatedSong = await response.json();
        setSongs((prevSongs) =>
          prevSongs.map((s) => (s.id === updatedSong.id ? updatedSong : s))
        );
        setFilteredSongs((prevSongs) =>
          prevSongs.map((s) => (s.id === updatedSong.id ? updatedSong : s))
        );
        setIsEditing(false); // Close the edit modal
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message || "Failed to update song"}`);
      }
    } catch (error) {
      setErrorMessage("Failed to update song. Please try again.");
      console.error("Error updating song:", error);
    }
  };

  return (
    <div className="container">
      <div className="song-details">
        <header className="header-container">
          <h1 className="header">View Songs</h1>
          <p className="sub-header">Browse all the songs and view their lyrics</p>
        </header>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by song name or type..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {isLoading ? (
          <p className="loading-message">Loading songs...</p>
        ) : (
          <div className="song-content">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <div key={index} className="song-card">
                  <div className="card-header">
                    <h3 className="card-title">{song.songName}</h3>
                    <p className="card-subtitle">Type: {song.songType}</p>
                    <p className="card-subtitle">
                      Added On: {new Date(song.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="buttons-container">
                    <button onClick={() => handleViewSong(song)} className="view-song-button">
                      <FaEye className="icon" />
                      View Song
                    </button>
                    <button onClick={() => handleEditSong(song)} className="edit-button">
                      <FaEdit className="icon" />
                      Edit Song
                    </button>
                    <button onClick={() => handleDeleteSong(song.id)} className="delete-button">
                      <FaTrash className="icon" />
                      Delete Song
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No songs match your search</p>
            )}
          </div>
        )}

        {selectedSong && (
          <div className="lyrics-modal">
            <div className="modal-content">
              <h2 className="modal-header">{selectedSong.songName}</h2>
              <p className="modal-lyrics">{selectedSong.song}</p>
              <button onClick={() => setSelectedSong(null)} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="edit-modal">
            <div className="modal-content">
              <h2 className="modal-header">Edit Song</h2>
              <label>
                Song Name:
                <input
                  type="text"
                  value={editedSong.songName}
                  onChange={(e) => setEditedSong({ ...editedSong, songName: e.target.value })}
                  className="input-field"
                />
              </label>
              <label>
                Song Type:
                <input
                  type="text"
                  value={editedSong.songType}
                  onChange={(e) => setEditedSong({ ...editedSong, songType: e.target.value })}
                  className="input-field"
                />
              </label>
              <label>
                Lyrics:
                <textarea
                  value={editedSong.song}
                  onChange={(e) => setEditedSong({ ...editedSong, song: e.target.value })}
                  className="textarea-field"
                />
              </label>
              <div className="buttons-container">
                <button onClick={handleUpdateSong} className="save-button">
                  Save Changes
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ViewAllSongs;

