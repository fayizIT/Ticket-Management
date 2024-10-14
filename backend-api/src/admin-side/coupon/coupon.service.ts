import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<CouponDocument>) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    try {
      const createdCoupon = new this.couponModel(createCouponDto);
      return await createdCoupon.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create coupon');
    }
  }

  async findAll(): Promise<Coupon[]> {
    try {
      return await this.couponModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve coupons');
    }
  }

  async findOne(id: string): Promise<Coupon> {
    try {
      const coupon = await this.couponModel.findById(id).exec();
      if (!coupon) {
        throw new NotFoundException(`Coupon with ID ${id} not found`);
      }
      return coupon;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // rethrow the NotFoundException
      }
      throw new InternalServerErrorException('Failed to retrieve coupon');
    }
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    try {
      const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec();
      if (!updatedCoupon) {
        throw new NotFoundException(`Coupon with ID ${id} not found`);
      }
      return updatedCoupon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update coupon');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.couponModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Coupon with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete coupon');
    }
  }
}
