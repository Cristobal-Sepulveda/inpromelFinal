import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('agrosat-mobile');

export const queryPromise = (sql, args) =>
  new Promise((res, rej) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        args,
        (_, r) => res(r),
        (_, e) => rej(e),
      );
    });
  });
