import { RETHINK_AUTH } from '../constants';
import RethinkdbWebsocketClient from 'rethinkdb-websocket-client';

const rethinkdb = RethinkdbWebsocketClient.rethinkdb;

export const initConn = (existingConn) => {
  if (existingConn) {
    return Promise.resolve(existingConn);
  } else {
    return RethinkdbWebsocketClient
      .connect(RETHINK_AUTH)
      .catch(err => console.error('Error connecting to rethinkdb.', err.name, err.message));
  }
};

export const getAllDogs = (existingConn) => {
  initConn(existingConn)
    .then((conn) => {
      // fuck. rethinkdb is awesome
      rethinkdb
        .table('dogs')
        .run(conn)
        .then(cursor => cursor.getArray())
        .catch(err => console.error('Error getting data from dogs table.', err.name, err.message));
    });
};
