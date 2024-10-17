import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookingDto {
  @IsNotEmpty({
    message: '开始日期不能为空',
  })
  @ApiProperty()
  startDate: string;

  @IsNotEmpty({
    message: '结束日期不能为空',
  })
  @ApiProperty()
  endDate: string;
}
