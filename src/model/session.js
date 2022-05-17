import { queryPromise } from './query';

// SESSION FROM SERVICE
const create_qry = `CREATE TABLE IF NOT EXISTS 
                      session(
                        id_session REAL PRIMARY KEY NOT NULL, 
                        name TEXT
                      );
                    `;
export const create_session_table = () => queryPromise(create_qry, []);

const drop_qry = 'DELETE FROM session;';
export const drop_session = () => queryPromise(drop_qry, []);

const insert_qry = 'INSERT INTO session  ( id_session, name ) VALUES (?, ?);';
export const insert_session = session => queryPromise(insert_qry, [session.id_session, session.nombre]);

const select_qry = 'SELECT * FROM session;';
export const select_session = () => queryPromise(select_qry, []);

const edit_qry = 'UPDATE session SET id_session = ? WHERE id_session = ? ;';
export const editar_session = session => queryPromise(edit_qry, [session.id_session]);
