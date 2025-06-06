import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Status } from "../interface/IAppointments";

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'varchar', length: 5, nullable: false })
  time: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: Status.active,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}