<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Registro de Usuario</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                       <div class="field is-grouped">
                        <input type="text" placeholder="Nome do usuario" class="input mt-2 mr-3" v-model="name">
                       
                        <input type="email" placeholder="email@email.com" class="input mt-2 ml-3" v-model="email">
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
                        <div class="field is-grouped">
                        <input type="password" placeholder="Senha" class=" input" v-model="password">
                        <input type="password" placeholder="Confimar Senha" class="ml-2 input" v-model="cpassword">
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
  },
    data(){
        return{
            accs:[{id:0,description:"Secretaria"},{id:1,description:"Administrador"}],
            access_lvl:0,
            address: '',
           name: '',
           email: '',
           birthday: '',
           password:'',
           cpassword:'',
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
            if(this.password==this.cpassword){
                axios.post("http://localhost:3001/user",{
                    name:this.name,
                    email: this.email,
                    password: this.password,
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

            
            }else{
                this.error = "Tenha certeza que as senhas são iguas"
            }
        }
    }
}
</script>

<style scoped>

</style>