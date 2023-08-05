import {Check, Column, DataSource, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {customers_typeorm as customers_typeorm} from "./CustomerSchema";

export interface IUser{
    firstName : string;
    lastName : string;
    isActive : boolean;
}

@Entity('bank_accounts_typeorm')
@Check(`"networth" >= 0.0`)
export class BankAccount {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('decimal', { precision : 9, scale : 2, default : 0 })
    networth : number;

    @Index()
    @ManyToOne(() => customers_typeorm, (customers_typeorm) => customers_typeorm.bankAccounts)
    customers_typeorm : customers_typeorm;
    
}