import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Stats {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    totalReceipts: number;
    @Column({type: "float"})
    totalEarend: number;
    @Column()
    totalQuests: number;
    @Column()
    totalCoupons: number;
    @Column()
    totalUsers: number;
  }
  