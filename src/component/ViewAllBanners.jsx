import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from 'react-icons/fa'; // Font Awesome icons

const ViewAllBanners = () => {
  const [banners, setBanners] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/viewBanners", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const bannersWithImages = data.map(banner => ({
            ...banner,
            imageUrl: banner.bannerImage ? `data:image/jpeg;base64,${banner.bannerImage}` : null,
          }));
          setBanners(bannersWithImages);
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message || "Failed to fetch banners"}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch banners. Please try again.");
        console.error("Error fetching banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [token]);

  const handleViewImage = (imageUrl) => {
    if (imageUrl) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head>
            <title>Banner Image</title>
            <style>
              body { text-align: center; background-color: #f4f7fb; padding: 20px; }
              img { max-width: 90%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
              h2 { font-size: 24px; color: #333; }
            </style>
          </head>
          <body>
            <h2>Banner Image</h2>
            <img src="${imageUrl}" alt="Banner" />
          </body>
        </html>
      `);
    } else {
      setErrorMessage("No image available.");
    }
  };

  // Function to handle deleting a banner
  const handleDelete = async (bannerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/admin/removeBanners/${bannerId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Remove the deleted banner from the state
          setBanners(banners.filter(banner => banner.id !== bannerId));
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message || "Failed to delete banner"}`);
        }
      } catch (error) {
        setErrorMessage("Failed to delete banner. Please try again.");
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>View Banners</h1>
          <p style={styles.subHeader}>Check all the uploaded banners for your application</p>
        </header>

        {isLoading ? (
          <p style={styles.loadingMessage}>Loading banners...</p>
        ) : (
          <div style={styles.bannerContent}>
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <div key={index} style={styles.bannerCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Banner {index + 1}</h3>
                  </div>

                  <div style={styles.bannerInfo}>
                    {banner.imageUrl ? (
                      <img
                        src={banner.imageUrl}
                        alt={`Banner ${index + 1}`}
                        style={styles.bannerImage}
                      />
                    ) : (
                      <p>No image available for this banner</p>
                    )}
                  </div>

                  <div style={styles.buttonsContainer}>
                    <button onClick={() => handleViewImage(banner.imageUrl)} style={styles.viewImageButton}>
                      <FaEye style={styles.icon} />
                      View Image
                    </button>
                    <button onClick={() => handleDelete(banner.id)} style={styles.deleteButton}>
                      <FaTrash style={styles.icon} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No banners available</p>
            )}
          </div>
        )}

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    marginTop: "50px",
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
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  bannerCard: {
    backgroundColor: "#fafafa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
  },
  bannerInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  bannerImage: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    marginTop: "20px",
  },
  viewImageButton: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  errorMessage: {
    color: "#f44336",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "#888",
  },
  icon: {
    fontSize: "20px",
    marginRight: "10px",
  },
};

export default ViewAllBanners;
