<template>
	<aside class="menu">
		<p class="menu-label">
			{{ server.database }}
		</p>
		<ul class="menu-list">
			<li v-for="table in server.lab.tables" :key="table" @click="selectTable(table)">
				<a>{{ table }}</a>
			</li>
		</ul>
	</aside>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		data() {
			return {
				selectedTableIndex: -1,
			};
		},

		methods: {
			selectTable(table) {
				this.$store.dispatch('setQuery', {
					id: this.server.id,
					query: `SELECT * FROM ${table} LIMIT 20`,
				}).then(() => {
					this.$store.dispatch('executeQuery', {
						id: this.server.id
					});
				});
			}
		},

		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),

			sequelize() {
				return global.sequelizes[this.server.id];
			}
		},

		watch: {
			server(newServer) {
				this.$store.dispatch('fetchTables', newServer.id);
			}
		},

		mounted() {
			this.$store.dispatch('fetchTables', this.server.id);
		}
	};
</script>

<style scoped>
	.menu {
		overflow: auto;
		max-height: calc(100vh - 84px);
	}
</style>
