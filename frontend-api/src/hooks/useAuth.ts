import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken'));

    // Function to update authentication state based on localStorage
    const checkAuthentication = () => {
        setIsAuthenticated(!!localStorage.getItem('accessToken'));
    };

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        checkAuthentication(); // Update state after login
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        checkAuthentication(); // Update state after logout
    };

    useEffect(() => {
        // Check authentication on component mount
        checkAuthentication();

        // Listen for storage changes
        const handleStorageChange = () => {
            checkAuthentication();
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { isAuthenticated, login, logout };
};

export default useAuth;
