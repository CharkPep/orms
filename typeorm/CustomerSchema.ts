import {Column, DataSource, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BankAccount} from "./BankAccountSchema";

export interface IUser{
    firstName : string;
    lastName : string;
    isActive : boolean;
}

@Entity('customers_typeorm')
@Index(['firstName', 'lastName'])
@Entity()
export class customers_typeorm {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => BankAccount, (bankAccount) => bankAccount.customers_typeorm)
    bankAccounts : BankAccount[];
}