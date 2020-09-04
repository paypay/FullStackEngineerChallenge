let backendPath = process.env.REACT_APP_BACKENDHOST;
let port = process.env.REACT_APP_PORT ? `:${process.env.REACT_APP_PORT}` : ``
module.exports.url = `${backendPath}${port}`;
