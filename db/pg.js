
const {Pool, Client} = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://danzaharia@localhost:5432/whattodo';

const pool = new Pool({ connectionString });
const client = new Client({ connectionString });

client.connect();

pool.query('SELECT NOW()', (err, res) => {
  if (err) { console.log(err); }
  pool.end();
});

async function runQuery (query) {
  let rows;

  try {
    rows = await client.query(query);
  } catch (error) {
    console.error('~~~~~~~~~~~~~~there was an error~~~~~~~~~~~~~~~~');
    console.error(error.stack);
  } finally {
    return rows.rows;
  }
}

module.exports = {
  getCategories: async () => {
    return await runQuery('SELECT * FROM categories;');
  },
  getItems: async () => {
    return await runQuery('select * from items;');
  },
  getCategoryItems: async (category) => {
    return await runQuery(`select * from items where category = ${category};`)
  },
  addItem: async (name, categorySlug) => {
    let date = new Date();
    dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    let slug = name.replace(/\s+/g, '');
    return await runQuery(`insert into items (item_name, slug, category, date_added)
              values ('${name}', '${slug}', '${categorySlug})'`)
  },
};
