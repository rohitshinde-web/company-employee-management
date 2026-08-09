import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { pool } from '../db/index.js';
export abstract class BaseRepository<T extends QueryResultRow> {
  protected readonly pool: Pool = pool;

  /**
   * Executes a parameterized query using the pool or an active transaction client
   */

  protected async query<R extends QueryResultRow = T>(
    text: string,
    params?: unknown[],
    client?: PoolClient,
  ): Promise<QueryResult<R>> {
    const executor = client || this.pool;
    return executor.query<R>(text, params);
  }

  /**
   * Executes a database operation within an isolated, atomic SQL Transaction
   */

  public async executeTransaction<R>(callback: (client: PoolClient) => Promise<R>): Promise<R> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
