import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginAdm from '../views/LoginAdmin.vue'
import axios from 'axios'

Vue.use(VueRouter)
function SecretAuth(to,from,next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers:{
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    axios.get('http://127.0.0.1:3001/validSec',req).then(res=>{
      console.log(res);
      next();
    }).catch(err=>{
      console.log(err.response);
      next("/");
    });
    
  }else{
    next("/");
  }
}
function DocAuth(to,from,next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers:{
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    axios.get('http://127.0.0.1:3001/validDoc',req).then(res=>{
      console.log(res);
      next();
    }).catch(err=>{
      console.log(err.response);
      next("/");
    });
    
  }else{
    next("/");
  }
}
function AdminAuth(to,from,next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers:{
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    axios.get('http://127.0.0.1:3001/validAdmin',req).then(res=>{
      console.log(res);
      next();
    }).catch(err=>{
      console.log(err.response);
      next("/");
    });
    
  }else{
    next("/");
  }
}
function tokem( to,from,next){
  if(localStorage.getItem('token')!=undefined){
    next();
  }else{
    next("/");
  }
}
function RedirectLogado(to,from,next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers:{
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    if(localStorage.getItem('iddoctor') != undefined){
      axios.get('http://127.0.0.1:3001/validDoc',req).then(res=>{
        console.log(res);
        next('/calendar/doc/');
      }).catch(err=>{
        console.log(err.response);
        next();
      });}
      else{
    axios.get('http://127.0.0.1:3001/validSec',req).then(res=>{
      console.log(res);
      next('/calendar');
    }).catch(err=>{
      console.log(err.response);
    });
    }
    
  }else{
    next();
  }
}

const routes = [
  {
    path: '/adm/login',
    name: 'LoginAdm',
    beforeEnter: RedirectLogado,
    component: LoginAdm
  },
  {
    path: '/doctor/login',
    name: 'LoginDoc',
    beforeEnter: RedirectLogado,
    component:() =>import('../views/LoginDoc.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
    
  },
  {
    path: '/calendar',
    name: 'Calendar',
    beforeEnter: SecretAuth,
    component: () => import( '../views/Calendar.vue')
    
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    beforeEnter: AdminAuth,
    component: () => import('../views/Dashboard.vue')
    
  },{
    path: '/clientes',
    name: 'Clientes',
    beforeEnter: SecretAuth,
    component: () => import('../views/Clientes.vue')
    
  },{
    path: '/clientes/add',
    name: 'RegisterCliente',
    beforeEnter: SecretAuth,
    component: () => import('../views/RegisterCliente.vue')
    
  },{
    path: '/calendar/doc',
    name: 'CalendarDoc',
    beforeEnter: DocAuth,
    component: () => import('../views/CalendarDoc.vue')

  },{
    path: '/calendar/add',
    name: 'CalendarAdd',
    beforeEnter: DocAuth,
    component: () => import('../views/RegisterConsulta.vue')

  },{
    path: '/consulta/:id',
    name: 'Consulta',
    beforeEnter: tokem,
    component: () => import('../views/Consulta.vue')

  },{
    path: '/admin/doctors',
    name: 'Medicos',
    beforeEnter: AdminAuth,
    component: () => import('../views/Docs.vue')

  },{
    path: '/docs/add',
    name: 'MedicosAdd',
    beforeEnter: AdminAuth,
    component: () => import('../views/RegisterDoc.vue')

  },{
    path: '/admin/users',
    name: 'Usuarios',
    beforeEnter: AdminAuth,
    component: () => import('../views/Users.vue')

  },
  {
    path: '/user/add',
    name: 'UsuariosAdd',
    beforeEnter: AdminAuth,
    component: () => import('../views/RegisterUser.vue')

  },{
    path: '/docs/edit/:id',
    name: 'MedicosEdit',
    beforeEnter: AdminAuth,
    component: () => import('../views/EditDoc.vue')

  },{
    path: '/user/edit/:id',
    name: 'UsersEdit',
    beforeEnter: AdminAuth,
    component: () => import('../views/EditUser.vue')

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
