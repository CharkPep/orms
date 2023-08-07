import {Customer} from "./@types";
import {up} from "./migrations/20230807185019_init";
import * as net from "net";

const { v4: uuidv4 } = require('uuid');

const chunkSize = 32000;
const NUMBERTOINSERT = 100000;
const firstNames: string[] = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "William",
    "Sophia",
    "David",
    "Olivia",
];

const lastNames: string[] = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
];

function getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'pep',
        password : '0001',
        database : 'mydb'
    },
});

async function main() {
    knex.raw("SELECT 1").then(() => {
        console.log("PostgreSQL connected");
    })
    
    //<----->Insertion benchmark<----->
    // await knex.raw('TRUNCATE TABLE customers_knex CASCADE');
    // const customers : Customer[] = [];
    // const bankAccounts :Bank_Account[]  = [];
    // for (let i = 0; i < NUMBERTOINSERT;i++){
    //     let customer = {
    //         id : uuidv4() as string,
    //         firstName : getRandomElement(firstNames),
    //         lastName : getRandomElement(lastNames),
    //         isActive : Math.random() < 0.5
    //     }
    //     customers.push(customer)
    //     for (let i = 0; i < Math.random()*5 + 1; i++){
    //         bankAccounts.push({
    //             id : uuidv4() as string,
    //             networth : Math.random()*999999,
    //             customer_id : customer.id,
    //         })    
    //     }
    //
    // }
    //
    // console.time('Insertion');
    // await knex.batchInsert('customers_knex', customers, 1000);
    // await knex.batchInsert('bank_accounts_knex', bankAccounts, 1000);
    // console.timeEnd('Insertion');

    //<----->Get all benchmark<----->
    // console.time('Get all');
    // await knex.from('customers_knex').first() as Customer[];
    // console.timeEnd('Get all');

    //<----->Delete benchmark<----->
    // const deleteId = await knex.from('customers_knex').select('id').offset(NUMBERTOINSERT/2).first() as { id : string };
    // console.log(deleteId.id);
    // console.time('Delete');
    // await knex('bank_accounts_knex').where('customer_id', deleteId.id).delete();
    // await knex('customers_knex').where('id', deleteId.id).delete();    
    // console.timeEnd('Delete');

    //<----->Update benchmark<----->
    // const updateId = (await knex.from('customers_knex').select('id').offset(NUMBERTOINSERT/2).first()).id;
    // console.log(updateId);
    // console.time('Update');
    // await knex('customers_knex').where('id', updateId).update({ firstName : 'Roma', lastName : 'Vasich', isActive : true });
    // console.timeEnd('Update');

    //<----->Transaction benchmark<----->
    // console.time('Transaction');
    // await knex.transaction((trx) => {
    //     return trx('bank_accounts_knex').update({ networth : knex.raw('networth * 1.01')})
    //         .whereIn('customer_id', 
    //             knex('bank_accounts_knex')
    //                 .select('customer_id')
    //                 .groupBy('customer_id')
    //                 .havingRaw('sum(networth) >= ?', [1000]))
    // }, {isolationLevel : 'repeatable read'});
    // console.timeEnd('Transaction');

    //<----->Query benchmark<----->
    // console.time('Query');
    // await knex('customers_knex')
    //     .select("firstName", "lastName", )
    //     .sum('networth')
    //     .leftJoin('bank_accounts_knex', 'customers_knex.id', '=', 'bank_accounts_knex.customer_id')
    //     .groupByRaw('"firstName", "lastName", customer_id')
    //     .orderBy('sum', 'desc');
    // console.timeEnd('Query');
}


main()






