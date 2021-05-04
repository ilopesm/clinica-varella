<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Editar Usuario</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                       <div class="field is-grouped">
                        <input type="text" placeholder="Nome do usuario" class="input mt-2 mr-3" v-model="name">
                       
                        <input type="email" placeholder="email@email.com" class="input mt-2 ml-3" v-model="email" disabled>
                       </div>
                        <div class="field is-grouped">
                        <label class="label mt-2">Endereço: </label>
                        <input type="text" placeholder="Endereço" class="ml-1 mr-3  input" v-model="address">
                        <label class="label mt-2 ml-3">Aniversario: </label>
                        <input type="date" placeholder="16/02/1998" class="ml-1  input" v-model="birthday">
                        </div>
                        <div class="field is-grouped">
                        <label class="label mb-3">Nivel de Acesso: </label>
                        <select class="input" v-model="access_lvl" @change="showCategorie(cat)" >
                            <option v-for="acc in accs" :key="acc.id" :value="acc.id">{{acc.description}}</option>
                        </select>
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
export default {
    created(){
     var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.get("http://127.0.0.1:3001/user/"+this.$route.params.id,req).then(res=>{
                this.id = res.data.iduser;
                this.address = res.data.address;
                this.email= res.data.email;
                this.access_lvl = res.data.access_lvl;
                this.birthday = res.data.birthday.split('T')[0];
                this.name = res.data.name;
                console.log(res.data);
            }).catch(err=>{
                console.log(err.data);
                this.error = err.data.err;
            })
  },
    data(){
        return{
            id:'',
            accs:[{id:0,description:"Secretaria"},{id:1,description:"Administrador"}],
            access_lvl:0,
            address: '',
           name: '',
           email: '',
           birthday: '',
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
                axios.put("http://localhost:3001/user",{
                    id:this.id,
                    name:this.name,
                    access_lvl: parseInt(this.access_lvl),
                    birthday : this.birthday,
                    address:this.address

                },req).then(res=>{
                    console.log(res);
                    this.$router.push({
                        name:'Usuarios'
                    })
                }).catch(error=>{
                    var msgErro = error.response.data.err;
                    this.error = msgErro;
                })

            
        }
    }
}
</script>

<style scoped>

</style>