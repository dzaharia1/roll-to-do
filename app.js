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

app.get('/', async (req, res) => {
  let categories, items;
  try {
    categories = await postgres.getCategories();
    items = await postgres.getItems();
  } finally {
    res.render('index', { categories, items });
  }
});

app.get('/categories', async (req, res) => {
  let categories;

  try {
    categories = await postgres.getCategories();
  } finally {
    res.send(categories);
  }
});

app.post('/addcategory/:category', (req, res) => {
  postgres.addCategory(req.params.category);
  res.send('200');
});

app.put('/editcategory/:targetcategory/:newname', (req, res) => {
  postgres.editCategory(req.params.targetcategory, req.params.newname);
  res.send('200');
});

app.post('/additem/:targetcategory/:item', async (req, res) => {
  console.log(`adding ${req.params.item} to ${req.params.targetcategory}`);
  postgres.addItem(req.params.targetcategory, req.params.item);
  res.send('200');
});

app.put('/setstatus/:targetcategory/:item/:status', (req, res) => {
  console.log(`setting ${req.params.item} in ${req.params.targetcategory} to ${req.params.status}`);
  postgres.changeItemStatus(req.params.targetcategory, req.params.item, req.params.status);
  res.send('200');
});

app.put('/setlastseen/:targetcategory', (req, res) => {
  console.log(`making ${req.params.targetcategory} last seen`);
  postgres.setLastSeenCategory(req.params.targetcategory);
  res.send('200');
});

app.delete('/delete/:targetcategory/:item', async (req, res) => {
  console.log(`Deleting ${req.params.item} from ${req.params.targetcategory}`);
  postgres.deleteItem(req.params.targetcategory, req.params.item);
  res.send('200');
});

var server = app.listen(app.get('port'), function() {
  app.address = app.get('host') + ':' + server.address().port;
  console.log('Listening at ' + app.address);
});
