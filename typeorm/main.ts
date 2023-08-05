import "reflect-metadata";
import {AppDataSource} from "./data-source";
import {IUser, User} from "./UserSchema";


// Define arrays of first names and last names
const firstNames: string[] = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "William",
    "Sophia",
    "David",
    "Olivia",
    // Add more names as needed
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
    let userRepo = AppDataSource.getRepository(User);
    let user = (userRepo.create(userOpts));
    await AppDataSource.manager.save(user);
}
async function getUser(userId : number){
    console.log(AppDataSource.getRepository(User).find());
}

console.time('connection')
AppDataSource.initialize().then(async () => {
    console.log('Connected to db')
    console.timeEnd('connection');
    console.time('100k users insertion');
    for (let i = 0;i < 1000000;i++){
        await createUser({ firstName : getRandomElement(firstNames), lastName : getRandomElement(lastNames), isActive : Math.random() < 0.5 })
    }
    console.timeEnd('100k users insertion')
    
    
}).catch((err) => {
    console.log(err.message)
})





