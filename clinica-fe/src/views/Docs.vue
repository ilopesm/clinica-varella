<template>
    
    <div class="columns is-desktop is-centered mt-5">
     <div class="column is-two-thirds mt-5">
    <div class="card mt-5">
        <br>
        <p class="title">Medicos</p>
        
        <table class="table column is-offset-1 ">
            <div class="field is-grouped is-grouped-right mr-5">
  
            <a class="button is-success" href="/docs/add">+ Medicos</a>

          </div>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Categoria</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Horario de Trabalho</th>
                    <th>Ações</th>
                </tr>
            </thead>
  
            <tbody>
                
                <tr v-for="doctor in doctors" :key="doctor.iddoctor">
                    <td>{{doctor.iddoctor}}</td>
                    <td>{{doctor.description}}</td>
                    <td>{{doctor.name}}</td>
                    <td>{{doctor.email}}</td>
                    <td>{{doctor.cpf}}</td>
                    <td>{{doctor.work_schedule}}</td>
                    <td><router-link :to="{name:'MedicosEdit',params:{id:doctor.iddoctor}}"><button class="button is-warning" >Editar</button></router-link>   <button class="button is-danger" @click="showModa(doctor.iddoctor)">Deletar</button></td>
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
                        Você quer realmente deletar esse medico?
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Depois de deletado, não tem como recuperar o medico!
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
        axios.get('http://127.0.0.1:3001/doctors',req).then(res=>{
            this.doctors = res.data;
        }).catch(err=>{
            console.log(err);
        });
    },
    data(){
        return{
            doctors:[],
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
            axios.delete('http://127.0.0.1:3001/doctors/'+this.deleteUserId,req).then(res=>{
                console.log(res);
                this.showModal = false;
                this.doctors = this.doctors.filter(u => u.iddoctor != this.deleteUserId);
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