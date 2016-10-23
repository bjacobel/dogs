export const SHOW_DEV_TOOLS = !process.env.production;
export const RETHINK_AUTH = {
  host: 'rethinkdb.bjacobel.com',
  user: 'dogs.bjacobel.com',
  port: 28016,                            // port number of the websocket server
  path: '/',                              // HTTP path to websocket route
  secure: false,                           // set true to use secure TLS websockets
  db: 'dogs',                             // default database, passed to rethinkdb.connect
};
