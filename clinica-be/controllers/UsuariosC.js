const Usuarios = require('../models/Usuarios')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "Q@a$";

class UsuariosC{

    async list(req, res){
        
        var users = await Usuarios.findAll();
        res.json(users);
    }
    async findUser(req,res){
        var id =req.params.id;
        var user = await Usuarios.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(user);
        }
    }
    async new (req,res){
        var user = req.body;
        if(user.email == undefined || user.email == '' || user.email ==' '){
            res.status(400);
            res.json({err:"O e-mail é invalido!"});
            return;
        }
        if(user.name == undefined || user.name  == '' || user.name  ==' '){
            res.status(400);
            res.json({err:"O nome é invalido!"})
            return;
        }
        if(user.password == undefined || user.password  == '' || user.password  ==' '){
            res.status(400);
            res.json({err:"A senha é invalida!"})
            return;
        }
        if(user.birthday == undefined || user.birthday == '' || user.birthday  ==' '){
            res.status(400);
            res.json({err:"Sem data de nascimento"})
            return;
        }if(user.access_lvl == undefined || user.access_lvl == '' || user.access_lvl  ==' '){
            user.access_lvl = 0;
        }
        if(user.address == undefined ){
            user.address = null;
        }
        var emailExists = await Usuarios.findEmail(user.email);
        if(emailExists){
            res.status(406);
            res.json({err:"O email ja existe"})
            return;
        }else{
            Usuarios.Create(user);;
            res.status = 200;
            res.send("Tudo ok")
        }
    }
    async edit(req,res){
        var{id,name,access_lvl,email,address,password,birthday} = req.body;
        var result = await Usuarios.update(id,name,email,birthday,access_lvl,address,password);
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
        var result = await Usuarios.delete(id);

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

        var user = await Usuarios.findByEmail(email);

        if(user[0] != undefined){
            

            var resultado = await bcrypt.compare(password,user[0].password);

            if(resultado){
                console.log(user);
                var token = jwt.sign({ email: user[0].email, role: user[0].access_lvl }, secret);
                res.status(200);
                res.json({token: token});
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

module.exports = new UsuariosC;