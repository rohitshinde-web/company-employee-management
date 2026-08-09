import pg from 'pg';
import { config } from '../config/environment';

const { Pool } = pg;

/**
 * Singleton PostgresSQL Coneection Pool Instance
 */

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  user: config.db.user,
  password: config.db.password,
  max: 20,
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000,
});

// Event listner triggered when a new client connection is established in the pool

pool.on('connect', () => {
  if (config.nodeEnv === 'development') {
    console.log('New PostgreSQL client connections checked out from pool');
  }
});

// Global error handler for idle pool clients

pool.on('error', (err: Error) => {
  console.log('Unexpected idle PostgreSQL client error:', err);
});

/**
 * Verifies active database connectivity during applications initialization
 */

export const checkDatabaseConnection = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    const res = await client.query('SELECT NOW() AS current_time');
    console.log(`PostgreSQL Database Connected Successfully at [${res.rows[0].current_time}]`);
  } finally {
    client.release();
  }
};
