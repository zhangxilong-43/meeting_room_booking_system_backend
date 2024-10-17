import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto {
    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty()
    guests: number[];

    @ApiProperty({ description: '预定状态', default: 1 })
    status: number = 1;

    @ApiProperty({ default: '' })
    note: string = '';
}
