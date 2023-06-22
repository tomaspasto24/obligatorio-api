const pool = require('../db/connection');

async function getAllUsers() {
    try {
        const query = 'SELECT * FROM public."Usuario"';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getUserById(Id) {
    try {
        const query = 'SELECT * FROM public."Usuario" WHERE public."Usuario".id = ' + Id;
        const result = await pool.query(query); 
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function asd(){
    const users = await getUserById(78);
    console.log(users); 
}

asd();

module.exports = {
    getAllUsers,
    getUserById,
};