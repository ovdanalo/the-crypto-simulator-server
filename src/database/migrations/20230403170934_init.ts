import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('wallet', t => {
        t.increments('id').primary()
        t.string('user_id').notNullable()
        t.string('name').notNullable()
        t.integer('amount').notNullable()
        t.integer('total').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('wallet')
}

