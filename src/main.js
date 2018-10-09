import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/js/bootstrap.bundle';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
