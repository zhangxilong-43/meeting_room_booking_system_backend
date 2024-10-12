import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';

@Injectable()
export class TimeSlotService {
  create(createTimeSlotDto: CreateTimeSlotDto) {
    return 'This action adds a new timeslot';
  }

  findAll() {
    return `This action returns all timeslot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeslot`;
  }

  update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    return `This action updates a #${id} timeslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`;
  }
}
