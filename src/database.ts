import mariadb from "mariadb";

let port = 3306;

// Have to handle DB_PORT here to prevent type error
if (process.env.DB_PORT) {
  port = parseInt(process.env.DB_PORT.toString(), 10);
}

// Get all database connect parameters
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Create connexion with database and create query combining request and params
// to avoid SQL-injection.
export const dbRequestExecuter = async (
  query: string,
  params: unknown[] = [],
) => {
  let db = null;
  try {
    db = await pool.getConnection();
    const result = await db.query(query, params);
    return result;
  } finally {
    if (db) db.release();
  }
};

module.exports = { dbRequestExecuter };
