const express = require('express'),
path = require('path'),
cons = require('consolidate'),
ejs = require('ejs'),
app = express();
const localport = '3333';
const localhost = 'http://localhost';
const postgres = require('./db/pg.js');
let categories = require('./data.js');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', cons.ejs);
app.set('view engine', 'ejs');


app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.get('/', async function(req, res) {
  let categories, items;
  try {
    categories = await postgres.getCategories();
    items = await postgres.getItems();
  } finally {
    res.render('index', { categories, items });
  }
});

app.post('/addcategory/:category', (req, res) => {
  addCategory(req.params.category);
  res.send('200');
});

app.put('/editcategory/:targetcategory/:newname', (req, res) => {
  editCategory(req.params.targetcategory, req.params.newname);
  res.send('200');
});

app.post('/additem/:targetcategory/:item', (req, res) => {
  addItem(req.params.targetcategory, req.params.item);
  console.log(`adding ${req.params.item} to ${req.params.targetcategory}`);
  res.send('200');
});

app.put('/setstatus/:targetcategory/:item/:status', (req, res) => {
  changeItemStatus(req.params.targetcategory, req.params.item, req.params.status);
  res.send('200');
});

var server = app.listen(app.get('port'), function() {
  app.address = app.get('host') + ':' + server.address().port;
  console.log('Listening at ' + app.address);
});

function addCategory (categoryName) {
  categories.unshift({
    'category': categoryName,
    'categorySlug': categoryName.replace(/\s/g, ''),
    'items': []
  });
}

function editCategory (targetCategory, newName) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      category.category = newName;
    }
  }
}

function deleteCategory (targetCategory) {
  for (let i = 0; i < categories.length; i ++) {
    if (categories[i].categorySlug === targetCategory) {
      categories.split(i, 0);
    }
  }
}

function addItem (targetCategory, item) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      category.items.unshift({
        'name': item,
        'seen': false
      });
    }
  }
}

function changeItemStatus (targetCategory, targetItem, status) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      for (let item of category.items) {
        if (item.name === targetItem) {
          item.seen = status;
        }
      }
    }
  }
}

function deleteItem (targetCategory, targetItem) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      for (let i = 0; i < category.items.length; i ++) {
        if (category.items[i].name === targetItem) {
          category.items.splice(i, 1);
        }
      }
    }
  }
}
