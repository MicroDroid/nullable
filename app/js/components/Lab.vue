<template>
	<div class="container is-fluid">
		<div class="columns">
			<div class="column is-one-fifth">
				<structure-tree />
			</div>
			<div class="column is-four-fifths slight-padding">
				<query-box />
				<results />
			</div>
		</div>
	</div>
</template>

<script>	
	import {mapGetters} from 'vuex';
	import StructureTree from './StructureTree';
	import QueryBox from './QueryBox';
	import Results from './Results';

	export default {
		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),
		},

		components: {
			'structure-tree': StructureTree,
			'query-box': QueryBox,
			'results': Results,
		}
	};
</script>

<style scoped>
	.slight-padding {
		padding: 0px 24px;
	}
</style>
