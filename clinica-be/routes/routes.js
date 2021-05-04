const express = require("express");
const app = express();
const router = express.Router();

var Usuarios = require("../controllers/UsuariosC");
var Categories = require("../controllers/CategoriesC");
var Doctors = require("../controllers/DoctorsC");
var Customers = require("../controllers/CustomerC");
var Appointments = require("../controllers/AppointmentC");

var SecretariaAuth = require("../middleware/SecretariaAuth");
var GestAuth = require("../middleware/GestAuth");
var DocAuth = require("../middleware/DocAuth");

//Roots de login e usuario em geral
router.get("/user",GestAuth, Usuarios.list); // rota de buscar todos os usuarios
router.get("/user/:id", Usuarios.findUser);// rota buscar usuario unico
router.post('/user',GestAuth, Usuarios.new);// rota para criar novo usuario
router.put('/user',GestAuth, Usuarios.edit);// rota para editar usuario
router.delete('/user/:id',GestAuth,Usuarios.remove);//rota para deletar usuario
router.post('/login',Usuarios.login);//rota de login

//roots de categorias
router.get('/categories',SecretariaAuth,Categories.list);
router.get('/categories/:id',Categories.findUCategorie);
router.post('/categories',GestAuth,Categories.new);
router.put('/categories',GestAuth,Categories.edit);
router.delete('/categories/:id',GestAuth,Categories.remove);

//roots de medicos
router.get("/doctors",SecretariaAuth,Doctors.list);
router.post("/doctors",GestAuth,Doctors.new);
router.get("/doctors/:id",Doctors.findDoctor);
router.put('/doctors',GestAuth,Doctors.edit);
router.delete('/doctors/:id',GestAuth,Doctors.remove);
router.get("/doctorsC/:id",SecretariaAuth,Doctors.findCategorie);
router.post("/doctors/login",Doctors.login);

//roots de clientes

router.get("/customers",SecretariaAuth,Customers.list);
router.get("/customers/:id",Customers.findCustomer);
router.post("/customers",SecretariaAuth,Customers.new);
router.put("/customers",SecretariaAuth,Customers.edit);
router.delete("/customers/:id",SecretariaAuth,Customers.remove);

//roots de consulta

router.get("/calendar/:finished",Appointments.listCalendar);
router.get("/appointments/customer/:id",SecretariaAuth,Appointments.findCustomer);
router.get("/appointments/:id",Appointments.findById);
router.delete("/appointments/:id",DocAuth,Appointments.remove);
router.post("/appointments",DocAuth,Appointments.Create);
router.put("/appointments",Appointments.AddCustomer);
router.get("/finished/:id",DocAuth,Appointments.finished);

//roots validate
router.get("/validDoc",DocAuth,Usuarios.validate);
router.get("/validSec",SecretariaAuth,Usuarios.validate);
router.get("/validAdmin",GestAuth,Usuarios.validate);
//enviar email
var pollTime =5000

setInterval(async ()=>{

    await Appointments.notify();

},pollTime);

module.exports = router;