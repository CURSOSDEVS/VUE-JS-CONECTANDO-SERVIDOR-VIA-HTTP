import Vue from 'vue'
import axios from 'axios'

//configurações de forma global
// axios.defaults.baseURL= 'https://curso-vue-4e8bd-default-rtdb.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'abc123'
// axios.defaults.headers.get['Accepts'] =  'applicationjson'

Vue.use({
    install(Vue){
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-4e8bd-default-rtdb.firebaseio.com/'
            //, headers: {
            //     'Authorization': 'abc123'
            // }
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
            // const array = []
            // for(let chave in res.data){
                
            //     // ... é chamado operador spredin poderia ser 
            //     //substituido por nome: res.data[chave].nome
            //     // e email: res.data[chave].email
            //     array.push({ id: chave, ...res.data[chave]})
            // }

            // res.data = array
            return res

        },error => Promise.reject(error))
    }
})