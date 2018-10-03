import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App';
import store from './store';
import 'mysql2';

global.sequelizes = {};

Vue.use(Vuex);

const app = new Vue({
	template: '<App/>',
	components: {App},
	store,
});

if (store.state.servers && store.state.servers.length > 0)
	store.state.servers.forEach(server => {
		if (server.state === 'connecting') {
			console.log(`Reconnecting to server: ${server.id}`);
			store.dispatch('connectServer', server.id);
		}
	});

app.$mount('#app');