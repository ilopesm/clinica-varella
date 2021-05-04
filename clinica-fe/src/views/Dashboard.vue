<template>
<div class="noprint columns is-desktop is-centered mt-5">
     <div class="column is-8 mt-5">
    <div class="card mt-5">
        
        <div class="card-contente is-black">

            <div class="conten column is-8 is-offset-2">
                <br>
                <p class="title">Dashboard</p>
                <div class="container">
                    <div class="notification is-primary">
                       Temos no total: {{usuarios}} usuarios, {{consultas.length}} consultas, {{medicos}} medicos e {{customers}} clientes registrados no sistema
                    </div>
                </div>
                <br>
            </div>
            <div class="column ml-2 is-grouped field">
            <LineChart class="FullCalendar card ml-5 mb-5" :chartData="consulta" label="Consultas" :options="option" v-if="graph"/>
            <LineChart class="card ml-5 mb-5" :chartData="semclientes" label="Consultas Sem clientes" :options="option" v-if="graph"/>
            </div>
            <br>
            <label class="title"> Todas as consultas</label>
 
            <br>
            <div class="field is-grouped">
                <div class="select form-control mt-1 ml-5">
                    <select v-model="cat" @change="showCategorie(cat)" >
                    <option v-for="categorie in categories" :key="categorie.categorie" :value="categorie.idcategorie">{{categorie.description}}</option>
                    </select>
                </div>
                 <button class="button is-success mt-1 ml-5 mb-2" onclick="window.print()"> Imprimir Calendario</button>
            </div>
            <FullCalendar class="FullCalendar ml-5 mr-5 mb-5" :options="calendarOptions"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import LineChart from '../components/LineChart';
import adaptivePlugin from '@fullcalendar/adaptive'

export default {
     created(){
       var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        axios.get('http://127.0.0.1:3001/user',req).then(res=>{
            this.usuarios = res.data.length;
            axios.get('http://127.0.0.1:3001/calendar/1',req).then(res=>{
                this.consultas = res.data;
                this.calendarOptions.events = this.consultas;
                console.log(this.consultas);
                this.data = res.data;
                var today = new Date();
                var semana = []
                for (let index = 0; index < 7; index++){
                    semana.push(moment((today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+index-2)),"YYYY-MM-DD").format("YYYY-MM-DD") );
                }
                semana.forEach(d=>{
                    var total = this.data.filter(de=>(de.start.split('T')[0] == d)).length
                    this.consulta.push({date:d,total: total});
                })
                axios.get('http://127.0.0.1:3001/appointments/customer/0',req).then(res=>{
                this.data2 = res.data;
                var today = new Date();
                var semana = []
                for (let index = 0; index < 7; index++){
                    semana.push(moment((today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+index-2)),"YYYY-MM-DD").format("YYYY-MM-DD") );
                }
                semana.forEach(d=>{
                    var total = this.data2.filter(de=>(de.costumer == null&& de.start.split('T')[0] == d )).length
                    this.semclientes.push({date:d,total: total});
                })
                
                
                
                this.graph = true;
            }).catch(err=>{
            console.log(err);
        })
            }).catch(err=>{
            console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
        axios.get('http://127.0.0.1:3001/doctors',req).then(res=>{this.medicos=res.data.length}).catch(err=>{console.log(err)});
        axios.get('http://127.0.0.1:3001/customers',req).then(res=>{this.customers=res.data.length}).catch(err=>{console.log(err)});
        axios.get("http://127.0.0.1:3001/categories",req).then(res=>{
        this.categories = res.data;
        this.categories.push({description:'categorias',idcategorie:0})
        console.log(this.categories);
      }).catch(err=>{
        console.log(err);
      })
        
    },components:{
        LineChart,
        FullCalendar
    },methods:{
    showCategorie(id){
      console.log(this.events);
      var eventos = this.consultas.filter(event=>(event.categorie==id));
      this.calendarOptions.events = eventos;
    },
    print(){
    }
  },
    data(){
        return{
            graph: false,
            data: '',
            data2:'',
            finalizados:[],
            semclientes: [],
            consulta: [],
            categorie: [],
            option:{
                responsive: true,
                maintainAspecRatio: false
            },
            usuarios:'',
            consultas:[],
            customers:'',
            medicos:'',
            cat: 0,
            categories:[],
            events:[],
            calendarOptions: {
                plugins: [dayGridPlugin,adaptivePlugin],
                initialView: 'dayGridMonth',
                locale:'pt-br',
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                events: this.events,
                contentHeight: 500,
                eventClick:function(info){
                    window.location.href= "/consulta/" +info.event.id;
                }
                
            }   
        }
    }
}
</script>

<style scoped>
    @media print{
        .noprint{
            visibility: hidden;
        }
        .FullCalendar{
            visibility:visible;
        }
    }
</style>