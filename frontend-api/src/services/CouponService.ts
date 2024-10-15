// src/services/CouponService.ts
const BASE_URL = 'http://localhost:3000/admin/coupons';

interface Coupon {
  code: string;
  discount: number;
  expiryDate: Date;
  isActive: boolean;
}

class CouponService {

      // Create a new coupon
  static async create(coupon: Coupon): Promise<void> {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coupon),
    });

    if (!response.ok) {
      throw new Error('Failed to create coupon');
    }
  }
  // Fetch all coupons
  static async fetchCoupons(): Promise<Coupon[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch coupons');
    }
    return response.json();
  }

  // Delete a coupon by ID
  static async deleteCoupon(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete coupon');
    }
  }
}

export default CouponService;
