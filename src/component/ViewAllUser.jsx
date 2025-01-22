import React, { useState, useEffect } from "react";

const ViewAllUser = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/getAllUser", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Store the data
          setFilteredData(data); // Initially display all users
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

    // Filter userData based on name, mobileNo, email, or role
    const filtered = userData.filter((user) =>
      (user.name?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (user.mobileNo?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (user.role?.toLowerCase() || "").includes(query.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>All Users</h1>
          <p style={styles.subHeader}>Details of all users registered in the system</p>
        </header>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by description, user name, email or Role"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={styles.searchInput}
          /> 
        </div> <br/>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {filteredData.length > 0 ? (
          <div style={styles.problemContent}>
            {filteredData.map((user, index) => (
              <div key={index} style={styles.problemCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>User: {user.name}</h3>
                  <div style={styles.statusTag}>{user.role}</div>
                </div>

                <div style={styles.problemInfo}>
                  <div style={styles.problemColumn}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile No:</strong> {user.mobileNo}</p>
                  </div>

                  <div style={styles.problemColumn}>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.loadingMessage}>
            {searchQuery ? "No users match your search." : "Loading..."}
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
    backgroundColor: "#28a745",
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    marginTop: "20px",
  },
  icon: {
    fontSize: "20px",
    marginRight: "10px",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "#888",
  },
};

export default ViewAllUser;
