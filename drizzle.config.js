import * as path from 'node:path'
import * as fs from 'node:fs'

/**
 *
 * @param {string} base
 * @param {string} ext
 * @param {string[]|null} files
 * @param {string[]|null} result
 * @returns
 */
const findByExt = (base, ext, files = null, result = null) => {
	let res = result ? result : []
	const f = files || fs.readdirSync(base)
	f.forEach((file) => {
		const newbase = path.join(base, file)
		if (fs.statSync(newbase).isDirectory()) {
			res = findByExt(newbase, ext, fs.readdirSync(newbase), res)
		} else {
			if (file.slice(-1 * ext.length) === ext) {
				res.push(newbase)
			}
		}
	})
	return res
}

const getLocalSqliteUrl = () => {
	let sqliteFiles = []
	try {
		sqliteFiles = findByExt('./.wrangler/state/v3/d1', '.sqlite')
	} catch (e) {
		console.error('failed to find, got error', e)
	}
	if (sqliteFiles.length === 0) {
		console.warn('No sqlite files found in .wrangler folder')
	}
	return sqliteFiles[0] || ''
}

/**
 * This is the config for __drizzle-kit__.
 * It's used to generate migrations for the database.
 * You can find documentation here: https://orm.drizzle.team/kit-docs/conf.
 *
 * If you are looking for how to apply and list available migrations see __Cloudflare D1__
 * documentation: https://developers.cloudflare.com/workers/wrangler/commands/#d1 and
 * __package.json__ file.
 */

export default {
	schema: './src/lib/server/db/schema.js',
	out: './migrations',
	driver: 'better-sqlite',
	dbCredentials: {
		url: getLocalSqliteUrl()
	}
}
