import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TimeSlot } from 'src/timeslot/entities/timeslot.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot, Booking, MeetingRoom, User])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
