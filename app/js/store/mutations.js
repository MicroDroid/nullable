import * as types from './mutation-types';

export default {
	[types.STORE_SERVER](state, server) {
		state.servers = [
			...state.servers,
			server
		];
	},

	[types.SELECT_SERVER](state, id) {
		state.selectedServerId = id;
	},

	[types.UPDATE_SERVER](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.name = payload.name;
		server.dialect = payload.dialect;
		server.host = payload.host;
		server.port = payload.port;
		server.user = payload.user;
		server.password = payload.password;
		server.database = payload.database;
	},

	[types.SET_SERVER_STATE](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.state = payload.state;
	},

	[types.DELETE_SERVER](state, id) {
		state.servers = state.servers.filter(server => server.id !== id);
	},

	[types.SET_SERVER_QUERY_EXECUTING](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.lab.executing = payload.executing;
	},

	[types.SET_SERVER_QUERY](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.lab.query = payload.query;
	},

	[types.STORE_SERVER_QUERY_RESULTS](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.lab.results = payload.results;
	},

	[types.SET_SERVER_TABLES](state, payload) {
		const server = state.servers.find(server => server.id === payload.id);
		server.lab.tables = payload.tables;
	}
};
