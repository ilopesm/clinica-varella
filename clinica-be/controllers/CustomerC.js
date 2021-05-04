const Customers = require('../models/Customers');

class CustomersC{
    async list(req, res){
        
        var customers = await Customers.findAll();
        res.json(customers);
    }
    async findCustomer(req,res){
        var id =req.params.id;
        var customer = await Customers.findById(id);
        if(customer  == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(customer);
        }
    }
    async new (req,res){
        var customer = req.body;
        if(customer.email == undefined || customer.email == '' || customer.email ==' '){
            res.status(400);
            res.json({err:"O e-mail é invalido!"});
            return;
        }
        if(customer.name == undefined || customer.name  == '' || customer.name  ==' '){
            res.status(400);
            res.json({err:"O nome é invalido!"})
            return;
        }
        if(customer.birthday == undefined || customer.birthday == '' || customer.birthday  ==' '){
            res.status(400);
            res.json({err:"Sem data de nascimento"})
            return;
        }
        if(customer.cpf == undefined || customer.cpf == '' || customer.cpf  ==' '){
            res.status(400);
            res.json({err:"Sem cpf"})
            return;
        }
        var emailExists = await Customers.findEmail(customer.email);
        if(emailExists){
            res.status(406);
            res.json({err:"O email ja existe"})
            return;
        }else{
            Customers.Create(customer);;
            res.status = 200;
            res.send("Tudo ok")
        }
    }
    async edit(req,res){
        var{id,name,email,birthday,cpf} = req.body;
        var result = await Customers.update(id,name,email,birthday,cpf);
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
        
        var result = await Customers.delete(id);
        if(result.status){
            res.status(200);
            res.send("Tudo ok");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new CustomersC;