<template>
	<div>
		<div class="table-wrapper" v-if="server.lab.results && server.lab.results.length > 0">
			<table class="table is-fullwidth is-striped is-hoverable is-bordered">
				<thead>
					<tr>
						<th v-for="heading in headings" :key="heading">{{ heading }}</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(item, index) in server.lab.results" :key="index">
						<td v-for="(value, property) in item" :key="property">{{ value }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p v-else>
			No results.
		</p>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters({
				server: 'selectedServer',
			}),

			headings() {
				if (!this.server.lab.results || this.server.lab.results < 1)
					return [];
				
				return Object.keys(this.server.lab.results[0]);
			}
		}
	};
</script>

<style>
	.table-wrapper {
		position: relative;
		overflow: scroll;
		height: 55vh;
		width: 100%;
		margin-top: 32px;
		font-size: 14px;
	}
</style>
