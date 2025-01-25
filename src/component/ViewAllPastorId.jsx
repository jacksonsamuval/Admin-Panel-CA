import React, { useState, useEffect } from "react";

const ViewAllPastorId = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/home/pastor/getPastorId", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setFilteredData(data);
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch the data. Please try again.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = userData.filter((user) =>
      (user.email?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (user.pastorName?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (user.pastorIdentity?.toLowerCase() || "").includes(query.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const deletePastor = async (id, isVerified) => {
    if (isVerified) {
      alert("Cannot delete a verified pastor.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/admin/deleteId/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Pastor deleted successfully.");
        // Remove the deleted pastor from the state
        const updatedData = userData.filter((user) => user.id !== id);
        setUserData(updatedData);
        setFilteredData(updatedData);
      } else {
        const error = await response.json();
        alert(`Failed to delete pastor: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting pastor:", error);
      alert("Failed to delete pastor. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>All Pastor Id's</h1>
          <p style={styles.subHeader}>All The Pastor Id's from the Database</p>
        </header>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by email, pastor name or pastor Identity"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <br />

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {filteredData.length > 0 ? (
          <div style={styles.problemContent}>
            {filteredData.map((user, index) => (
              <div key={index} style={styles.problemCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Pastor Name: {user.pastorName}</h3>
                  <div
                    style={{
                      ...styles.statusTag,
                      backgroundColor: user.verifiedPastor ? "#28a745" : "#dc3545",
                    }}
                  >
                    {user.verifiedPastor ? "Verified" : "Not Verified"}
                  </div>
                </div>

                <div style={styles.problemInfo}>
                  <div style={styles.problemColumn}>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Pastor Identity:</strong> {user.pastorIdentity}
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.deleteButton,
                      backgroundColor: user.verifiedPastor ? "#ccc" : "#dc3545",
                      cursor: user.verifiedPastor ? "not-allowed" : "pointer",
                    }}
                    onClick={() => deletePastor(user.id, user.verifiedPastor)}
                    disabled={user.verifiedPastor}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.loadingMessage}>
            {searchQuery ? "No Pastor matches your search." : "Loading..."}
          </p>
        )}
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
  deleteButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
  },
  searchBar: {
    marginBottom: "20px",
    textAlign: "center",
  },
  searchInput: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
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
    maxHeight: "80vh",
    overflowY: "auto",
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
  errorMessage: {
    color: "#f44336",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  problemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  problemCard: {
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
  statusTag: {
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "14px",
  },
  problemInfo: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },
  problemColumn: {
    flex: 1,
    minWidth: "30%",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "#888",
  },
};

export default ViewAllPastorId;
