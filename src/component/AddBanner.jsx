import React, { useState } from "react";

const AddBanner = () => {
  const [imageFile, setBannerImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleAddBanner = async () => {
    if (!imageFile) {
      setErrorMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/admin/addBanners", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token for authorization
        },
        body: formData, // FormData automatically sets the content-type
      });

      if (response.ok) {
        setSuccessMessage("Banner added successfully!");
        setBannerImage(null); 
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message || "Failed to upload the banner"}`);
      }
    } catch (error) {
      setErrorMessage("Failed to upload the banner. Please try again.");
      console.error("Error uploading banner:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrorMessage("File size must not exceed 5MB.");
        return;
      }
      setBannerImage(file);
      setErrorMessage(""); // Clear error if file is valid
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>Manage Banners</h1>
          <p style={styles.subHeader}>Upload and manage banners for your application</p>

          {/* Add Banner Form */}
          <div style={styles.addBannerForm}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              aria-label="Select banner image"
            />
            <button
              onClick={handleAddBanner}
              style={{
                ...styles.uploadButton,
                ...(isLoading ? styles.uploadButtonDisabled : {}),
              }}
              disabled={isLoading}
              aria-label="Upload banner"
            >
              {isLoading ? "Uploading..." : "Upload Banner"}
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        </header>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif",
    padding: "30px",
  },
  problemDetails: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "900px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  header: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subHeader: {
    fontSize: "18px",
    color: "#777",
    marginBottom: "20px",
  },
  addBannerForm: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginBottom: "20px",
  },
  fileInput: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  uploadButtonDisabled: {
    backgroundColor: "#b0c4de",
    cursor: "not-allowed",
  },
  errorMessage: {
    color: "#f44336",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  successMessage: {
    color: "#28a745",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
};

export default AddBanner;
