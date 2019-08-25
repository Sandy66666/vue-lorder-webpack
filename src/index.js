import Vue from 'vue'
import App from './app.vue'
import Axios from "axios";

import './assets/styles/global.styl'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.get['Content-type'] = 'application/json'
// Axios.defaults.headers.post['Content-type'] = 'application/json'
// Vue.config.productionTip = false

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
    render: h=>h(App)
}).$mount(root);
