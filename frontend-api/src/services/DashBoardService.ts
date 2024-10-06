const API_URL = "http://localhost:3000/admin-auth"; 


export const fetchDashboardData = async () => {
    const token = localStorage.getItem('accessToken'); // Retrieve the token
  
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
  
    const data = await response.json();
    return data.message; // Return the dashboard data
  };
  