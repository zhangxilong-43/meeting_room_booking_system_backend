import { Module } from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { TimeSlotController } from './timeslot.controller';

@Module({
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
})
export class TimeSlotModule {}
