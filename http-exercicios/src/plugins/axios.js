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
        }, error=> Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res =>{
            const array = []
            for(let chave in res.data){
                
                // ... é chamado operador spredin poderia ser 
                //substituido por nome: res.data[chave].nome
                // e email: res.data[chave].email
                array.push({ id: chave, ...res.data[chave]})
            }

            res.data = array
            return res

        },error => Promise.reject(error))
    }
})