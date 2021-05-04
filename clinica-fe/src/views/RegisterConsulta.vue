<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Registro de Consulta</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                        
                        <input type="text" placeholder="Digite o titulo da consulta" class="input" v-model="description">
                        <br>
                        <div class="field is-grouped">
                        <input type="time" class="input mt-2 mr-3" v-model="time">
                        <input type="date" placeholder="00/00/0000" class="ml-3 mt-2 input" v-model="date">
                        </div>
                        <div class="field is-grouped is-grouped-right">
                        <button class="button is-success mt-2 mb-2" @click="register">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        var req = {
            headers:{
            authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://127.0.0.1:3001/doctors/"+localStorage.getItem('iddoctor'),req).then(res=>{
            console.log(res.data);
            this.doctor =res.data.iddoctor;
            this.categorie = res.data.idcategorie;
            var time = res.data.work_schedule.split("-");
            this.work_time_start = time[0];
            this.work_time_end = time[1];
            console.log(this.work_time_end);
        }).catch(err=>{
            console.log(err);
        })
    },
    data(){
        return{
           description: '',
           date: '',
           time: '',
           categorie: '',
           doctor:'',
          work_time_start:'',
          work_time_end:'',
           error: undefined
        }
    },
    methods:{
        register(){
            var req = {
            headers:{
            authorization: "Bearer " + localStorage.getItem('token')
            }
        }   
            var endH = parseInt(this.work_time_end.split(':')[0]);
            var StartH = parseInt(this.work_time_start.split(':')[0]);
            var StartM=parseInt(this.work_time_start.split(':')[1]);
            var nowH = parseInt(this.time.split(':')[0]);
            var nowM = parseInt(this.time.split(':')[1]);
            if(StartH<=nowH&&nowH<=endH-1){
                if(StartM<=nowM&&nowM<=30){
                    axios.post("http://localhost:3001/appointments",{
                    date:this.date,
                    time:this.time,
                    categorie:this.categorie,
                    doctor:this.doctor,
                    description:this.description
                    },req).then(res=>{
                        console.log(res);
                        this.$router.push({
                            name:'CalendarDoc'
                        })
                    }).catch(error=>{
                        var msgErro = error.response.data.err;
                        this.error = msgErro;
                    })
                }else{
                    this.error="Essa consulta não pode ser registrada pois esta fora do seu horario de trabalho"
                }
            }else{
                this.error="Essa consulta não pode ser registrada pois esta fora do seu horario de trabalho"
            }
        }
    }
}
</script>

<style scoped>

</style>