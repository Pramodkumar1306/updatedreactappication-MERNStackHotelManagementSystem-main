import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: "azureadminsql",
  host: "pramodkumar-postgres.postgres.database.azure.com",
  database: "admin",
  password: "Pramod12345",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;