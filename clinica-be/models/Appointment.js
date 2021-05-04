const conexao = require('../database');

class Appointment{
    async findAll(){
       
        try {
            var result = await conexao.select("idappointment","doctors.iddoctor","idcustomer","date","time","categories.idcategorie as idcategorie","categories.description as categorie","appointments.description","finished","notified","doctors.name as doctor_name","doctors.email as doctor_email").table("appointments").innerJoin("doctors","doctors.iddoctor","appointments.iddoctor").innerJoin("categories","categories.idcategorie","appointments.idcategorie");
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
    async findFinished(){
       
        try {
            var result = await conexao.select("idappointment","doctors.iddoctor","idcustomer","date","time","categories.description as categorie","categories.idcategorie as idcategorie","appointments.description","finished","notified","doctors.name as doctor_name","doctors.email as doctor_email").where({finished:0}).table("appointments").innerJoin("doctors","doctors.iddoctor","appointments.iddoctor").innerJoin("categories","categories.idcategorie","appointments.idcategorie");
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
            var result = await conexao.select("idappointment","doctors.iddoctor","idcustomer","date","time","categories.description as categorie","categories.idcategorie as idcategorie","appointments.description","finished","notified","doctors.name as doctor_name","doctors.email as doctor_email").where({idappointment:id}).table("appointments").innerJoin("doctors","doctors.iddoctor","appointments.iddoctor").innerJoin("categories","categories.idcategorie","appointments.idcategorie");
            return result[0];
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async findForEmail(){
        try {
            var result = await conexao.select("notified","idappointment","date","time","description","doctors.email as doctor_email","doctors.name as doctor_name","customers.name as customer_name","customers.email as customer_email","customers.idcustomer").where({finished:0,notified:0}).table("appointments").innerJoin("doctors","doctors.iddoctor","appointments.iddoctor").innerJoin("customers","customers.idcustomer","appointments.idcustomer");
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
    async findByCust(id){
        try {
            var result = await conexao.select("idappointment","doctors.iddoctor","date","time","categories.description as categorie","appointments.description","categories.idcategorie","finished","notified","doctors.name as doctor_name","doctors.email as doctor_email").where({idcustomer:id}).table("appointments").innerJoin("doctors","doctors.iddoctor","appointments.iddoctor").innerJoin("categories","categories.idcategorie","appointments.idcategorie");
            return result;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    
    async Create(appointment){
        try{
            await conexao.insert({iddoctor: appointment.doctor,idcustomer:appointment.customer,idcategorie: appointment.categorie,date: appointment.date, time: appointment.time, description: appointment.description, finished: appointment.finished, notified: appointment.notified}).table("appointments");
            }
            catch(err){
                console.log(err);
            }
    }
    async update(id,idcustomer,finished,notified){

        var appointment = await this.findById(id);

        if(appointment != undefined){

            var editappointment = {};

            if(idcustomer != undefined){
                editappointment.idcustomer = idcustomer; 
            }

            if(finished != undefined){
                editappointment.finished = finished; 
            }

            if(notified != undefined){
                editappointment.notified = notified; 
            }
            try {
                await conexao.update(editappointment).where({idappointment:id}).table("appointments");
                return {status: true};
            } catch (error) {
                console.log(error);
                return {status: false,err: error};
            }
            
        }else{
            return {status: false,err:"A consulta não existe!" }
        }

    }
    async delete(id){
        var user = await this.findById(id);  
        if(user != undefined){
             try {
                 await conexao.delete().where({idappointment:id}).table("appointments");
                 return {status:true};
             } catch (error) {
                 return{status: false,err:error}
             }
        }else{
            return{status: false,err:"A consulta não existe"}
        }
     }

}

module.exports = new Appointment;