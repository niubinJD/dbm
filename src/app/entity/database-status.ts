import { DataBase } from './database';
/**
 * 带状态的databse信息, 不入库
 */
export interface DataBaseStatus extends DataBase {
    status: boolean;
}