// Type definitions for @mysql/xdevapi 8.0.20
// Project: https://github.com/mysql/mysql-connector-nodejs
// Definitions by: bin niu <https://github.com/niubinJD>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace mysqlx;

/*~ If this module has methods, declare them as functions like so.
 */
export function getClient(connection: string | URI, options: PoolingOptions): Client;
export function getSession(connection: string | URI): Promise<Session>;
export function getVersion(): string;
export function expr(expr: string, options: any): any;
export const Mode: any;
export const LockContention: any;

/*~ You can declare types that are available via importing the module */
export interface URI {
    host?: string
    port?: number
    user: string
    password: string
    auth: string
    ssl: boolean
    sslOptions: any
    tls: TLSOptions
    connectTimeout: number
    connectionAttributes: any
}

export interface TLSOptions {
    ca?: string
    crl?: string
    versions?: Array<string>
}

export interface PoolingOptions {
    active?: Array<any>;
    enabled?: boolean;
    idle?: Array<any>;
    maxIdleTime?: number;
    maxSize?: number;
    queueTimeout?: number;
}

export class Client {
    state?: PoolingOptions;
    close(): void;
    getSession(): Promise<Session>;
}

export class Session {
    properties: URI;
    constructor(properties?: URI);
    connect(): Promise<Session>;
    getSchema(name: string): Schema;
    getDefaultSchema(): Schema;
    getSchemas(): Array<Schema>;
    createSchema(schema: string): Promise<Schema>;
    dropSchema(name: string): Promise<boolean>;
    startTransaction(): Promise<boolean>;
    commit(): Promise<boolean>;
    rollback(): Promise<boolean>;
    reset(): Promise<any>;
    close(): Promise<any>;
    disconnect(): Promise<any>;
    inspect(depth: any): any;
    executeSql(sql: string, ...args: Array<any>): SqlExecute;
    sql(sql: string): SqlExecute;
    setSavepoint(name: string): Promise<string>;
    releaseSavepoint(name: string): Promise<any>;
    rollbackTo(name: string): Promise<any>;
}

export class Schema {
    createCollection(name: string, options: any): Collection;
    dropCollection(name: string): Promise<boolean>;
    existsInDatabase(): Promise<boolean>;
    getClassName(): string;
    getCollection(name: string): Collection;
    getCollectionAsTable(name: string): Table;
    getCollections(): Array<Collection>;
    getName(): string;
    getTable(name: string): Table;
    getTables(): Array<Table>;
    inspect(): any;
}

export class SqlExecute {}
export class Collection {}
export class Table {}