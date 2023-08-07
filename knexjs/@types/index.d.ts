import {Knex} from "knex";
import {Bank_Account} from "../main";

export declare type Customer = {
    id? : string,
    firstName : string,
    lastName : string,
    isActive : boolean,
    bank_accounts? : Bank_Account[]
}

export declare type Bank_Account = {
    id? : string,
    networth : number,
    customer_id : string,
    customer? : Customer,
}

declare module 'knex/types/tables' {
    interface Tables {
        customers_knex: Customer;
        bank_accounts_knex : Bank_Account;
        customers_knex_composite: Knex.CompositeTableType<
            Customer,
            Pick<Customer, 'isActive' | 'lastName' | 'firstName'>,
            Partial<Omit<Customer, 'id'>>
        >;
        bank_accounts_knex_composite : Knex.CompositeTableType<
            Bank_Account,
            Partial<Omit<Bank_Account, 'id'>>
        >
    }
}
