const conexao = require('../database')
var bcrypt = require("bcrypt");

class Doctors {
    async findAll(){
       
        try {
            var result = await conexao.select(["iddoctor","name","email","cpf","birthday","work_schedule","categories.description","categories.idcategorie"]).table("doctors").innerJoin("categories","categories.idcategorie","doctors.idcategorie");
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
            var result = await conexao.select(["iddoctor","name","email","cpf","birthday","work_schedule","categories.description","categories.idcategorie"]).where({iddoctor:id}).table("doctors").innerJoin("categories","categories.idcategorie","doctors.idcategorie");
            return result[0];
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async findByCategorie(id){
        try {
            var result = await conexao.select(["iddoctor","name","email","cpf","birthday","work_schedule"]).where({idcategorie:id}).table("doctors");
            return result;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async Create(doctor){
        try{
            var hash = await bcrypt.hash(doctor.password,5);
            await conexao.insert({email:doctor.email,password:hash,name:doctor.name, birthday: doctor.birthday,idcategorie: doctor.categorie,work_schedule:doctor.work_schedule,cpf: doctor.cpf}).table("doctors");
            }
            catch(err){
                console.log(err);
            }
    }

    async findEmail(email){
        try{
            var result = await conexao.select("*").from("doctors").where({email:email});
            
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
            var result = await conexao.select(["iddoctor","idcategorie","name","email","cpf","birthday","work_schedule","password"]).where({email:email}).table("doctors");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async update(id,name,email,birthday,cpf,categorie,work_schedule,password){

        var doctor = await this.findById(id);

        if(doctor != undefined){

            var editdoctor = {};

            if(email != undefined){
                if(email != doctor.email){
                    var result = await this.findEmail(email);
                    if(result == false){
                        editdoctor.email = email;
                    }else{
                        return {status: false,err:"O email já está cadastrado em outro medico!"}
                    }
                }
            }

            if(name != undefined){
                editdoctor.name = name;
            }

            if(cpf != undefined){
                editdoctor.cpf = cpf;
            }

            if(birthday != undefined){
                editdoctor.birthday = birthday;
            }
            if(categorie != undefined){
                editdoctor.idcategorie = categorie;
            }
            if(work_schedule != undefined){
                editdoctor.work_schedule = work_schedule;
            }
            if(password != undefined){
                var hash = await bcrypt.hash(password,5);
                editdoctor.password = hash;
            }
            try {
                await conexao.update(editdoctor).where({iddoctor:id}).table("doctors");
                return {status: true};
            } catch (error) {
                console.log(error);
                return {status: false,err: error};
            }
            
        }else{
            return {status: false,err:"O doutor não existe!" }
        }

    }

    async delete(id){
        var user = await this.findById(id);  
        if(user != undefined){
             try {
                 await conexao.delete().where({iddoctor:id}).table("doctors");
                 return {status:true};
             } catch (error) {
                 return{status: false,err:error}
             }
        }else{
            return{status: false,err:"O doutor não existe"}
        }
     }
}

module.exports = new Doctors;