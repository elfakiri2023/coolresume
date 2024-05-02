/**
 *  @see https://github.com/drizzle-team/drizzle-orm/discussions/1545
 */

/** @type import('drizzle-kit').Config */
export default process.env.DB_URL
	? {
			schema: './src/lib/server/db/schema.js',
			out: './migrations',
			driver: 'better-sqlite',
			dbCredentials: {
				url: process.env.DB_URL
			}
		}
	: {
			schema: './src/lib/server/db/schema.js',
			out: './migrations',
			driver: 'd1',
			dbCredentials: {
				wranglerConfigPath: __dirname + '/wrangler.toml',
				dbName: 'coolresume_db'
			}
		}
