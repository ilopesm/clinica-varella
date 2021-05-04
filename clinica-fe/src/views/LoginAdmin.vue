<template>
<div class="columns is-desktop is-centered mt-5">
     <div class="column is-half mt-5">
    <div class="card mt-5">
        
        <div class="card-contente is-black">

            <div class="conten column is-8 is-offset-2">
                <br>
                <p class="title">Login Adm</p>
                <div v-if="error != undefined" class="notification is-danger">
                    <p>{{error}}</p>
                </div>
                <div class="field mb-5">
                    <label class="label"></label>
                    <div class="control ">
                        <input class="input" type="email" placeholder="Email" v-model="email">
                    </div>
                </div>
                <div class="field mb-5">
                    <label class="label"></label>
                    <div class="control ">
                        <input class="input" type="password" placeholder="********" v-model="password">
                    </div>
                </div>

                <div class="control mt-5">
                <button class=" button is-success is-fullwidth " @click="login" >Entrar</button>
                </div>
                <br>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
           password: '',
           email: '',
           error: undefined
        }
    },
    methods:{
        login(){
            axios.post("http://localhost:3001/login",{
                password: this.password,
                email: this.email
            }).then(res=>{
                console.log(res);
                localStorage.setItem('token',res.data.token);
                window.location.href='/calendar';
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