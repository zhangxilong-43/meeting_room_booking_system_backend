import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';

@Entity({
  name: 'booking'
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '会议开始时间'
  })
  startTime: Date;

  @Column({
    comment: '会议结束时间'
  })
  endTime: Date;

  @Column({
    length: 20,
    comment: '状态（成功、取消）',
    default: '成功',
  })
  status: string;

  @Column({
    length: 100,
    comment: '备注',
    default: '',
  })
  note: string;

  @ManyToMany(() => User, user => user.bookings)
  @JoinTable()
  guests: User[];

  @ManyToOne(() => User)
  host: User;

  @ManyToOne(() => MeetingRoom)
  room: MeetingRoom;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
