const pool = require('../db/connection');

async function getAllSolicitudes(){
    try {
        const query = 'SELECT * FROM public."Solicitud"';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getSolicitudById(id){
    try {
        const query = 'SELECT * FROM public."Solicitud" WHERE public."Solicitud" = ' + id;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = {
    getAllSolicitudes,
    getSolicitudById,
}