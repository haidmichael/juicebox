//Imports the PG module
const { Client } = require('pg');
//Supply the DB name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');

module.exports = {
    client,
}

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username FROM users;`
    );

    return rows;
}

async function createUser({ username, password }) {
    try {
        const result = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password]);

        return result; 
    } catch (error) {
        throw error;
    }
}

//and export them
module.exports =  {
    client,
    getAllUsers,
    createUser,
}
