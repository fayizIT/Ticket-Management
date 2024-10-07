const API_URL = "http://localhost:3000/admin-auth"; 


export const fetchDashboardData = async () => {
  const token = localStorage.getItem('accessToken');

  const response = await fetch('http://localhost:3000/admin-auth/dashboard', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`, // Include the token here
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
  }

  const data = await response.json();
  return data;
};

  