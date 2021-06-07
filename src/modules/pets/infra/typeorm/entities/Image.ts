import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

import Pet from './Pet';

import {Exclude, Expose} from 'class-transformer';

@Entity('images')
class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet)
  @JoinColumn({name: 'pet_id'})
  pet: Pet;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: 'image_url'})
  getAvatarUrl(): string | null{
    return this.image ? 
    this.image.startsWith('http') ? this.image : `${process.env.APP_API_URL}/files/${this.image}`
    : null;
  }
}

export default Image;