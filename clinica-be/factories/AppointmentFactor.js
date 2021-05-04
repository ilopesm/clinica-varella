class AppointmentFactory{

    Build (consultasimples){

        var day = consultasimples.date.getDate();
        var month = consultasimples.date.getMonth();
        var year = consultasimples.date.getFullYear();
        var hour = Number.parseInt(consultasimples.time.split(":")[0]);
        var minutes = Number.parseInt(consultasimples.time.split(":")[1]);

        var startDate = new Date(year,month,day,hour,minutes,0,0);
        var endDate = new Date(year,month,day,hour,minutes,0,0);
        endDate.setHours(endDate.getHours()+1);
        var appo = {
            id: consultasimples.idappointment,
            title: "Dr. "+consultasimples.doctor_name + " - " + consultasimples.description,
            categorie: consultasimples.idcategorie,
            start: startDate,
            end: endDate,
            finished: consultasimples.finished,
            customer: consultasimples.idcustomer,
            iddoc: consultasimples.iddoctor
        }
        return appo;
    }
}

module.exports = new AppointmentFactory();