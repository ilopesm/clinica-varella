const conexao = require('../database');

class Customers{
    async findAll(){
       
        try {
            var result = await conexao.select(["idcustomer","name","email","cpf","birthday"]).table("customers");
            if (result.length > 0){
                return result;
            }else{
                return undefined;
            }
            
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async findById(id){
        try {
            var result = await conexao.select(["idcustomer","name","email","cpf","birthday"]).where({idcustomer:id}).table("customers");
            return result[0];
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async Create(customer){
        try{
            await conexao.insert({email: customer.email, name: customer.name,cpf: customer.cpf,birthday: customer.birthday}).table("customers");
            }
            catch(err){
                console.log(err);
            }
    }
    async findEmail(email){
        try{
            var result = await conexao.select("*").from("customers").where({email:email});
            
            if(result.length>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async update(id,name,email,birthday,cpf){

        var customer = await this.findById(id);

        if(customer != undefined){

            var editcustomer = {};

            if(email != undefined){
                if(email != customer.email){
                    var result = await this.findEmail(email);
                    if(result == false){
                        editcustomer.email = email;
                    }else{
                        return {status: false,err:"O email já está cadastrado em outro cliente!"}
                    }
                }
            }

            if(name != undefined){
                editcustomer.name = name;
            }
            if(birthday != undefined){
                editcustomer.birthday = birthday;
            }
            if(cpf != undefined){
                editcustomer.cpf = cpf;
            }
            try {
                await conexao.update(editcustomer).where({idcustomer:id}).table("customers");
                return {status: true};
            } catch (error) {
                console.log(error);
                return {status: false,err: error};
            }
            
        }else{
            return {status: false,err:"O cliente não existe!" }
        }

    }
    async delete(id){
        var customer = await this.findById(id);  
        if(customer != undefined){
             try {
                 await conexao.delete().where({idcustomer:id}).table("customers");
                 return {status:true};
             } catch (error) {
                 return{status: false,err:error}
             }
        }else{
            return{status: false,err:"O cliente não existe"}
        }
     }

}

module.exports = new Customers;