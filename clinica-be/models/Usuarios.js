const conexao = require('../database')
var bcrypt = require("bcrypt");

class Usuarios {
    async findAll(){
       
        try {
            var result = await conexao.select(["iduser","name","birthday","email","access_lvl","address"]).table("users");
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
            var result = await conexao.select(["iduser","name","birthday","email","access_lvl","address"]).where({iduser:id}).table("users");
            return result[0];
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async Create(user){
        try{
            var hash = await bcrypt.hash(user.password,5);
            await conexao.insert({email:user.email,password:hash,name:user.name,access_lvl:user.access_lvl,address: user.address, birthday: user.birthday}).table("users");
            }
            catch(err){
                console.log(err);
            }
    }

    async findEmail(email){
        try{
            var result = await conexao.select("*").from("users").where({email:email});
            
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
    async findByEmail(email){
        try {
            var result = await conexao.select(["iduser","name","birthday","email","access_lvl","address","password"]).where({email:email}).table("users");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async update(id,name,email,birthday,access_lvl,address,password){

        var user = await this.findById(id);

        if(user != undefined){

            var editUser = {};

            if(email != undefined){
                if(email != user[0].email){
                    var result = await this.findEmail(email);
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return {status: false,err:"O email já está cadastrado em outra conta!"}
                    }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(access_lvl != undefined){
                editUser.access_lvl = access_lvl;
            }
            if(birthday != undefined){
                editUser.birthday = birthday;
            }
            if(address != undefined){
                editUser.address = address;
            }
            if(password != undefined){
                var hash = await bcrypt.hash(password,5);
                editUser.password = hash;
            }
            try {
                await conexao.update(editUser).where({iduser:id}).table("users");
                return {status: true};
            } catch (error) {
                console.log(error);
                return {status: false,err: error};
            }
            
        }else{
            return {status: false,err:"O usuario não existe!" }
        }

    }

    async delete(id){
        var user = await this.findById(id);  
        if(user != undefined){
             try {
                 await conexao.delete().where({iduser:id}).table("users");
                 return {status:true};
             } catch (error) {
                 return{status: false,err:error}
             }
        }else{
            return{status: false,err:"O usuário não existe"}
        }
     }
}

module.exports = new Usuarios;