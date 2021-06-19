import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

  
import {Exclude, Expose} from 'class-transformer';
import User from '@modules/users/infra/typeorm/entities/User';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';

@Entity('favsUserPets')
class FavUserPets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  @Exclude()
  user: User;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet)
  @JoinColumn({name: 'pet_id'})
 
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: 'user_name'})
  getUserName():string{
    return this.user.name;
  }
  @Expose({name: 'user_phone'})
  getUserPhone():string{
    return this.user.phone;
  }
  @Expose({name: 'user_avatar'})
  getUserAvatar():string{
    return this.user.getAvatarUrl();
  }
}

export default FavUserPets;