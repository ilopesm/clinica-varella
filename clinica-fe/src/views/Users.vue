<template>
    
    <div class="columns is-desktop is-centered mt-5">
     <div class="column is-half mt-5">
    <div class="card mt-5">
        <br>
        <p class="title">Usuarios</p>
        
        <table class="table column is-offset-1 ">
            <div class="field is-grouped is-grouped-right mr-5">
  
            <a class="button is-success" href="/user/add">+ Usuario</a>

          </div>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Nivel de Acesso</th>
                    <th>Ações</th>
                </tr>
            </thead>
  
            <tbody>
                
                <tr v-for="user in users" :key="user.iduser">
                    <td>{{user.iduser}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.access_lvl | processRole}}</td>
                    <td><router-link :to="{name:'UsersEdit',params:{id:user.iduser}}"><button class="button is-warning" >Editar</button></router-link>   <button class="button is-danger" @click="showModa(user.iduser)">Deletar</button></td>
                </tr>
                
            </tbody>
        </table>
        <br>
        <div  :class="{modal: true, 'is-active':showModal}">
            <div class="modal-background">

            </div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        Você quer realmente deletar esse usuario?
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Depois de deletado, não tem como recuperar o usuario!
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item"  @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser()">Deletar</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        var req = {
            headers:{
            authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get('http://127.0.0.1:3001/user',req).then(res=>{
            this.users = res.data;
        }).catch(err=>{
            console.log(err);
        });
    },
    data(){
        return{
            users:[],
            showModal: false,
            deleteUserId: -1
        }
    },filters:{
        processRole:function(value){
            if(value == 0){
                return "Secretaria";
            }else if(value == 1){
                return "Administrador";
            }
        }
    }
    ,methods:{
        hideModal(){
            this.showModal = false;
        },showModa(id){
            this.deleteUserId = id;
            this.showModal = true;
        },deleteUser(){
            var req = {
                headers:{
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.delete('http://127.0.0.1:3001/user/'+this.deleteUserId,req).then(res=>{
                console.log(res);
                this.showModal = false;
                localStorage.removeItem('token');
                window.location.href='/';
            }).catch(err=>{
                console.log(err);
                this.showModal = false;
            });
        }
    }
}
</script>

<style scoped>

</style>