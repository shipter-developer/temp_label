import { Pool, createPool } from "mysql2/promise";
import config from './config';
const pool: Pool = createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    connectTimeout: 5000,
    connectionLimit: 30 //default 10
});



export default pool