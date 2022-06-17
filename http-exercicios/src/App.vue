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
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			usuario:{
				nome:'',
				email:''
			},
			usuarios:[]
		}
	},
	methods: {
		salvar(){
			//configuração global do axios
			// this.$http.post('usuarios.json', this.usuario).then(resp =>{
			// 	this.usuario.nome = ''
			// 	this.usuario.email = ''			
			// })

			//axios localmente
			axios.post('https://curso-vue-4e8bd-default-rtdb.firebaseio.com/usuarios.json', this.usuario).then(resp =>{
				this.usuario.nome = ''
				this.usuario.email = ''			
			})
		},
		obterUsuarios(){
			// this.$http.get('usuarios.json').then(resp => {
			// 	this.usuarios = resp.data 
			// 	console.log(this.usuarios) })

			//AXIOS LOCALMENTE
			axios.get('https://curso-vue-4e8bd-default-rtdb.firebaseio.com/usuarios.json').then(resp => {
				this.usuarios = resp.data 
				console.log(this.usuarios) })
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
