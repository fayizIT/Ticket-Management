const API_URL = "http://localhost:3000";

export const fetchDashboardData = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found. User is not authenticated.");
  }

  try {
    const response = await fetch(`${API_URL}/admin-auth/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error.message);
    throw new Error(error.message || "An unexpected error occurred while fetching dashboard data.");
  }
};
