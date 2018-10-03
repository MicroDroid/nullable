import * as types from './mutation-types';
import uniqid from 'uniqid';
import Sequelize from 'sequelize';

export default {
	createServer({commit}) {
		const server = {
			id: uniqid(),
			name: '',
			state: 'disconnected',
			
			dialect: '',
			host: '',
			port: 0,
			user: '',
			password: '',
			database: '',

			lab: {
				query: '',
				executing: [],
				results: [],
				tables: [],
			},
		};

		commit(types.STORE_SERVER, server);

		return server;
	},

	selectServer({commit}, id) {
		commit(types.SELECT_SERVER, id);
	},

	updateServer({commit}, payload) {
		commit(types.UPDATE_SERVER, payload);
	},

	connectServer({state, commit}, id) {
		const server = state.servers.find(server => server.id === id);
		
		if (server.state === 'connected')
			console.warn('Connecting to a server with a \'connected\' state!');

		commit(types.SET_SERVER_STATE, {id: server.id, state: 'connecting'});

		const sequelize = new Sequelize(server.database, server.user, server.password, {
			host: server.host,
			port: server.port,
			dialect: server.dialect,

			operatorsAliases: false,
		});

		return sequelize.authenticate().then(() => {
			commit(types.SET_SERVER_STATE, {id: server.id, state: 'connected'});
			global.sequelizes[id] = sequelize;
		}).catch(error => {
			commit(types.SET_SERVER_STATE, {id: server.id, state: 'disconnected'});
			delete global.sequelizes[id];

			throw error;
		});
	},

	disconnectServer({commit}, id) {
		commit(types.SET_SERVER_STATE, {id, state: 'disconnected'});
		delete global.sequelizes[id];
	},

	async deleteServer({state, commit, dispatch}, id) {
		const oldIndex = state.servers.findIndex(server => server.id === id);

		commit(types.DELETE_SERVER, id);
		delete global.sequelizes[id];

		let server = state.servers[oldIndex - 1] || state.servers[0];

		if (!server)
			server = await dispatch('createServer');

		dispatch('selectServer', server.id);
	},

	setQuery({commit}, {id, query}) {
		commit(types.SET_SERVER_QUERY, {id, query});
	},

	fetchTables({commit}, id) {
		global.sequelizes[id].query('SHOW TABLES', {type: 'SHOWTABLES'}).then(tables => {
			commit(types.SET_SERVER_TABLES, {id, tables});
		});
	},

	executeQuery({state, commit}, {id, options}) {
		commit(types.SET_SERVER_QUERY_EXECUTING, {id, executing: true});

		const server = state.servers.find(server => server.id === id);

		global.sequelizes[id].query(server.lab.query, options).spread(results => {
			commit(types.STORE_SERVER_QUERY_RESULTS, {id, results});
			commit(types.SET_SERVER_QUERY_EXECUTING, {id, executing: false});
		});
	},
};
