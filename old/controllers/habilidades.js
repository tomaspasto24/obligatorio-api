const pool = require('../db/connection');

async function getHabilidadByCodigo(codigo){
    try {
        const query = 'SELECT * FROM public."Usuario" WHERE public."Habilidad".codigo = ' + codigo;
        const result = await pool.query(query); 
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getAllHabilidades(){
    try{
        const query = 'SELECT * FROM public."Habilidad"';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = {
    getAllHabilidades,
    getHabilidadByCodigo,
};
