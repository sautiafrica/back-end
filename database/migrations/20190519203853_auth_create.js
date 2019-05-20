exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('auth', tbl => {
        tbl.increments()

        tbl
        .string('username', 255)
        .notNullable()
        .unique()

        tbl.string('password', 255)
        .notNullable()

        tbl.string('firstName', 255)
        .notNullable()

        tbl.string('lastName', 255)
        .notNullable()

        tbl.timestamps(true, true); // create_at and updated_at
    })
};

exports.down = function(knex, Promise) {
    
    return knex.schema.dropTableIfExists('auth')
};
