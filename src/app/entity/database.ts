/**
 * 数据库连接信息的数据结构，目前仅支持普通链接
 */
export interface DataBase {
    // 唯一标识
    _id: string;
    connectionName: string;
    host: string;
    port: string;
    username: string;
    password: string;
    remember: boolean;
}