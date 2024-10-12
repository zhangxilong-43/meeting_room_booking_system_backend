import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsNotEmpty({
    message: '会议室id不能为空',
  })
  @ApiProperty()
  meeting_room_id: string;

  @IsNotEmpty({
    message: '开始时间不能为空',
  })
  @ApiProperty()
  startTime: string;

  @IsNotEmpty({
    message: '结束时间不能为空',
  })
  @ApiProperty()
  endTime: string;

  @ApiProperty()
  guests: string[];
}
