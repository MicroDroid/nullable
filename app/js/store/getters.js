export const selectedServer = state => state.servers.find(server => server.id === state.selectedServerId);