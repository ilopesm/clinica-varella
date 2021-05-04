<template>
    <div>
        <br>
        <div class="columns is-desktop is-centered">
            <div class="column is-half">
                <div class="card">
                    <div class="column is-10 is-offset-1 content">
                        <p class="title">Registro de cliente</p>
                        <div v-if="error != undefined" class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                        <br>
                        <input type="text" placeholder="Nome do cliente" class="input" v-model="name">
                        <br>
                        <input type="email" placeholder="email@email.com" class="input mt-2" v-model="email">
                        <br>
                        <div class="field is-grouped">
                        <TheMask class="input mr-3 mt-2" :mask="['###.###.###-##']" type="text" placeholder="CPF" v-model="cpf" ></TheMask>
                        <input type="date" placeholder="16/02/1998" class="ml-3 mt-2 input" v-model="bithday">
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
import {TheMask} from 'vue-the-mask';
export default {
    data(){
        return{
           name: '',
           email: '',
           cpf: '',
           bithday: '',
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
            axios.post("http://localhost:3001/customers",{
                name: this.name,
                email: this.email,
                cpf: this.cpf,
                birthday: this.bithday
            },req).then(res=>{
                console.log(res);
                this.$router.push({
                    name:'Clientes'
                })
            }).catch(error=>{
                var msgErro = error.response.data.err;
                this.error = msgErro;
            })
        }
    },components:{
        TheMask
    }
}
</script>

<style scoped>

</style>