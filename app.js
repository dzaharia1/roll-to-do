const express = require('express'),
path = require('path'),
cons = require('consolidate'),
ejs = require('ejs'),
app = express();
const localport = '3333';
const localhost = 'http://localhost';
let categories = require('./data.js');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', cons.ejs);
app.set('view engine', 'ejs');


app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.get('/', function(req, res) {
	res.render('index', { categories });
});

app.put('/addcategory/:category', (req, res) => {
  addCategory(req.params.category);
});

app.put('/editcategory/:targetcategory/:newname', (req, res) => {
  editCategory(req.params.targetcategory, req.params.newname);
});

app.put('/additem/:targetcategory/:item', (req, res) => {
  addItem(req.params.targetcategory, req.params.item);
});

app.put('/editstatus/:targetcategory/:item/:status', (req, res) => {
  changeItemStatus(req.params.targetcategory, req.params.item, req.params.status);
});

function addCategory (categoryName) {
  categories.push({
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

function addItem (targetCategory, item) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      category.items.push({
        'name': item,
        'status': false
      });
    }
  }
}

function changeItemStatus (targetCategory, targetItem, status) {
  for (let category of categories) {
    if (category.categorySlug === targetCategory) {
      for (let item of category.items) {
        if (item.name === targetItem) {
          item.status = status;
        }
      }
    }
  }
}

var server = app.listen(app.get('port'), function() {
  app.address = app.get('host') + ':' + server.address().port;
  console.log('Listening at ' + app.address);
});
