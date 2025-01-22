import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Redirect to the Problem page
  const handleRedirectToProblem = () => {
    navigate("/problem");
  };

  const handleCompletedProblem = () => {
    navigate("/completedProblem");
  };

  const handleViewProblem = () => {
    navigate("/viewProblem");
  };


  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.headerContainer}>
        <h1 style={styles.header}>Welcome Back to Your Dashboard</h1>
        <p style={styles.subHeader}>Quickly manage your reports and track progress</p>
      </header>

      {/* Cards for Actions */}
      <div style={styles.cardContainer}>
        {/* Card 1: Submit Problem */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Submit a New Problem</h2>
          <p style={styles.cardDescription}>
            Report an issue quickly, with the ability to add details and images.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleRedirectToProblem} style={styles.button}>
              Submit Problem
            </button>
          </div>
        </div>

        {/* Card 2: View Reports */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View your Completed Problems</h2>
          <p style={styles.cardDescription}>
            Check the Completed Issues of your Problem.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleCompletedProblem} style={styles.button}>
              View Reports
            </button>
          </div>
        </div>

        {/* Card 3: View Reports (Duplicate) */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View Your Submitted Problems</h2>
          <p style={styles.cardDescription}>
            Check the status of your previous reports and monitor their progress.
          </p>
          <div style={styles.buttonContainer}>
            <button onClick={handleViewProblem} style={styles.button}>
              View Reports
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
