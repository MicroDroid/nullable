import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

const persistedVuex = new VuexPersist({
	storage: localStorage,
	reducer: state => {
		return {
			...state,
			servers: state.servers.map(server => ({
				...server,
				state: server.state === 'connected' ? 'connecting' : 'disconnected',
				// lab: {query: '', executing: false, results: []},
			}))
		};
	},
});

// NODE_ENV is injected via Webpack
// eslint-disable-next-line no-undef
const debugging = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	mutations,
	getters,

	state: {
		servers: [],
		selectedServerId: '',
	},

	strict: debugging,

	plugins: [persistedVuex.plugin],
});
