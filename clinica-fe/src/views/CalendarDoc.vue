<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
export default {
  created(){
     var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
      console.log(req);
      axios.get("http://127.0.0.1:3001/calendar/1",req).then(res=>
        {  
          var event = res.data;
          console.log(res.data);
          this.events = event.filter(evento =>(evento.iddoc = localStorage.getItem("iddoctor")))
          this.calendarOptions.events = this.events;

      }).catch(err=>{
        console.log(err);
      });
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  methods:{
    showCategorie(id){
      if(id == 0){
      var eventos = this.events.filter(event=>(event.customer!=null));
      this.calendarOptions.events = eventos;
      }else if(id==null){
        this.calendarOptions.events = this.events.filter(event=>(event.customer==null));
      }else{
        this.calendarOptions.events = this.events;
      }
    }
  },
 data() {
    
    return {
      cat: 9,
      categories:[{categorie:'Filtragem',value:9},{categorie:'com clientes',value:0},{categorie:'sem clientes',value:null}],
      events:[],
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridWeek',
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
<template>
  <div class="columns is-mobile mt-5">
     <div class="column is-10 is-offset-1 mt-5">
    
      <div class="card">
        <div class="card-image">
          
          <div class="field is-grouped is-grouped-right mr-1">
            <div class="select form-control mt-2 mr-2">
            
            <select v-model="cat" @change="showCategorie(cat)" >
              <option v-for="categorie in categories" :key="categorie.id" :value="categorie.value">{{categorie.categorie}}</option>
            </select>
            </div>
            <a class="button is-success mt-2 mr-1" href="/calendar/add">+ Consultas</a>
          
          </div>
        <FullCalendar class="ml-5 mr-5 mb-5" :options="calendarOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .fc-event-title{
      font-size: 1;
    }
</style>