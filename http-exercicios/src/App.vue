<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input 
					type="text" 
					size="lg"
					v-model="usuario.nome"
					placeholder="Informe o nome">
				</b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input 
					type="email" 
					size="lg"
					v-model="usuario.email"
					placeholder="Informe o email">
				</b-form-input>
			</b-form-group>
		</b-card>
		<hr>
		<b-button 
			variant="primary"
			size="lg"
			@click="salvar">Salvar</b-button>
		<b-button 
			variant="success"
			size="lg"
			class="ml-2"
			@click="obterUsuarios">Obter Uuário</b-button>
		<hr>
		<b-list-group>
			<b-list-group-item 
				v-for="(usuario, i) in usuarios" :key="usuario.i">
				<span>Usuario: {{usuario.nome}}</span><br>
				<span>email: {{usuario.email}}</span><br>
				<span>ID: {{i}}</span><br>
				<b-button variant="warning" size="lg"
					@click="carregar(i)">Carregar</b-button>
				<b-button variant="danger" size="lg"
					@click="excluir(i)" class="ml-2">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
// import axios from 'axios'
export default {
	data() {
		return {
			usuario:{
				nome:'',
				email:''
			},
			id: null,
			usuarios:[]
		}
	},
	methods: {
		limpar(){
			this.usuario.nome=''
			this.usuario.email=''
			this.id= null
		},
		salvar(){
			// //configuração global do axios
			// this.$http.post('usuarios.json', this.usuario).then(() =>{
			// 	this.limpar()			
			// })

			//axios localmente
			// axios.post('https://curso-vue-4e8bd-default-rtdb.firebaseio.com/usuarios.json', this.usuario).then(resp =>{
			// 	this.usuario.nome = ''
			// 	this.usuario.email = ''			
			// })

			//utilizando o mesmo método para salvar um registro novo
			//ou alterar um já existente.
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'

			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
				.then(()=>{this.limpar()})
		},
		obterUsuarios(){
			this.$http.get('usuarios.json').then(resp => {
				this.usuarios = resp.data 
				console.log(this.usuarios)
				
				//configurando de forma local o header 'Autrhorization'
				this.$http.defaults.headers.common['Authorization'] = 'abc123' 
				})

			//AXIOS LOCALMENTE
			// axios.get('https://curso-vue-4e8bd-default-rtdb.firebaseio.com/usuarios.json').then(resp => {
			// 	this.usuarios = resp.data 
			// 	console.log(this.usuarios) })

		},
		carregar(id){
			this.id = id
			this.usuario = { ...this.usuarios[id]}
		},
		excluir(id){
			this.$http.delete(`/usuarios/${id}.json`).then(()=>{
				this.limpar()
			})
		}
	},
	// created(){
	// 	// this.$http.post('usuarios.json',{
	// 	// 	nome: 'Maria',
	// 	// 	email: 'maria_maria@gmail.com'
	// 	// }).then(res=> console.log(res))
	// }
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
