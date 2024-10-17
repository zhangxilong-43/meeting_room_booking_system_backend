import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/booking/entities/booking.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetBookingDto } from './dto/get-booking.dto';

@Injectable()
export class BookingService {
  
  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;

  @InjectRepository(MeetingRoom)
  private meetingRoomRepository: Repository<MeetingRoom>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createBookingDto: CreateBookingDto) {
    const { startTime, endTime, meetingRoomId } = createBookingDto;
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    await this.checkMeetingTime(newStart, newEnd, meetingRoomId);
    
    const guests = await this.userRepository.find({
      where: {
        id: In([meetingRoomId, ...createBookingDto.guests])
      },
    })

    const meetingRoom = await this.meetingRoomRepository.findOneBy({
      id: createBookingDto.meetingRoomId
    });
    
    const booking = new Booking();
    const host = await this.userRepository.findOneBy({
      id: createBookingDto.meetingRoomId
    })

    booking.room = meetingRoom;
    booking.host = host;
    booking.startTime = startTime;
    booking.endTime = endTime;
    booking.status = 1;
    booking.guests = guests;

    await this.bookingRepository.save(booking);
  }

  async findAll(startDate: string, endDate: string) {
    const bookings = await this.bookingRepository
    .createQueryBuilder('booking')
    .where('booking.status = :status', { status: 1 })
    .andWhere('booking.startTime > :startDate', { startDate: new Date(startDate) })
    .andWhere('booking.endTime < :endDate', { endDate: new Date(endDate) })
    .leftJoinAndSelect('booking.room', 'room')
    .leftJoinAndSelect('booking.guests', 'guests')
    .leftJoinAndSelect('booking.host', 'host')
    .select([
      'booking.id', 
      'booking.note', 
      'booking.startTime', 
      'booking.endTime',
      'room.id',
      'room.name',
      'room.capacity',
      'room.location',
      'room.equipment',
      'room.description',
      'host.id',
      'host.username',
      'guests.id',
      'guests.username',
    ])
    .getMany();

    return bookings;
  }

  async findOne(id: number) {
    return await this.bookingRepository
    .createQueryBuilder('booking')
    .andWhere('booking.id = :id', { id })
    .leftJoinAndSelect('booking.room', 'room')
    .leftJoinAndSelect('booking.guests', 'guests')
    .leftJoinAndSelect('booking.host', 'host')
    .select([
      'booking.id', 
      'booking.note', 
      'booking.startTime', 
      'booking.endTime',
      'room.id',
      'room.name',
      'room.capacity',
      'room.location',
      'room.equipment',
      'room.description',
      'host.id',
      'host.username',
      'guests.id',
      'guests.username',
    ])
    .getOne()
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const needUpdatedBooking = await this.bookingRepository.findOne({
      where: {
        id
      },
      relations: {
        guests: true,
        room: true
      }
    })

    const {
      startTime = needUpdatedBooking.startTime,
      endTime = needUpdatedBooking.endTime,
      guests = [],
      status,
      note = '',
    } = updateBookingDto;

    await this.checkMeetingTime(
      typeof startTime === 'string' ? new Date(startTime) : startTime,
      typeof endTime === 'string' ? new Date(endTime) : endTime,
      needUpdatedBooking.room.id
    );

    needUpdatedBooking.startTime = startTime;
    needUpdatedBooking.endTime = endTime;
    needUpdatedBooking.status = status;
    needUpdatedBooking.note = note;
    needUpdatedBooking.guests = await this.userRepository.find({
      where: {
        id: In(guests)
      },
    });
    
    await this.bookingRepository.save(needUpdatedBooking);
  }

  async checkMeetingTime(newStart, newEnd, roomId) {
    // meeting time limit 2 hours
    if(newEnd.getTime() - newStart.getTime() > 2 * 60 * 60 * 1000) {
      throw new HttpException('会议时长不能超过2小时', HttpStatus.BAD_REQUEST);
    }

    const bookings = await this.bookingRepository
    .createQueryBuilder('booking')
    .where('booking.roomId = :roomId', { roomId })
    .andWhere('booking.status = 1')
    .andWhere('booking.startTime > NOW()')
    .getMany();

    for (let booking of bookings) {
      const { startTime, endTime } = booking;
      const existingStart = new Date(startTime);
      const existingEnd = new Date(endTime);
      if (!(newEnd <= existingStart || newStart >= existingEnd)) {
        throw new HttpException('会议室时间段存在冲突，请重新选择时间', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
