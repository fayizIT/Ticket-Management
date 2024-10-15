// src/services/AgeCategoryService.ts
const BASE_URL = 'http://localhost:3000/admin/ticket-Category';

interface CreateAgeCategoryDto {
    id?:string;
  name: string;
  description: string;
  price: number;
}

export const AgeCategoryService = {
  getAll: async () => {
    const response = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch age categories');
    }
    return response.json();
  },

  create: async (data: CreateAgeCategoryDto) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create age category');
    }
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch age category');
    }
    return response.json();
  },

  update: async (id: string, data: CreateAgeCategoryDto) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update age category');
    }
    return response.json();
  },
  
  delete: async (id: string) => { // Change from number to string
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete age category');
    }
    return response.json();
  },
  
};
