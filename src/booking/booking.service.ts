import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/booking/entities/booking.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookingService {
  
  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;

  @InjectRepository(MeetingRoom)
  private meetingRoomRepository: Repository<MeetingRoom>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createBookingDto: CreateBookingDto) {
    const meetingRoom = await this.meetingRoomRepository.findBy({
      id: createBookingDto.meetingRoomId
    });

    const bookings = await this.bookingRepository
    .createQueryBuilder('booking')
    .where('booking.roomId = :roomId', { roomId: createBookingDto.meetingRoomId })
    .andWhere('booking.startTime > NOW()')
    .getMany();

    console.log(bookings, 'meetingRoom');
    
    // const guests = await this.userRepository.find({
    //   where: {
    //     id: In([createBookingDto.meetingRoomId, ...createBookingDto.guests])
    //   },
    // })
    // const { startTime, endTime } = createBookingDto;
    // const booking = new Booking();
    // const host = await this.userRepository.findOneBy({
    //   id: createBookingDto.meetingRoomId
    // })
    // booking.room = meetingRoom;
    // booking.host = host;
    // booking.startTime = startTime;
    // booking.endTime = endTime;
    // booking.status = '成功';
    // booking.guests = guests;

    // await this.bookingRepository.save(booking);
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
