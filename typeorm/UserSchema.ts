import {Column, DataSource, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

export interface IUser{
    firstName : string;
    lastName : string;
    isActive : boolean;
}

@Entity('users_typeorm')
@Index(['firstName', 'lastName'])
@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;
    
}