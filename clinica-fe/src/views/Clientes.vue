<template>
    
    <div class="columns is-desktop is-centered mt-5">
     <div class="column is-half mt-5">
    <div class="card mt-5">
        <br>
        <p class="title">Clientes</p>
        
        <table class="table column is-11 is-offset-1">
            <div class="field is-grouped is-grouped-right mr-5">
  
            <a class="button is-success" href="/clientes/add">+ Clientes</a>

          </div>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Ações</th>
                </tr>
            </thead>
  
            <tbody>
                
                <tr v-for="cliente in clientes" :key="cliente.idcustomer">
                    <td>{{cliente.idcustomer}}</td>
                    <td>{{cliente.name}}</td>
                    <td>{{cliente.email}}</td>
                    <td>{{cliente.cpf}}</td>
                    <td>   <button class="button is-danger" @click="showModa(cliente.idcustomer)">Deletar</button></td>
                </tr>
                
            </tbody>
        </table>

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
        axios.get('http://127.0.0.1:3001/customers',req).then(res=>{
            this.clientes = res.data;
        }).catch(err=>{
            console.log(err);
        });
    },
    data(){
        return{
            clientes:[],
            showModal: false,
            deleteUserId: -1
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
            console.log(this.deleteUserId);
            axios.delete('http://127.0.0.1:3001/customers/'+this.deleteUserId,req).then(res=>{
                console.log(res);
                this.showModal = false;
                this.clientes = this.clientes.filter(u => u.idcustomer != this.deleteUserId);
            }).catch(err=>{
                console.log(err.data);
                this.showModal = false;
            });
        }
    }
}
</script>

<style scoped>

</style>