const pool = require('../db/connection');

async function getUsers() {
    try {
        const query = 'SELECT * FROM Usuario';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function asd(){
    const users = await getUsers();
    console.log(users); 
}

asd();

module.exports = {
    getUsers,
};