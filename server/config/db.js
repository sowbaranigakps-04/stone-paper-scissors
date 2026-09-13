import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function testConnection() {
  const client = await pool.connect();
  console.log('PostgreSQL connected');
  client.release();
}