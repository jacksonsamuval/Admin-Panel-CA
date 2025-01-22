import React, { useState, useEffect } from "react";

const VideoList = () => {
  const [videoData, setVideoData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null); // State for editing video
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/getAllVideos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideoData(data);
        } else if (response.status === 401) {
          setErrorMessage("Unauthorized: Please log in again.");
          console.error("Error: Unauthorized access. Token may be invalid.");
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch videos. Please try again.");
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [token]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteVideo/${videoId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setVideoData(videoData.filter((video) => video.id !== videoId)); // Remove video from state
        alert("Video deleted successfully.");
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setErrorMessage("Failed to delete video. Please try again.");
      console.error("Error deleting video:", error);
    }
  };

  const handleEditClick = (video) => {
    setEditingVideo({
      ...video,
      videoUrl: video.url, // Map 'url' to 'videoUrl' for editing
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { videoName, videoDescription, videoUrl } = editingVideo;

    try {
      const response = await fetch(`http://localhost:8080/admin/editVideo/${editingVideo.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoName, videoDescription, videoUrl }),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setVideoData(
          videoData.map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
          )
        );
        setEditingVideo(null); // Close the edit form
        alert("Video updated successfully.");
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setErrorMessage("Failed to update video. Please try again.");
      console.error("Error updating video:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVideo({ ...editingVideo, [name]: value });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Video List</h1>
        <p>Explore the latest videos available</p>
      </header>

      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

      <div style={styles.videoList}>
        {videoData.length > 0 ? (
          videoData.map((video) =>
            video.url ? ( // Check if video.url exists
              <div key={video.id} style={styles.videoCard}>
                <img
                  src={`https://img.youtube.com/vi/${new URL(video.url).searchParams.get("v") || ""}/hqdefault.jpg`}
                  alt={video.videoName}
                  style={styles.thumbnail}
                  onClick={() => handleVideoClick(video)}
                />
                <div style={styles.videoDetails}>
                  <h3 style={styles.videoName}>{video.videoName}</h3>
                  <p style={styles.videoDescription}>{video.videoDescription}</p>
                  <p style={styles.uploadTime}>
                    Uploaded at: {new Date(video.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(video)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : null // If no video.url, do not render this video
          )
        ) : (
          <p style={styles.loadingMessage}>Loading videos...</p>
        )}
      </div>

      {selectedVideo && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${new URL(selectedVideo.url).searchParams.get("v")}`}
              title={selectedVideo.videoName}
              style={styles.iframe}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {editingVideo && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button onClick={() => setEditingVideo(null)} style={styles.closeButton}>
              &times;
            </button>
            <h3>Edit Video</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="videoName"
                value={editingVideo.videoName}
                onChange={handleEditChange}
                placeholder="Video Name"
                required
                style={styles.input}
              />
              <textarea
                name="videoDescription"
                value={editingVideo.videoDescription}
                onChange={handleEditChange}
                placeholder="Video Description"
                required
                style={styles.input}
              />
              <input
                type="url"
                name="videoUrl"
                value={editingVideo.videoUrl}
                onChange={handleEditChange}
                placeholder="Video URL"
                required
                style={styles.input}
              />
              <button type="submit" style={styles.submitButton}>
                Update Video
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    marginTop: "60px",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  errorMessage: {
    color: "#f44336",
    textAlign: "center",
    marginBottom: "20px",
  },
  videoList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  videoCard: {
    display: "flex",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  thumbnail: {
    width: "150px",
    height: "auto",
    borderRadius: "8px",
    marginRight: "20px",
  },
  videoDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  videoName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  videoDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  uploadTime: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "15px",
  },
  deleteButton: {
    backgroundColor: "#ff4747",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  modalContent: {
    position: "relative",
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  iframe: {
    width: "100%",
    height: "450px",
    borderRadius: "10px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default VideoList;
