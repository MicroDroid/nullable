<template>
	<div class="tabs">
		<ul>
			<li v-for="server in servers" :key="server.id"
				:class="{'is-active': server.id === selectedServerId}">
				<a @click="() => selectServer(server.id)"
					@contextmenu.prevent="() => deleteServer(server.id)">
					{{ server.name || 'New Server' }}
				</a>
			</li>
			<li>
				<a @click="createServer">+</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		computed: {
			...mapState([
				'servers',
				'selectedServerId',
			]),
		},

		mounted() {
			if (this.servers.length < 1)
				this.createServer();
			
		},

		methods: {
			createServer() {
				return this.$store.dispatch('createServer').then(server => {
					return this.$store.dispatch('selectServer', server.id);
				});
			},

			selectServer(id) {
				return this.$store.dispatch('selectServer', id);
			},

			deleteServer(id) {
				return this.$store.dispatch('deleteServer', id);
			}
		}
	};
</script>

