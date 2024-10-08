const API_URL = 'http://localhost:3000/admin/age-categories'; // Change this to your API URL

export const getAgeCategories = async () => {
    try {
        const response = await fetch(API_URL);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        return data; // Return the data
    } catch (error) {
        console.error('Error fetching age categories', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
