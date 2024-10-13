// src/services/StayCategoryService.ts
export class StayCategoryService {
    static async fetchAll() {
        const response = await fetch('http://localhost:3000/admin/stay-categories', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch stay categories');
        }

        return await response.json();
    }

    static async fetchById(id: string) {
        try {
            const response = await fetch(`http://localhost:3000/admin/stay-categories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`Error: ${response.status} - ${errorMessage}`);
                throw new Error(`Failed to fetch stay category with ID: ${id}`);
            }
            return await response.json();
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                throw new Error(`Error fetching category: ${error.message}`);
            } else {
                throw new Error('Unknown error occurred while fetching category');
            }
        }
    }
    static async delete(id: string) {
        const response = await fetch(`http://localhost:3000/admin/stay-categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    
        console.log('Response status:', response.status); // Log status
    
        // Check if the response is OK
        if (!response.ok) {
            // If not OK, log the response text for inspection and throw an error
            const errorMessage = await response.text();
            console.error(`Error: ${response.status} - ${errorMessage}`);
            throw new Error('Failed to delete stay category');
        }
    
        // For 204 No Content, return nothing
        if (response.status === 204) {
            return; // No content to return
        }
    
        // Attempt to parse JSON for other statuses
        try {
            const data = await response.json();
            return data; // Return parsed JSON data
        } catch (error) {
            // Handle JSON parsing error
            console.error('JSON parsing error:', error);
            throw new Error('Failed to parse response JSON');
        }
    }
    
    
      
      

    static async create(stayCategory: { name: string; description: string; price: number; }) {
        const response = await fetch('http://localhost:3000/admin/stay-categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(stayCategory),
        });

        if (!response.ok) {
            throw new Error('Failed to create stay category');
        }

        return await response.json();
    }

    static async update(id: string, stayCategory: { name: string; description: string; price: number; }) {
        const response = await fetch(`http://localhost:3000/admin/stay-categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(stayCategory),
        });

        if (!response.ok) {
            throw new Error('Failed to update stay category');
        }

        return await response.json();
    }
}
