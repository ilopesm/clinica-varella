<template>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
        <h1>Clinica Varella</h1>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" >
    <div class="navbar-start" v-if="this.token!= undefined">
      <a class="navbar-item" href="/calendar/doc" v-if="this.isdoc">
        Agenda
      </a>
      <a class="navbar-item" href="/calendar" v-else>
        Agenda
      </a>
     <a class="navbar-item" href="/clientes" v-if="this.issec">
        Clientes
      </a>
      <a class="navbar-item" href="/admin/users" v-if="this.isadmin">
        Usuarios
      </a>
      <a class="navbar-item" href="/admin/doctors" v-if="this.isadmin">
        Medicos
      </a>
      <a class="navbar-item" href="/admin/dashboard" v-if="this.isadmin">
        Dashboard
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item"  v-if="this.token== undefined">
        <div class="buttons">
          <a class="button is-primary" href="/doctor/login">
            <strong>Login Medico</strong>
          </a>
          <a class="button is-light" href="/adm/login">
            Login Adm
          </a>
        </div>
      </div>
      <div class="navbar-item"  v-else>
        <div class="buttons">
          <a class="button is-primary" @click="logout()">
            <strong>Logout</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        this.token = localStorage.getItem('token');
        if(this.token != undefined && this.token != ''){
            
             var req= {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.get("http://127.0.0.1:3001/validAdmin",req).then(res=>{
                console.log(res);
                this.isadmin = true;  
            }).catch(err=>{
                console.log(err);
                this.isadmin =false;
            });
            axios.get("http://127.0.0.1:3001/validSec",req).then(res=>{
                console.log(res);
                this.issec = true;  
            }).catch(err=>{
                console.log(err);
                this.issec =false;
            });
            axios.get("http://127.0.0.1:3001/validDoc",req).then(res=>{
                console.log(res);
                this.isdoc = true;  
            }).catch(err=>{
                console.log(err);
                this.isdoc =false;
            });
        }
    },
    methods:{
        logout(){
            localStorage.removeItem('token');
            this.token = undefined;
            if(localStorage.getItem("iddoctor")!=undefined){
              localStorage.removeItem("iddoctor");
            }
            window.location.href='/';
        }
    },
    data(){
        return{
            token:'',
            isadmin: false,
            isdoc:false,
            issec:false
        }
    }
}
</script>

<style scoped>
    .nav{
        background-color: black;
    }
</style>