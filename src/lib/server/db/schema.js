import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull().unique(),
	github_id: integer('github_id', { mode: 'number' }).unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	full_name: text('full_name'),
	job_title: text('job_title'),
	about: text('about'),
	skills: text('skills'),
	image_url: text('image_url'),
	phone_number: text('phone_number'),
	location: text('location'),
	contact_email: text('contact_email')
})

export const experienceTable = sqliteTable('experience', {
	id: text('id').notNull().primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	company: text('company'),
	position: text('position'),
	start_date: text('start_date'),
	end_date: text('end_date'),
	description: text('description')
})

export const socialTable = sqliteTable('social', {
	id: text('id').notNull().primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	facebook: text('facebook'),
	youtube: text('youtube'),
	github: text('github'),
	linkedin: text('linkedin'),
	twitter: text('twitter'),
	instagram: text('instagram')
})

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
})
