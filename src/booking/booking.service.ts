import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { TimeSlot } from 'src/timeslot/entities/timeslot.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookingService {
  
  @InjectRepository(TimeSlot)
  private timeSlotRepository: Repository<TimeSlot>;

  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;

  @InjectRepository(MeetingRoom)
  private meetingRoomRepository: Repository<MeetingRoom>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createBookingDto: CreateBookingDto) {
    const meetingRoom = await this.meetingRoomRepository.findOneBy({
      id: createBookingDto.meetingRoomId
    });
    const timeSlot = new TimeSlot();
    timeSlot.startTime = createBookingDto.startTime;
    timeSlot.endTime = createBookingDto.endTime;
    timeSlot.room = meetingRoom;
    await this.timeSlotRepository.save(timeSlot);

    if (meetingRoom.timeSlots) {
      meetingRoom.timeSlots.push(timeSlot);
    } else {
      meetingRoom.timeSlots = [timeSlot];
    }
    console.log(meetingRoom, 'meetingRoom');
    
    await this.meetingRoomRepository.save(meetingRoom);

    const booking = new Booking();
    const host = await this.userRepository.findOneBy({
      id: 2
    })
    booking.room = meetingRoom;
    booking.timeSlot = timeSlot;
    booking.host = host;

    await this.bookingRepository.save(booking)
  }

  async findAll() {
    
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
