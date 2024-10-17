import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetBookingDto } from './dto/get-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.create(createBookingDto);
  }

  @Get()
  async findAll(@Query(ValidationPipe) getBookingDto: GetBookingDto) {
    const { startDate, endDate } = getBookingDto;
    return await this.bookingService.findAll(startDate, endDate);
  }

  @Post('/update')
  async update(@Query('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return await this.bookingService.update(+id, updateBookingDto);
  }
}
