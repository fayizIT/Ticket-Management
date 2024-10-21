const API_URL = "http://localhost:3000";
export const login = async (email: string, password: string) => {
  if (!API_URL) {
    throw new Error("API_URL is not defined in the environment variables");
  }

  const response = await fetch(`${API_URL}/admin-auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid credentials");
  }

  return await response.json();
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");

  // If no token is found, throw an error
  if (!token) {
    throw new Error("No access token found. User is not logged in.");
  }

  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    localStorage.removeItem("accessToken");
  } catch (error: any) {
    console.error("Error during logout:", error.message);
    throw new Error(
      error.message || "An unexpected error occurred during logout."
    );
  }
};
