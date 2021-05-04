const Doctors = require('../models/Doctors')
const Categories = require('../models/Categories')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "Q@a$";

class DoctorsC{

    async list(req, res){
        
        var doctors = await Doctors.findAll();
        res.json(doctors);
    }
    async findDoctor(req,res){
        var id =req.params.id;
        var doctor = await Doctors.findById(id);
        if(doctor == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(doctor);
        }
    }
    async findCategorie(req,res){
        var id =req.params.id;
        var doctor = await Doctors.findByCategorie(id);
        if(doctor == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(doctor);
        }
    }
    async new (req,res){
        var doctor = req.body;
        if(doctor.email == undefined || doctor.email == '' || doctor.email ==' '){
            res.status(400);
            res.json({err:"O e-mail é invalido!"});
            return;
        }
        if(doctor.name == undefined || doctor.name  == '' || doctor.name  ==' '){
            res.status(400);
            res.json({err:"O nome é invalido!"})
            return;
        }
        if(doctor.password == undefined || doctor.password  == '' || doctor.password  ==' '){
            res.status(400);
            res.json({err:"A senha é invalida!"})
            return;
        }
        if(doctor.birthday == undefined || doctor.birthday == '' || doctor.birthday  ==' '){
            res.status(400);
            res.json({err:"Sem data de nascimento"})
            return;
        }if(doctor.work_schedule == undefined || doctor.work_schedule == '' || doctor.work_schedule  ==' '){
            res.status(400);
            res.json({err:"Sem horario de trabalho"})
            return;
        }if(doctor.cpf == undefined || doctor.cpf == '' || doctor.cpf  ==' '){
            res.status(400);
            res.json({err:"Sem cpf"})
            return;
        }if(doctor.categorie == undefined || doctor.categorie == '' || doctor.categorie ==' '){
            res.status(400);
            res.json({err:"Sem categoria!"});
            return;
        }
        var categorie = await Categories.findById(doctor.categorie);
        if(categorie == undefined){
            res.status(406);
            res.json({err:"A categoria não exite"})
            return;
        }
        var emailExists = await Doctors.findEmail(doctor.email);
        if(emailExists){
            res.status(406);
            res.json({err:"O email ja existe"})
            return;
        }else{
            Doctors.Create(doctor);;
            res.status(200);
            res.send("Tudo ok")
        }
    }
    async edit(req,res){
        var{id,name,email,cpf,categorie,password,birthday,work_schedule} = req.body;
        var result = await Doctors.update(id,name,email,birthday,cpf,categorie,work_schedule,password);
        if(result!= undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo ok");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Deu erro"); 
        }
        
    }
    async remove(req,res){
        var id = req.params.id;
        var result = await Doctors.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo ok");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async login(req,res){
        var {email,password} = req.body;

        var doctor = await Doctors.findByEmail(email);
        if(doctor[0] != undefined){
            

            var resultado = await bcrypt.compare(password,doctor[0].password);

            if(resultado){
                console.log(doctor);
                var token = jwt.sign({ email: doctor[0].email, categorie: doctor[0].idcategorie,role: 2 }, secret);
                res.status(200);
                res.json({token: token,id:doctor[0].iddoctor});
            }else{
                res.status(406);
                res.send("Senha incorreta");
            }
        }else{
            res.status(406);
            res.json({err:"Email não registrado",status:false});
        }
    }
    async validate(req,res){
        res.send("okay");
    }
}

module.exports = new DoctorsC;