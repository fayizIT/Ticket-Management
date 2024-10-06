const API_URL = "http://localhost:3000/admin-auth";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    return data;
};

export const logout = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    localStorage.removeItem('accessToken');
};
