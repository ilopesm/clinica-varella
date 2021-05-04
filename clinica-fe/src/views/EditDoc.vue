
<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Editar Médico</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                       <div class="field is-grouped">
                        <input type="text" placeholder="Nome do Medico" class="input mt-2 mr-3" v-model="name">
                       
                        <input type="email" placeholder="email@email.com" class="input mt-2 ml-3" v-model="email" disabled>
                       </div>
                        <div class="field is-grouped">
                        <label class="label mt-2 mr-3">Categoria: </label>
                        <select class="input mr-3" v-model="cat" @change="showCategorie(cat)" >
                            <option v-for="categorie in categories" :key="categorie.categorie" :value="categorie.idcategorie">{{categorie.description}}</option>
                        </select>
                        <label class="label mt-2 ml-3">Aniversario: </label>
                        <input type="date" placeholder="16/02/1998" class="ml-1  input" v-model="bithday">
                        </div>
                        <div class="field is-grouped">
                        <TheMask class="input mr-5" :mask="['###.###.###-##']" type="text" placeholder="CPF" v-model="cpf" ></TheMask>
                        <label class="label mt-2 ml-1">Horario: </label>
                        <input type="time" class="ml-2 input" v-model="time">
                        </div>
                        <div class="field is-grouped is-grouped-right">
                        <button class="button is-success mt-2 mb-2" @click="register">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {TheMask} from 'vue-the-mask';
export default {
    created(){
     var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
      axios.get("http://127.0.0.1:3001/categories",req).then(res=>{
        this.categories = res.data;
      }).catch(err=>{
        console.log(err);
      })
      axios.get("http://127.0.0.1:3001/doctors/"+this.$route.params.id,req).then(res=>{
          this.id = res.data.iddoctor;
        this.bithday = res.data.birthday.split('T')[0];
        this.name = res.data.name;
        this.email =res.data.email;
        this.cpf= res.data.cpf;
        this.time = res.data.work_schedule.split("-")[0];
        this.cat = res.data.idcategorie;
        console.log(res.data);
      }).catch(err=>{
        console.log(err.data);
        this.error = err.data.err;
      })
  },
    data(){
        return{
            id: '',
            cat:0,
            categories:[],
           name: '',
           email: '',
           cpf: '',
           bithday: '',
           time:'',
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
            var timeH = parseInt(this.time.split(':')[0]);
            this.time= this.time+"-"+(timeH+8)+":00";
            if(timeH>=8&&timeH<=12){
                axios.put("http://localhost:3001/doctors",{
                    id: this.id,
                    name: this.name,
                    email: this.email,
                    cpf: this.cpf,
                    birthday: this.bithday,
                    work_schedule: this.time,
                    categorie: this.cat,
                    
                },req).then(res=>{
                    console.log(res);
                    this.$router.push({
                        name:'Medicos'
                    })
                }).catch(error=>{
                    var msgErro = error.response.data.err;
                    this.error = msgErro;
                })

            }else{
                this.error= "Horario invalido!"
            }
            
        }
    },components:{
        TheMask
    }
}
</script>

<style scoped>

</style>