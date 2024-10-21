const BASE_URL = "http://localhost:3000/admin/ticket-Category";

interface CreateTicketCategoryDto {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export const TicketCategoryService = {
  getAll: async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket categories");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred while fetching ticket categories.");
    }
  },

  create: async (data: CreateTicketCategoryDto) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket category");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating ticket category:", error);
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred while creating ticket category.");
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket category");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching ticket category by ID:", error);
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred while fetching ticket category.");
    }
  },

  update: async (id: string, data: CreateTicketCategoryDto) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket category");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating ticket category:", error);
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred while updating ticket category.");
    }
  },

  delete: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete ticket category");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error deleting ticket category:", error);
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred while deleting ticket category.");
    }
  },
};
