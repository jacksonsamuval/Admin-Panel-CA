import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Redirect to the Problem page
  const handleRedirectToProblem = () => {
    navigate("/upload");
  };

  const handleViewAllVideos = () => {
    navigate("/viewAllVideos");
  };

  const handleAddBanner = () => {
    navigate("/uploadBanners");
  };

  const handleViewBanner = () => {
    navigate("/viewAllBanners");
  };

  const handleAddSongs = () => {
    navigate("/addSongs");
  };

  const handleViewAllSongs = () => {
    navigate("/viewAllSongs")
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.headerContainer}>
        <h1 style={styles.header}>Welcome Back to Your Dashboard</h1>
        <p style={styles.subHeader}>Quickly manage your Videos and track progress</p>
      </header>

      {/* Cards for Actions */}
      <div style={styles.cardContainer}>
        {/* Card 1: Submit Problem */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add a New Video</h2>
          <p style={styles.cardDescription}>
            Add an video to the Database entering video Details.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleRedirectToProblem} style={styles.button}>
              Add Video
            </button>
          </div>
        </div>

        {/* Card 2: View Reports */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View All Your Videos</h2>
          <p style={styles.cardDescription}>
            View All the Videos Availaible in the Database by clicking the button.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleViewAllVideos} style={styles.button}>
              View Videos
            </button>
          </div>
        </div>

        {/* Card 3: View Reports (Duplicate) */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add Banners</h2>
          <p style={styles.cardDescription}>
            Add Banners to view at the home page add only 4 banners.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleAddBanner} style={styles.button}>
              Add Banners
            </button>
          </div>
        </div>

        {/* view All Banners */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View All Banners</h2>
          <p style={styles.cardDescription}>
            View and Delete Banners Which Will be displayed in home page of Application.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleViewBanner} style={styles.button}>
              View Banners
            </button>
          </div>
        </div>

        {/* Add Songs */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add Song Lyrics</h2>
          <p style={styles.cardDescription}>
            Add Songs Lyrics to your Database to view in your Application.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleAddSongs} style={styles.button}>
              Add Songs
            </button>
          </div>
        </div>

        {/* View Songs */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View All Added Songs</h2>
          <p style={styles.cardDescription}>
            View All the Songs Lyrics Added to your Database.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleViewAllSongs} style={styles.button}>
              View Songs
            </button>
          </div>
        </div>
      </div>

      {/* Footer for Support */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Need help? <span style={styles.contactLink}>Contact Support</span>
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f4f7fb", // Soft background color
    minHeight: "100vh",
    marginTop: "30px",
    fontFamily: "'Roboto', sans-serif",
    padding: "34px",
  },
  headerContainer: {
    textAlign: "center",
    marginTop:"30px",
    marginBottom: "40px", // Space between header and content
  },
  header: {
    fontSize: "34px",
    fontWeight: "700", // Make header bold to stand out
    color: "#333",
    marginBottom: "8px",
  },
  subHeader: {
    fontSize: "16px",
    color: "#777",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap", // Allows cards to wrap into a new row on smaller screens
    gap: "20px",
    maxWidth: "1200px",
    width: "100%",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "30%", // Ensure each card takes 30% of the container width
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    textAlign: "center",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0072ff",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    letterSpacing: "1px",
  },
  buttonHover: {
    backgroundColor: "blue",
    transform: "scale(1.05)",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
    color: "#888",
  },
  footerText: {
    margin: 0,
  },
  contactLink: {
    color: "#0072ff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Dashboard;
