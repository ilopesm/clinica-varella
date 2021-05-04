const Appointments = require("../models/Appointment");
const Doctors = require("../models/Doctors");
const Customers = require("../models/Customers");
const AppointmentFactory = require("../factories/AppointmentFactor");
const mailer= require("nodemailer");

class AppointmentC{

    async listCalendar(req, res){
        var finished = req.params.finished;
        if(finished ==1){
            var appointments = await Appointments.findAll();
            var appos =[];
            appointments.forEach(appo => {
                if (appo.date != undefined){
                    appos.push(AppointmentFactory.Build(appo));
                }
            });
            res.json(appos);
        }else{
            var appointments = await Appointments.findFinished();
            var appos =[];
            appointments.forEach(appo => {
                if (appo.date != undefined){
                    appos.push(AppointmentFactory.Build(appo));
                }
            });
            res.json(appos);
        }
    }
    async findCustomer(req,res){
        var id = req.params.id;
        var querry = "";
        if (id ==0){
            querry = null;
        }else{
            querry = id;
        }
        var appointments = await Appointments.findByCust(querry);
        console.log(appointments);
        if(appointments == undefined){
            res.status(404);
            res.json({});
        }else{
            var appos =[];
            appointments.forEach(appo => {
                if (appo.date != undefined){
                    appos.push(AppointmentFactory.Build(appo));
                }
            });
            res.json(appos);
        }
    }
    async findById(req,res){
        var id =req.params.id;
        var appointment = await Appointments.findById(id);
        if(appointment == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(appointment);
        }
    }
    async Create(req,res){
        var appointment = req.body;
        appointment.customer = null;
        appointment.finished = 0;
        appointment.notified = 0;

        var doctor = await Doctors.findById(appointment.doctor);
        console.log(doctor);
        if(doctor == undefined){
            res.status(406);
            res.json({err:"O medico não existe"})
            return;
        }
        if(appointment.categorie == undefined){
            res.status(400);
            res.json({err:"A categoria não foi definida"})
            return;
        }
        if(appointment.categorie != doctor.idcategorie){
            res.status(406);
            res.json({err:"O medico não atua nessa area"})
            return;
        }
        if(appointment.date == undefined || appointment.date == '' || appointment.date ==' '){
            res.status(400);
            res.json({err:"A data é invalida!"});
            return;
        }
        if(appointment.time == undefined || appointment.time == '' || appointment.time ==' '){
            res.status(400);
            res.json({err:"O horario é invalido!"});
            return;
        }if(appointment.description == undefined || appointment.description == '' || appointment.description ==' '){
            res.status(400);
            res.json({err:"A descrição é invalida!"});
            return;
        }
        else{
            await Appointments.Create(appointment);;
            res.status = 200;
            res.send("Tudo ok")
        }
    }
    async AddCustomer(req,res){
        var {idcustomer,id} = req.body;
        var appointment = await Appointments.findById(id);
        if(appointment == undefined){
            res.status(406);
            res.json({err:"A consulta não existe"})
            return;
        }
        if(appointment.idcustomer != null){
            res.status(406);
            res.json({err:"A consulta já tem um cliente"})
            return;
        }
        var customer = await Customers.findById(idcustomer);
        if(customer == undefined){
            res.status(406);
            res.json({err:"O cliente não existe"})
            return;
        }
        else{
            await Appointments.update(id,idcustomer);;
            res.status = 200;
            res.send("Tudo ok")
        }

    }
    async finished(req,res){
        var id = req.params.id;
        var appointment = await Appointments.findById(id);
        if(appointment != undefined){
            await Appointments.update(appointment.idappointment,appointment.idcustomer,1,1);
            res.status = 200;
            res.send("Tudo ok")
        }else{
            res.status(406);
            res.json({err:"A consulta não existe"})
            return;
        }
    }
    async notify(){
        var appos = await Appointments.findForEmail();
        var transport = mailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d02654867be7c7",
                pass: "5b7d0a7fc28ff1"
        }});
        if(appos != undefined){
        appos.forEach(async app=>{
            var appo = await AppointmentFactory.Build(app);
            var date = appo.start.getTime();
            var hour = 1000 * 60 * 60;
            var gap = date-Date.now();
            if(gap <= hour){
                console.log(app);
               if(app.notified==0){
                
                await Appointments.update(app.idappointment,app.idcustomer,0,1);

                transport.sendMail({
                    from: "Clinica Varella<varella@clinica.com.br>",
                    to: app.doctor_email,
                    subject: "A consulta com o paciente "+app.customer_name+" acontecera em breve!",
                    text: "A consulta com o paciente "+app.customer_name+" sobre "+ app.description+" acontecera daqui a pouco as:" + app.time +"!"
                }).then(()=>{

                }).catch(err=>{
                    console.log(err);
                })
                transport.sendMail({
                    from: "Clinica Varella<varella@clinica.com.br>",
                    to: app.customer_email,
                    subject: "A consulta com o Dr "+app.doctor_name+" acontecera em breve!",
                    text: "A consulta com o paciente "+app.customer_name+" sobre "+ app.description+" acontecera daqui a pouco as:" + app.time +"!"
                }).then(()=>{

                }).catch(err=>{
                    console.log(err);
                })
               } 
            }
        });
        }
    }
    async remove(req,res){
        var id = req.params.id;
        var result = await Appointments.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo ok");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new AppointmentC;
