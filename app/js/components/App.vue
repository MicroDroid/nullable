<template>
	<div>
		<servers />
		<lab v-if="server && server.state === 'connected'" />
		<server-form v-else />
	</div>
</template>

<script>
	import Servers from './Servers';
	import ServerForm from './ServerForm';
	import Lab from './Lab';

	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),
		},

		components: {
			'server-form': ServerForm,
			'servers': Servers,
			'lab': Lab,
		}	
	};
</script>
