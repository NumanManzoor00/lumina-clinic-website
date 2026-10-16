import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const appointments=sqliteTable('appointments',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),name:text('name').notNull(),email:text('email').notNull(),doctor:text('doctor').notNull(),service:text('service').notNull(),date:text('date').notNull(),time:text('time').notNull(),createdAt:text('created_at').notNull()
},table=>[uniqueIndex('unique_doctor_slot').on(table.doctor,table.date,table.time)]);
