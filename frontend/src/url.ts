// TODO helper for unifing urls among differen environments and help docker-container management
let backendPath = process.env.REACT_APP_BACKENDHOST;
let port = process.env.REACT_APP_PORT ? `:${process.env.REACT_APP_PORT}` : ``
export const url = `${backendPath}${port}`;
