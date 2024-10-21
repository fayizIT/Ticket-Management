// src/services/StayCategoryService.ts

export class StayCategoryService {
  private static API_URL = "http://localhost:3000/admin/stay-categories";

  private static getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }

  static async fetchAll() {
    try {
      const response = await fetch(this.API_URL, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stay categories");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching all stay categories:", error);
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  static async fetchById(id: string) {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `Error fetching stay category: ${response.status} - ${errorMessage}`
        );
        throw new Error(`Failed to fetch stay category with ID: ${id}`);
      }

      return await response.json();
    } catch (error: unknown) {
      console.error("Error fetching stay category by ID:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while fetching category"
      );
    }
  }

  static async delete(id: string) {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      console.log("Response status:", response.status); // Log status

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `Error deleting stay category: ${response.status} - ${errorMessage}`
        );
        throw new Error("Failed to delete stay category");
      }

      if (response.status === 204) {
        return;
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting stay category:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting category"
      );
    }
  }

  static async create(stayCategory: {
    name: string;
    description: string;
    price: number;
  }) {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(stayCategory),
      });

      if (!response.ok) {
        throw new Error("Failed to create stay category");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating stay category:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while creating category"
      );
    }
  }

  static async update(
    id: string,
    stayCategory: { name: string; description: string; price: number }
  ) {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(stayCategory),
      });

      if (!response.ok) {
        throw new Error("Failed to update stay category");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating stay category:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while updating category"
      );
    }
  }
}
