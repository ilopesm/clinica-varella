<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Consulta - {{description}}</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                        
                        <br>
                        <div class="field is-grouped">
                        <label class="label mt-4">Categoria:</label>
                        <input type="text" class="input ml-2 mt-2 mr-5" v-model="categorie" disabled>
                        
                        <label class="label ml-3 mt-4">Medico:</label>
                        <input type="text" class="ml-3 mt-2 input" v-model="doctorname"  disabled>
                        </div>
                        <div class="field is-grouped">
                        <label class="label mt-4">Hora:</label>
                        <input type="time" class="input ml-2 mt-2 mr-3" v-model="time" disabled>
                        
                        <label class="label ml-3 mt-4">Data:</label>
                        <input type="date" class="ml-2 mt-2 input" v-model="date"  disabled>
                        </div>
                        <div class="field is-grouped">
                        <label class="label mr-2 mt-4">Descrição:</label>
                        <input type="text" class="input mt-2" v-model="description" disabled>
                        </div>
                        <div class="field is-grouped" v-if="this.customer_name!=undefined">
                        <label class="label mr-2 mt-4">Paciente:</label>
                        <input type="text" class="input mt-2" v-model="customer_name" disabled>
                        </div>
                        <div class="field is-grouped" v-else-if="this.customer_name==undefined && !isdoc">
                        <label class="label mr-2 mt-4">Paciente:</label>
                        <input type="text" placeholder="Digite o id do paciente" class="input mt-2" v-model="customer">
                        </div>
                        <div class="field is-grouped is-grouped-right" v-if="this.customer_name==undefined &&!isdoc">
                        <button class="button is-success mt-2 mb-2" @click="register">Marcar</button>
                        </div>
                        <div class="field is-grouped is-grouped-right" v-if="this.customer_name!=undefined && isdoc && finished ==0">
                        <button class="button is-success mt-2 mb-2" @click="finish">Finalizar</button>
                        </div>
                        <div class="field is-grouped is-grouped-right" v-if=" isdoc ">
                        <button class="button is-danger mt-2 mb-2" @click="delet">Deletar</button>
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
        var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        if(localStorage.getItem('iddoctor') !=undefined){
            this.isdoc = true;
        }else{
            this.isdoc = false;
        }
        console.log(this.isdoc);
        this.id = this.$route.params.id;
        axios.get("http://127.0.0.1:3001/appointments/"+this.$route.params.id,req).then(res=>{
            this.description = res.data.description;
            this.doctorname = "Dr. " +res.data.doctor_name;
            this.categorie = res.data.categorie;
            this.time = res.data.time;
            this.date = res.data.date.split("T")[0];
            this.customer = res.data.idcustomer;
            this.finished = res.data.finished;
            if(this.customer!=undefined&&this.customer!=null){
                axios.get("http://127.0.0.1:3001/customers/"+this.customer,req).then(res=>{
                    this.customer_name = res.data.name;
                }).catch(err=>{
                    console.log(err);
                });
            }
        }).cath(err=>{
            console.log(err);
        });
        
    },
    data(){
        return{
            id:'',
            finished:"",
           description: '',
           date: '',
           time: '',
           categorie: '',
           doctorname:'',
           customer:'',
           customer_name:undefined,
          work_time_start:'',
          work_time_end:'',
           error: undefined,
           isdoc: false
        }
    },
    methods:{
        register(){
            var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.put("http://127.0.0.1:3001/appointments",{
                id: this.id,
                idcustomer: this.customer
            },req).then(res=>{
                 console.log(res);
                        this.$router.push({
                            name:'Home'
                        })
            }).catch(err=>{
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        },
        finish(){
            var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.get("http://127.0.0.1:3001/finished/"+this.id,req).then(res=>{
                console.log(res);
                window.location.href='/consulta/'+this.id;
            }).catch(err=>{
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        },delet(){
             var req = {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.delete('http://127.0.0.1:3001/appointments/'+this.id,req).then(res=>{
                console.log(res);
                window.location.href= "/calendar/doc"
            }).catch(err=>{
                console.log(err);
              
            });
        }

    }
}
</script>

<style scoped>

</style>