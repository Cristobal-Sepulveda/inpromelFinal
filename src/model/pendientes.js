import { queryPromise } from "./query";

const create_qry = `CREATE TABLE IF NOT EXISTS 
                        pendientes(
                            id_pendiente INTEGER PRIMARY KEY AUTOINCREMENT,
                            titulo TEXT,
                            fecha TEXT,
                            topico TEXT,
                            tarea TEXT
                        );
                    `;

export const create_pendientes_table = () => queryPromise(create_qry, []);

const drop_qry = "DELETE FROM pendientes;";
export const drop_pendientes = () => queryPromise(drop_qry, []);

const delete_qry = "DELETE FROM pendientes WHERE id_pendiente = ?;";
export const delete_pendiente = () => queryPromise(delete_qry, []);

const insert_qry =
  "INSERT INTO pendientes  (titulo, fecha, topico, tarea) VALUES (?, ?, ?, ?);";
export const insert_pendiente = (pendientes) =>
  queryPromise(insert_qry, [
    pendientes.titulo,
    pendientes.fecha,
    pendientes.topico,
    pendientes.tarea,
  ]);

const select_qry = "SELECT * FROM pendientes;";
export const select_pendientes = () => queryPromise(select_qry, []);

const select_qry2 = "SELECT * FROM pendientes WHERE topico = ?;";
export const select_pendientes_categoria = (topico) =>
  queryPromise(select_qry2, [topico]);

const edit_qry =
  "UPDATE pendientes SET id_pendiente = ?, titulo= ?, fecha = ?, topico = ?, tarea = ? WHERE id_pendiente = ? ;";
export const editar_pendiente = (pendientes) =>
  queryPromise(edit_qry, [pendientes.id_pendiente]);
