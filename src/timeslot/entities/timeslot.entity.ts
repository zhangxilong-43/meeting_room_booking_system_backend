import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity({
  name: 'timeSlot'
})
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '会议开始时间',
  })
  startTime: Date;

  @Column({
    comment: '会议结束时间',
  })
  endTime: Date;

  @Column({
    comment: '是否被预订',
    default: true,
  })
  isBooked: boolean;

  @ManyToOne(() => MeetingRoom, meetingRoom => meetingRoom.timeSlots)
  @JoinColumn()
  room: MeetingRoom;
}
