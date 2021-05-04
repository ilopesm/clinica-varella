<template>
    <div class="columns is-desktop is-centered mt-5">
     <div class="column is-half mt-5">
    <div class="card mt-5">
        
        <div class="card-contente is-black">

            <div class="conten column is-10 is-offset-1">
               <br>
                <p class="title">Bem-vindo ao sistema da Clinica Varella!</p>
                <br>
                <p class="subtitle" v-if="!isloged ">Por-favor realize o login!</p>
                <br>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    created(){
        if(localStorage.getItem('token')==undefined){
            this.isloged =false;
        }else{
            this.isloged = true;
        }
    },data(){
        return{
            isloged: false,
        }
    }
}
</script>