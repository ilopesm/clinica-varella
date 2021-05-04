require('dotenv/config');
const express = require('express')
const conexao = require('./database')
const app = express()
const router = require('./routes/routes')
var cors = require("cors");


app.use(express.urlencoded({extended:false}));
app.use(express.json());
//permitindo acesso a api pelo front
app.use(cors());


app.use("/",router);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});
