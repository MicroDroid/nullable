<template>
	<div>
		<textarea class="textarea no-resize" placeholder="DELETE FROM users;" rows="10" v-model="query"/>
		<br>
		<div class="has-text-right">
			<button class="button is-primary" @click="execute">Execute</button>
			<button class="button is-text" @click="discard">Discard</button>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import debounce from 'lodash.debounce';

	export default {
		data() {
			return {
				query: '',

				autosave: debounce(() => {
					this.$store.dispatch('setQuery', {
						id: this.server.id,
						query: this.query,
					});
				}, 100)
			};
		},

		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),
		},

		watch:{
			'server.lab.query'() {
				this.query = this.server.lab.query;
			},

			query() {
				this.autosave();
			}
		},

		mounted() {
			this.query = this.server.lab.query;
		},

		methods: {
			discard() {
				this.query = '';
			},
			
			execute() {
				this.$store.dispatch('executeQuery', {
					id: this.server.id,
				});
			}
		}
	};
</script>


<style scoped>
	.no-resize {
		resize: none;
	}

	textarea {
		font-family: 'Source Code Pro', monospace;
	}
</style>
