import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';


import User from '@modules/users/infra/typeorm/entities/User';

@Entity('pets')
class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  is_adopt: boolean;

  @Column()
  age: string;

  @Column()
  gender: string;

  @Column()
  description: string;

  @Column()
  location_lat: string;

  @Column()
  location_lon: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pet;