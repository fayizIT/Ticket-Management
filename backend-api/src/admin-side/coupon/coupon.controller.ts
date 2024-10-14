import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';

@Controller('admin/coupons') // Adjust the path as needed
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Return 201 status for creation
  create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll(): Promise<Coupon[]> {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Coupon> {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.couponService.remove(id);
  }
}
