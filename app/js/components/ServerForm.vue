<template>
	<div class="container" v-if="server">
		<div class="columns">
			<div class="column is-four-fifths">
				<div class="field">
					<label class="label">Name</label>
					<div class="control">
						<input class="input" type="text" placeholder="Because aesthetics" v-model="name">
					</div>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label">Dialect</label>
					<div class="select">
						<select v-model="dialect">
							<option value="mysql">MySQL</option>
							<option value="postgres">PostgresSQL</option>
							<option value="mssql">SQL Server (MSSQL)</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class="columns">
			<div class="column is-four-fifths">
				<div class="field">
					<label class="label">Host</label>
					<div class="control">
						<input class="input" type="text" placeholder="localhost" v-model="host">
					</div>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label">Port</label>
					<div class="control">
						<input class="input" type="number" v-model="port">
					</div>
				</div>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<div class="field">
					<label class="label">User</label>
					<div class="control">
						<input class="input" type="text" placeholder="root of course" v-model="user">
					</div>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label">Password</label>
					<div class="control">
						<input class="input" type="password" placeholder="password123" v-model="password">
					</div>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label">Database</label>
					<div class="control">
						<input class="input" type="text" placeholder="database_name" v-model="database">
					</div>
				</div>
			</div>
		</div>

		<button class="button is-primary" @click="connect"
			:class="{'is-loading': server.state === 'connecting'}"
			:disabled="server.state === 'connecting' || !name || !dialect || !host || !port || !user || !password">Connect</button>

		<button class="button is-text" @click="discard">Discard</button>

		<div class="notification is-danger" v-if="error && server.state !== 'connecting'">
			{{ error }}
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import debounce from 'lodash.debounce';

	export default {
		data() {
			return {
				name: '',
				dialect: '',
				host: '',
				port: '',
				user: '',
				password: '',
				database: '',

				error: '',
				
				autosave: debounce(() => {
					this.$store.dispatch('updateServer', {
						id: this.server.id,
						name: this.name,
						dialect: this.dialect,
						host: this.host,
						port: this.port,
						user: this.user,
						password: this.password,
						database: this.database,
					});
				}, 100),
			};
		},

		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),

			form() {
				// https://github.com/vuejs/vue/issues/844#issuecomment-265315349
				return this.name, this.dialect, this.host, this.port, this.user, this.password, this.database, Date.now();
			}
		},

		watch: {
			form() {
				this.autosave();
			},

			server(newServer, oldServer) {
				if ((!oldServer && newServer) || newServer.id === oldServer.id)
					return;
				
				this.name = newServer.name;
				this.dialect = newServer.dialect || 'mysql';
				this.host = newServer.host;
				this.port = newServer.port;
				this.user = newServer.user;
				this.password = newServer.password;
				this.database = newServer.database;
			}
		},

		methods: {
			connect() {
				this.$store.dispatch('updateServer', {
					id: this.server.id,
					name: this.name,
					dialect: this.dialect,
					host: this.host,
					port: this.port,
					user: this.user,
					password: this.password,
					database: this.database,
				});

				console.log(`Connecting to server: ${this.server.id}`);

				this.$store.dispatch('connectServer', this.server.id).catch(error => {
					console.log(`Connecting failed for server: ${this.server.id}`);
					this.error = error.toString();
				});
			},

			discard() {
				this.$store.dispatch('deleteServer', this.server.id);
			}
		},

		mounted() {
			// this.name = 'awoo';
			// this.dialect = 'mysql';
			// this.host = 'localhost';
			// this.port = '3306';
			// this.user = 'root';
			// this.password = 'testpass';
			// this.database = 'test';

			if (!this.server)
				return;

			this.name = this.server.name;
			this.dialect = this.server.dialect || 'mysql';
			this.host = this.server.host;
			this.port = this.server.port;
			this.user = this.server.user;
			this.password = this.server.password;
			this.database = this.server.database;
		}
	};
</script>


<style scoped>
	.select, .select select {
		width: 100%;
	}

	button {
		margin-top: 12px;
	}

	.container {
		max-width: 780px;
		margin-top: 2.5vh;
		padding: 0px 32px 0px 32px;
	}

	.notification {
		margin-top: 48px;
	}
</style>
