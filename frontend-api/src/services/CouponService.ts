const API_URL = 'http://localhost:3000/admin/coupons';

interface Coupon {
  code: string;
  discount: number;
  isActive: boolean;
}

class CouponService {
  static async getById(couponId: string): Promise<Coupon> {
    try {
      const response = await fetch(`${API_URL}/${couponId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch coupon');
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error fetching coupon by ID:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while fetching coupon');
    }
  }

  // Create a new coupon
  static async create(coupon: Coupon): Promise<void> {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon),
      });

      if (!response.ok) {
        throw new Error('Failed to create coupon');
      }
    } catch (error: any) {
      console.error("Error creating coupon:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while creating coupon');
    }
  }

  // Update an existing coupon
  static async update(couponId: string, coupon: Coupon): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${couponId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon),
      });
      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }
    } catch (error: any) {
      console.error("Error updating coupon:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while updating coupon');
    }
  }

  // Fetch all coupons
  static async fetchCoupons(): Promise<Coupon[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error fetching coupons:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while fetching coupons');
    }
  }

  static async updateCouponStatus(couponId: string, isActive: boolean) {
    try {
      const response = await fetch(`${API_URL}/${couponId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });
      if (!response.ok) {
        throw new Error('Failed to update coupon status');
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error updating coupon status:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while updating coupon status');
    }
  }

  // Delete a coupon by ID
  static async deleteCoupon(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }
    } catch (error: any) {
      console.error("Error deleting coupon:", error.message);
      throw new Error(error.message || 'An unexpected error occurred while deleting coupon');
    }
  }
}

export default CouponService;
