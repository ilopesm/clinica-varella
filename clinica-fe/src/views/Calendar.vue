<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
//import adaptivePlugin from '@fullcalendar/adaptive';

export default {
  created(){
     var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
      axios.get("http://127.0.0.1:3001/appointments/customer/0",req).then(res=>
        { 
          this.events = res.data;
          this.calendarOptions.events = res.data;

      }).catch(err=>{
        console.log(err);
      });
      axios.get("http://127.0.0.1:3001/categories",req).then(res=>{
        this.categories = res.data;
        this.categories.push({description:'categorias',idcategorie:0})
        console.log(this.categories);
      }).catch(err=>{
        console.log(err);
      })
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  methods:{
    showCategorie(id){
      console.log(this.events);
      var eventos = this.events.filter(event=>(event.categorie==id));
      this.calendarOptions.events = eventos;
    }
  },
 data() {
    
    return {
      cat: 0,
      categories:[],
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
          <div class="field is-grouped">
          <div class="select form-control mt-1 ml-1">
  
            <select v-model="cat" @change="showCategorie(cat)" >
              <option v-for="categorie in categories" :key="categorie.categorie" :value="categorie.idcategorie">{{categorie.description}}</option>
            </select>
          </div>
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