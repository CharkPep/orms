import {DataTypes, Model, Transaction} from "sequelize";
import ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS;

const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');

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

function generateCustomer() : { id : string, firstName : string, lastName : string, isActive : boolean, bankAccounts : { networth : number }[] } {
    let customer = <{ id : string, firstName : string, lastName : string, isActive : boolean, bankAccounts : { networth : number }[] }> {};
    customer.id = uuidv4() as string;
    customer.firstName = getRandomElement(firstNames);
    customer.lastName = getRandomElement(lastNames);
    customer.isActive = Math.random() < 0.5;
    customer.bankAccounts = []
    for (let i = 0;i < Math.random()*5 + 1;i++){
        let bankAccount = <{networth : number}>{};
        bankAccount.networth = parseFloat((Math.random()*999999).toFixed(2));
        customer.bankAccounts.push(bankAccount);
    }

    return customer;

}


const sequelize = new Sequelize('mydb', 'pep', '0001', {
    logging : false,
    host: '127.0.0.1',
    dialect: 'postgres',
});

class Customer  extends Model {
    declare id: string; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
    declare firstName : string;
    declare lastName : string;
    declare isActive : boolean;
    declare bankAccounts : BankAccounts[];
}

Customer.init( {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{ sequelize, tableName : 'customers_sequelize', indexes : [{ fields : ['firstName', 'lastName'], using : "BTREE"}]});

class BankAccounts extends Model{
    declare id : string;
    declare networth : number;
    declare customer : Customer
    declare customer_id : string;
}

BankAccounts.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    networth: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
}, { sequelize, tableName : 'bank_accounts_sequelize'});

Customer.hasMany(BankAccounts, { foreignKey : 'customer_id'});
BankAccounts.belongsTo(Customer, { foreignKey : 'customer_id'});
try {
    sequelize.authenticate().then( async () => {
        console.log('Connection has been established successfully.');
        //<----->Insertion benchmark<----->
        // await sequelize.drop();
        // await sequelize.sync();
        //
        // const customersData = Array.from({length : NUMBERTOINSERT}, () => (generateCustomer()))
        // console.log('Started insertion')
        // const bankAccountsData = customersData.map((account) => {
        //    return account.bankAccounts.map((elemenet) => ({ networth : elemenet.networth, customer_id : account.id }))
        // });
        // let flatBankAccountsData = bankAccountsData.flat(2);
        // console.time('Insert')
        // await Customer.bulkCreate(customersData);
        // await BankAccounts.bulkCreate(flatBankAccountsData);
        // console.timeEnd('Insert')

        //<----->Get all benchmark<----->
        // console.time('Get all');
        // const customers = await Customer.findAll();
        // console.timeEnd('Get all');
        // console.log(customers.length);
        //<----->Delete benchmark<----->
        // console.time('Delete');
        // await Customer.destroy({
        //     where : {
        //         id : 'd3e9dd87-197e-46b0-835d-a531d0bb7174',
        //     }
        // })
        // console.timeEnd('Delete')
        //<----->Update benchmark<----->
        // console.time('Update');
        // await Customer.update({ firstName : 'Liza', lastName : 'Brown', isActive : true }, {
        //     where : {
        //         id : '848f5d87-febc-4d1e-bd73-25d4920bf6d2'
        //     }
        // });
        // console.timeEnd('Update');
        
        //<----->Transaction benchmark<----->
        // console.time('Transaction');
        // await sequelize.transaction({
        //     isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        // }, async (t) => {
        //     const customerIdsToUpdate = await BankAccounts.findAll({
        //         attributes: ['customer_id'],
        //         group: ['customer_id'],
        //         having: sequelize.literal('SUM(networth) >= 1000'),
        //     });
        //    
        //     const customerIds = customerIdsToUpdate.map((row) => row.customer_id);
        //     // console.log(customerIds);
        //     await BankAccounts.increment('networth', 
        //         {
        //             by : 1.01,
        //             where: {
        //                 customer_id: customerIds,
        //             },
        //         }
        //     );
        // });
        // console.timeEnd('Transaction')
        //<----->Query benchmark<----->
        console.time('Query')
        await Customer.findAll({
            attributes: [
                'firstName',
                'lastName',
                [sequelize.fn('SUM', sequelize.col('BankAccounts.networth')), 'sum'],
            ],
            include: [{
                model : BankAccounts
            }],
            group: ['Customer.id', 'BankAccounts.id', 'firstName', 'lastName'],
            order: [['sum', 'DESC']],
        });
        console.timeEnd('Query')
        
        
    
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}







