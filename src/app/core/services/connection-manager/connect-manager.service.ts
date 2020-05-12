import { Injectable } from '@angular/core';
import { Connection, ConnectionConfig } from 'mysql';
import { DataBase } from '../../../entity/database';

import * as db from 'mysql';
// import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectManagerService {
  manager: Map<string, Connection> = new Map();
  constructor() {}

  // getConnection(database: DataBase): Connection {
  //   if (this.manager.has(database.connectionName)) {
  //     return this.manager.get(database.connectionName);
  //   }
  //   const connection = db.createConnection({host: database.host, port: 3306, user: database.username, password: database.password, connectTimeout: 5000} as ConnectionConfig);
  //   // connection.connect();
  //   this.manager.set(database.connectionName, connection);
  //   return connection;
  // }

  getConnection(database: DataBase): Promise<any> {
    const config = {
      host: database.host,
      port: database.port,
      user: database.username,
      password: database.password,
      // connectTimeout: 10000
    } as ConnectionConfig;
    console.log("链接参数:", config);
    return new Promise((reslove,reject) => {
      const conn = db.createConnection(config);
      conn.connect((error) => {
        if(error) {
          reject(error);
        } else {
          reslove(conn);
        }
      });
    });
  }

  close(database: DataBase): void {
    const conn = this.manager.get(database.connectionName);
    if (conn) {
      this.manager.delete(database.connectionName);
      conn.destroy();
    }
  }
}
