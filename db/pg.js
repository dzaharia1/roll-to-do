const SqlString = require('sqlstring');
const {Pool, Client} = require('pg');
// let client;
// if (!process.env.PGHOST) {
//   const connectionString = `postgresql://danzaharia@localhost:5432/whattodo`;
//   client = new Client({ connectionString });
// } else {
//   client = new Client({
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE,
//     port: process.env.PGPORT,
//     host: process.env.PGHOST,
//     ssl: true
//   });
// }

// const pool = new Pool({ connectionString });
const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://danzaharia@localhost:5432/whattodo`,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) { console.log(err); }
//   pool.end();
// });

async function runQuery (query) {
  let rows;

  try {
    rows = await client.query(query);
  } catch (error) {
    console.error('~~~~~~~~~~~~~~there was an error~~~~~~~~~~~~~~~~');
    console.error(error.stack);
  } finally {
    console.log(rows.rows);
    return rows.rows;
  }
}

module.exports = {
  getCategories: async () => {
    return await runQuery('SELECT * FROM categories ORDER BY id;');
  },
  addCategory: async (categoryName) => {
    const fixedName = SqlString.escape(categoryName);
    const slug = fixedName.replace(/\s+/g, '').toLowerCase();
    return await runQuery(`INSERT INTO categories (slug, category_name)
                    VALUES (${slug}, ${fixedName})`);
  },
  setLastSeenCategory: async (categorySlug) => {
    return await runQuery(`UPDATE categories SET last_seen = false WHERE last_seen = true;
                           UPDATE categories SET last_seen = true WHERE slug = '${categorySlug}'`);
  },
  getItems: async () => {
    return await runQuery('SELECT * FROM items ORDER BY seen, id desc;');
  },
  getCategoryItems: async (categorySlug) => {
    return await runQuery(`SELECT * FROM items WHERE category = ${categorySlug};`)
  },
  //todo: add date to items
  addItem: async (categorySlug, name) => {
    name = name.replace(`'`, `''`);
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    const slug = name.replace(/\s+/g, '').toLowerCase();
    return await runQuery(`INSERT INTO items (item_name, slug, category, date_added, seen)
              VALUES ('${name}', '${slug}', '${categorySlug}', TO_DATE('${dateString}', 'YYYY/MM/DD'), false);`);
  },
  deleteItem: async (categorySlug, itemSlug) => {
    categorySlug = categorySlug.replace(`'`, `''`);
    itemSlug = itemSlug.replace(`'`, `''`);
    return await runQuery(`DELETE FROM items WHERE slug = '${itemSlug}' AND category = '${categorySlug}';`);
  },
  changeItemStatus: async (categorySlug, itemSlug, status) => {
    return await runQuery(`UPDATE items SET seen = ${status}
              WHERE category = '${categorySlug}' AND slug = '${itemSlug}';`);
  }
};
