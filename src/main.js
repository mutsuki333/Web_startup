import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'



axios.defaults.baseURL = 'http://0.0.0.0:8000/mock/api';
axios.defaults.withCredentials = true;
axios.defaults.debug = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

// if defined vuex action 'restore' to restore login data and returning a promise
// then add the router guard for meta check
// the vuex action 'restore' is used for initial mount
// the beforeEach will be triggered every route change

// store.dispatch('restore').then(()=>{
//   router.beforeEach((to, from, next) => {
//     // Login require
//     if (to.matched.some(m => m.meta.LoginRequired)){
//       if (!store.state.isAuthenticated){
//         // not logged in
//       }
//       else next()
//     }
//     // need specific role
//     else if (to.matched.some(m => m.meta.Role)){
//       // if(false)
//       //   // do something
//       // else 
//         next()
//     }
//     else next()
    
//   })
  
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')

})


