exports.up = async (knex) => {
  if (!await knex.schema.hasTable('groups')) {
    return knex.schema.createTable('groups', (table) => {
      table.bigInteger('id').unique()
      table.string('title', 255)
      table.string('username', 255).unique()
      table.string('type', 40)
      table.boolean('active')
      table.boolean('admin')
      table.json('config')
      table.timestamps(['created_at', 'updated_at'])

      table.primary('id')
      table.index('username')
    })
  }
  return null
}

exports.down = async (knex) => {
  if (await knex.schema.hasTable('groups')) {
    return knex.schema.dropTable('groups')
  }
  return null
}
