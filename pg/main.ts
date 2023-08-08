import {Customer, Bank_Account} from "../knexjs/@types";
const { v4: uuidv4 } = require('uuid');

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
const pgp = require('pg-promise')();

const db = pgp({
    host: '127.0.0.1',
    port: 5432,
    database: 'mydb',
    user: 'pep',
    password: '0001',
})

db.connect().then(() => {
    console.log('Connection established');
});

interface Tables {
    customers_knex : Customer;
}

async function main(){
    //<----->Insertion benchmark<----->
    // await db.query('TRUNCATE customers_knex CASCADE');
    // const customers : Customer[] = [];
    // for (let i = 0; i < NUMBERTOINSERT;i++){
    //     let customer : Customer = {
    //         id : uuidv4() as string,
    //         firstName : getRandomElement(firstNames),
    //         lastName : getRandomElement(lastNames),
    //         isActive : Math.random() < 0.5,
    //         bank_accounts : [],
    //     }
    //    
    //     for (let i = 0; i < Math.random()*5 + 1; i++){
    //         if(customer.bank_accounts){
    //             customer.bank_accounts.push({
    //                 networth : Math.random()*999999,
    //                 customer_id : customer.id,
    //             })
    //         }
    //     }
    //    
    //     customers.push(customer)
    //
    // }
    //
    // const accountData : Bank_Account[] = [];
    // customers.forEach((customer) => {
    //     if(customer.bank_accounts){
    //         customer.bank_accounts.forEach((account) => {
    //             accountData.push({
    //                 id : uuidv4 as string,
    //                 networth: account.networth,
    //                 customer_id: account.customer_id,
    //             });
    //         });
    //     }
    // });
    // const insertCustomersQuery = pgp.helpers.insert(customers, ['id', 'firstName', 'lastName', 'isActive'], 'customers_knex');
    // const insertAccountsQuery = pgp.helpers.insert(accountData, ['id', 'networth', 'customer_id'], 'bank_accounts_knex');
    //
    // console.time('Insertion');
    // await db.tx(async (t) => {
    //     await t.none(insertCustomersQuery);
    //     await t.none(insertAccountsQuery);
    // });
    // console.timeEnd('Insertion')
    //<----->Get all benchmark<----->
    // console.time('Get all');
    // await db.query('SELECT * FROM customers_knex');
    // console.timeEnd('Get all');
    //<----->Delete benchmark<----->
    // const deleteId = (await db.query('SELECT id FROM customers_knex OFFSET 50000 LIMIT 1'))[0].id as string;
    // console.log(deleteId);
    // console.time('Delete');
    // await db.query('DELETE FROM bank_accounts_knex WHERE customer_id = $1', [deleteId]);
    // await db.query('DELETE FROM customers_knex WHERE id = $1', [deleteId]);
    // console.timeEnd('Delete');
    //<----->Delete benchmark<----->
    // const updateId = (await db.query('SELECT id FROM customers_knex OFFSET 50000 LIMIT 1'))[0].id as string;
    // console.log(updateId);
    // console.time('Update');
    // await db.query('UPDATE customers_knex SET "firstName" = $1, "lastName" = $2, "isActive" = $3 WHERE id = $4', ['Roma','Vasich', 'true', updateId]);
    // console.timeEnd('Update');
    //<----->Transaction benchmark<----->
    // console.time('Transaction');
    // await db.tx(async (t) => {
    //     await t.query('UPDATE bank_accounts_knex SET networth = networth * 1.01 WHERE customer_id IN (SELECT customer_id FROM bank_accounts_knex GROUP BY customer_id HAVING sum(networth) > 1000)');
    // });
    // console.timeEnd('Transaction');
    //<----->Query benchmark<----->
    console.time('Query');
    await db.query('SELECT "firstName", "lastName", sum(networth) FROM customers_knex c JOIN bank_accounts_knex b ON c.id = b.customer_id GROUP BY "firstName", "lastName", customer_id ORDER BY sum');
    console.timeEnd('Query');
}

main()




