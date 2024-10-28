import sql, { ConnectionPool } from 'mssql';
require('dotenv').config();

const poolPromise: Promise<ConnectionPool> = new sql.ConnectionPool(process.env.DB_CONNECTION_STRING as string)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        throw err;
    });

export { sql, poolPromise };
