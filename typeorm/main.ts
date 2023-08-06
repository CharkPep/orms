import "reflect-metadata";
import {AppDataSource} from "./data-source";
import {IUser, Customers_typeorm} from "./CustomerSchema";
import {BankAccount} from "./BankAccountSchema";

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

async function createUser(userOpts : IUser){
    let userRepo = AppDataSource.getRepository(Customers_typeorm);
    let user = (userRepo.create(userOpts));
    await AppDataSource.manager.save(user);
}
function getUser(userId : string){
    let userRepo = AppDataSource.getRepository(Customers_typeorm); 
    let user = userRepo.createQueryBuilder().where('id = :id', { id : userId }).getOne();
    return user;
}

function getAllUsers(){
    let userRepo = AppDataSource.getRepository(Customers_typeorm);
    let user = userRepo.createQueryBuilder().getMany();
    return user;
}

function deleteUser(id : string) {
    let userRepo = AppDataSource.getRepository(Customers_typeorm);
    AppDataSource.getRepository(BankAccount).createQueryBuilder().delete().where('customersTypeormId = :id', { id : id }).execute();
    userRepo.createQueryBuilder().delete().where('id = :id', { id : id }).execute();
}

function updateUser(updatedUser : IUser, userId : string){
    let userRepo = AppDataSource.getRepository(Customers_typeorm);
    userRepo.createQueryBuilder().update().set(updatedUser).where('id = :id', { id : userId }).execute();
    
}

function generateCustomer() : Customers_typeorm {
    let customer = new Customers_typeorm();
    customer.firstName = getRandomElement(firstNames);
    customer.lastName = getRandomElement(lastNames);
    customer.isActive = Math.random() < 0.5;
    customer.bankAccounts = []
    for (let i = 0;i < Math.random()*5 + 1;i++){
        let bankAccount = new BankAccount();
        bankAccount.customers_typeorm = customer;
        bankAccount.networth = parseFloat((Math.random()*999999).toFixed(2));
        customer.bankAccounts.push(bankAccount);
    }
    
    return customer;
    
}


console.time('connection')
AppDataSource.initialize().then(async () => {
    console.log('Connected to db');
    console.timeEnd('connection');

    //<----->Insertion benchmark<----->
    
    // await AppDataSource.getRepository(BankAccount).createQueryBuilder().delete().execute();
    // await AppDataSource.getRepository(Customers_typeorm).createQueryBuilder().delete().execute();
    //
    // let userRepo = AppDataSource.getRepository(Customers_typeorm);
    // let customersArray : Customers_typeorm[] = [];
    //
    // for (let i = 0;i < NUMBERTOINSERT;i++){
    //     let customer = generateCustomer();
    //     customersArray.push(customer);
    // }
    //
    // let bankAccounts : BankAccount[] = customersArray.reduce(
    //     (accumulator: BankAccount[], currentCustomer: Customers_typeorm) => {
    //         return accumulator.concat(currentCustomer.bankAccounts);
    //     },
    //     []
    // );
    // console.log('Start insertion...');
    // console.time('Insertion');
    // await userRepo.save(customersArray, { chunk : 10000 });
    // await AppDataSource.getRepository(BankAccount).save(bankAccounts, { chunk : 10000 });
    // console.timeEnd('Insertion')

    
    //<----->Get all benchmark<----->
    
    // console.time('Get all');
    // await getAllUsers();
    // console.timeEnd('Get all');

    //<----->Delete benchmark----->
    
    // console.time('Delete');
    // await deleteUser('b2ac9b0e-0bd6-408e-bbf4-89b499c95be2');
    // console.timeEnd('Delete');

    //<----->Update benchmark----->

    // console.time('Update');
    // await updateUser({ firstName : 'Liza', lastName : 'Brown', isActive : true }, '601762ff-4ea7-4820-a0b8-ce35ca3c954d');
    // console.timeEnd('Update');

    //<----->Transaction benchmark----->
    
    // console.time('Transaction')
    // await AppDataSource.transaction("REPEATABLE READ", async (transactionalEntityManager) => {
    //     const subquery = transactionalEntityManager
    //         .createQueryBuilder()
    //         .select("customersTypeormId")
    //         .from(BankAccount, "account")
    //         .groupBy("customersTypeormId")
    //         .having("SUM(networth) >= :sum", { sum: 1000 });
    //
    //     await transactionalEntityManager
    //         .createQueryBuilder()
    //         .update(BankAccount)
    //         .set({ networth: () => "networth * 1.01" })
    //         .where("customersTypeormId IN (" + subquery.getQuery() + ")")
    //         .setParameter("sum", 1000)
    //         .execute();
    // });
    //
    // console.timeEnd('Transaction');

    //<----->Query benchmark----->
    console.time('Query');
    await AppDataSource.getRepository(Customers_typeorm)
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.bankAccounts', 'b')
        .select('c.firstName', 'firstName')
        .addSelect('c.lastName', 'lastName')
        .addSelect('SUM(b.networth)')
        .groupBy('c.id, c.firstName, c.lastName')
        .orderBy('sum', 'DESC')
        .getMany();
    console.timeEnd('Query');
    
    
}).catch((err) => {
    console.log(err.message)
})





