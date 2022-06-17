import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL= 'https://curso-vue-4e8bd-default-rtdb.firebaseio.com/'


Vue.use({
    install(Vue){
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-4e8bd-default-rtdb.firebaseio.com/'
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            
            //exemplo de alteração de configuração.
            // if(config.method === 'post'){
            //     config.method = 'put'
            // }

            console.log(config.method)

            return config
        })
    }
})