// Grabs the client with destructuring from the export in index.js
const { 
    client, 
    getAllUsers,
    createUser
} = require('./index');


//this function should call a query which drops all tables from out database
async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`DROP TABLE IF EXISTS users;`);

        console.log('Finished dropping the tables!');
    } catch(error) {
        throw error; // pass the error up to the function that calls the dropTables
    }
}

async function createTables() {
    try {
        console.log('Starting to build tables...');        
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log('Finished building the tables!');
    } catch (error) {
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log('Start to create users....');

        const albert = await createUser({ username: 'albert', password: 'bertie99' });
        const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });

        console.log(albert);

        console.log('Finished creating users!');
    } catch(error) {
        console.error('Error creating users!');
        throw error;
    }
}

async function rebuildDB() {
    try{
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        throw error;
    } 
}

async function testDB() {
    try {
        //connect the client to the database, finally
        console.log('Starting to test database tables...'); 
        //queries are promises, so we can await them
        //const { rows } = await client.query(`SELECT * FROM users;`);
        const users = await getAllUsers();
        console.log('getAllUsers:', users);
        //for now, logging is a fine way to see what's up
        console.log('Finished database test!');
    } catch (error) {
        console.error(error);
    } 
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());