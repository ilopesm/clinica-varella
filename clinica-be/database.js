require('dotenv/config');


const conexao = require('knex')({
    client:'mysql2',
    connection:{
    host:process.env.CONN_HOST,
    port:process.env.CONN_PORT,
    user:process.env.CONN_USER,
    password:process.env.CONN_PW,
    database:process.env.CONN_DB
    }
})

module.exports = conexao;