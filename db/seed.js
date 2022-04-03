// Grabs the client with destructuring from the export in index.js
const { 
    client, 
    createUser,
    updateUser,
    getAllUsers,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser
} = require('./index');


//this function should call a query which drops all tables from out database
async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`
        
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        
        `);

        console.log('Finished dropping the tables!');
    } catch(error) {
        console.error("Error dropping tables!")
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
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL, 
                active BOOLEAN DEFAULT true
            );
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                "authorId" INTEGER REFERENCES users(id), 
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                active BOOLEAN DEFAULT true
            );
        `);
        console.log('Finished building the tables!');
    } catch (error) {
        console.error("Error building tabels!!")
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log('Start to create users....');

        const albert = await createUser({ 
            username: 'albert', 
            password: 'bertie99',
            name: 'Al Bert',
            location: 'Boston, Mass' 
        });
        const sandra = await createUser({ 
            username: 'sandra', 
            password: '2sandy4me', 
            name: 'Sandra',
            location: 'Cali'
        });
        const glamgal = await createUser({ 
            username: 'glamgal', 
            password: 'soglam', 
            name: 'Gale',
            location: 'NYC'
        });

        // console.log(albert);
        // console.log(sandra);
        // console.log(glamgal);

        console.log('Finished creating users!');
    } catch(error) {
        console.error('Error creating users!');
        throw error;
    }
}

async function createInitialPosts() {
    try {
        const [albert, sandra, glamgal] = await getAllUsers();
        console.log('Starting to create posts...')
        await createPost({
            authorId: albert.id,
            title: "First Post",
            content: "I hope I love writing blogs as much as I love writing them."   
        });

        await createPost({
            authorId: sandra.id,
            title: "First Post",
            content: "I am writing a post!"
        });

        await createPost({
            authorId: glamgal.id,
            title: "1 Post",
            content: "Hello World, I will be writing post!"
        });
        console.log('Finished creating post!');
    } catch (error) {
        console.log('Error creating posts!');
        throw error;
    }
}

async function rebuildDB() {
    try{
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPosts();
    } catch (error) {
        console.log('Error during rebuildDB');
        throw error;
    } 
}

async function testDB() {
    try {
        //connect the client to the database, finally
        console.log('Starting to test database tables...'); 

        console.log('Calling getAllUsers')
        const users = await getAllUsers();
        console.log('Result:', users);


        console.log('Calling updateUser on users[0]')
        const updateUserResult = await updateUser(users[0].id, {
            name: "Newname Sogood",
            location: "Lesterville, KY"
        });
        console.log("Result:", updateUserResult);

        console.log("Calling getAllPosts");
        const posts = await getAllPosts();
        console.log("Result:", posts);

        console.log("Calling updatePost on posts[0]");
        const updatePostResult = await updatePost(posts[0].id, {
        title: "New Title",
        content: "Updated Content"
        });
        console.log("Result:", updatePostResult);

        console.log("Calling getUserById with 1");
        const albert = await getUserById(1);
        console.log("Result:", albert);

        //for now, logging is a fine way to see what's up
        console.log('Finished database test!');
    } catch (error) {
        console.error('Error testing datebase!');
        throw error;
    } 
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());