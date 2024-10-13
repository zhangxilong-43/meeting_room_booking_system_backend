import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsNotEmpty({
    message: '会议室id不能为空',
  })
  @ApiProperty()
  meetingRoomId: number;

  @IsNotEmpty({
    message: '开始时间不能为空',
  })
  @ApiProperty()
  startTime: Date;

  @IsNotEmpty({
    message: '结束时间不能为空',
  })
  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  guests: string[];
}
