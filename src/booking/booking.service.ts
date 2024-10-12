import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { TimeSlot } from 'src/timeslot/entities/timeslot.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  @InjectRepository(TimeSlot)
  private timeSlotRepository: Repository<TimeSlot>;

  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;

  async create(createBookingDto: CreateBookingDto) {
    // return 'This action adds a new booking';
    const booking = new Booking();
    // booking.
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
