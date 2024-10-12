import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';

@Controller('timeslot')
export class TimeSlotController {
  constructor(private readonly timeslotService: TimeSlotService) {}

  @Post()
  create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeslotService.create(createTimeSlotDto);
  }

  @Get()
  findAll() {
    return this.timeslotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
  ) {
    return this.timeslotService.update(+id, updateTimeSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotService.remove(+id);
  }
}
