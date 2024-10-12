import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';
import { TimeSlot } from 'src/timeslot/entities/timeslot.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => User)
  guests: User[];

  @ManyToOne(() => User)
  host: User;

  @ManyToOne(() => MeetingRoom)
  room: MeetingRoom;

  @OneToOne(() => TimeSlot)
  timeSlot: TimeSlot;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
