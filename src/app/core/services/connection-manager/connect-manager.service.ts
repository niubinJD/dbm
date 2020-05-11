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

  getConnection(database: DataBase): Connection {
    if (this.manager.has(database.connectionName)) {
      return this.manager.get(database.connectionName);
    }
    const connection = db.createConnection({host: database.host, port: 3306, user: database.username, password: database.password} as ConnectionConfig);
    // connection.connect();
    this.manager.set(database.connectionName, connection);
    return connection;
  }

  close(database: DataBase): void {
    const conn = this.manager.get(database.connectionName);
    if (conn) {
      this.manager.delete(database.connectionName);
      conn.destroy();
    }
  }
}
