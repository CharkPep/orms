import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('customers_knex', (table) => {
        table.uuid('id').primary();

        table.string('firstName', 255);

        table.string('lastName', 255);

        table.boolean('isActive');

        table.index(['firstName', 'lastName']);
        
    }).createTable('bank_accounts_knex', (table) => {
        table.uuid('id').primary();

        table.decimal('networth', 9, 2);
        
        table.uuid('customer_id');
        table.index(['customer_id'], 'fk_customer_id_index', {
            indexType : 'BTREE'
        });
        
        table.foreign('customer_id').references('customers_knex.id')

    })
}


export async function down(knex: Knex): Promise<void> {
}

