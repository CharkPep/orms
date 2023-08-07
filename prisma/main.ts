import { PrismaClient } from '@prisma/client'
import {ForbiddenTransactionModeOverrideError} from "typeorm";
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

function chunkArray(arr : any[]) : any[] {
    const chunkedArrays : any[] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArrays.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArrays;
}

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

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

async function main() {
    //<----->Insertion benchmark<----->
    // await prisma.bank_Account.deleteMany();
    // await prisma.customer.deleteMany();
    // const customers : { data : Customer[] } = { data : []};
    // const bankAccounts :{ data : Bank_Account[] } = { data : []};
    // for (let i = 0; i < NUMBERTOINSERT;i++){
    //     let customer = {
    //         id : uuidv4() as string,
    //         firstName : getRandomElement(firstNames),
    //         lastName : getRandomElement(lastNames),
    //         isActive : Math.random() < 0.5
    //     }
    //     customers.data.push(customer)
    //     for (let i = 0; i < Math.random()*5 + 1; i++){
    //         bankAccounts.data.push({
    //             networth : Math.random()*999999,
    //             customer_id : customer.id,
    //         })    
    //     }
    //    
    // }
    //
    // console.time('Insertion');
    // await prisma.$transaction([
    //     prisma.customer.createMany(customers),
    //     prisma.bank_Account.createMany(bankAccounts)]
    // )
    // console.timeEnd('Insertion')

    //<----->Get all benchmark<----->
    // console.time('Get all');
    // await prisma.$transaction([prisma.customer.findMany()]);
    // console.timeEnd('Get all');

    //<----->Delete benchmark<----->
    // console.time('Delete');
    // await prisma.$transaction([prisma.bank_Account.deleteMany({
    //     where : {
    //         customer_id : '6c397e9e-ad66-4640-b9ce-4001e20490e7'
    //     }
    // }), prisma.customer.delete({
    //     where : {
    //         id : '6c397e9e-ad66-4640-b9ce-4001e20490e7',
    //     }
    // })]);
    // console.timeEnd('Delete');

    //<----->Update benchmark<----->
    // console.time('Update');
    // await prisma.$transaction([prisma.customer.update({
    //     where : {
    //         id : 'c4fa04a0-eef0-4cf6-97ef-a92b3c489a49',
    //     },
    //     data : {
    //         firstName : 'Roma',
    //         lastName : 'Vasich',
    //         isActive : true,
    //     }
    // })]);
    // console.timeEnd('Update');

    //<----->Transaction benchmark<----->
    // console.time('Transaction');
    // await prisma.$transaction(async (t) => {
    //     const subquery = (await prisma.bank_Account.groupBy({
    //         by : ['customer_id'],
    //         having : {
    //             networth : {
    //                 _sum : {
    //                     gte : 1000
    //                 }
    //             }
    //         }
    //     }));
    //    
    //     const chunkedCustomers = chunkArray(subquery);
    //     for (let i = 0;i < chunkedCustomers.length;i++){
    //         await prisma.bank_Account.updateMany({
    //             where : {
    //                 customer_id : {
    //                     in : chunkedCustomers[i].map((element) => element.customer_id)
    //                 }
    //             },
    //             data : {
    //                 networth : {
    //                     multiply : 1.01
    //                 } 
    //             }
    //         })
    //     }
    //    
    // }, { isolationLevel : 'RepeatableRead'});
    // console.timeEnd('Transaction');

    //<----->Query benchmark<----->
    // console.time('Query');
    // let grouped = await prisma.bank_Account.groupBy({
    //     by : ['customer_id'],
    //     _sum : {
    //         networth : true
    //     }
    // })
    // let customers = await prisma.customer.findMany();
    // customers.map((element) => ({
    //     firstName : element.firstName,
    //     lastName : element.lastName,
    //     networth : grouped.find((account) => account.customer_id = element.id)
    // }))
    // console.timeEnd('Query');



}


main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Disconnected')
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })