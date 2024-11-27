
import express, { json } from 'express';
const app = express();
import { nanoid } from 'nanoid';
app.use(json());

let list = [];

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/list/create', (req, res) => {
  const { title, products } = req.body;
  let id = nanoid(4);
  const wishlinkURL = `http://localhost:3000/list/${id}`
  const createdList = { id, title, products, wishlinkURL }
  console.log(id)
  list[id] = { createdList }
  console.log(list)

  res.json({ createdList, link: `/list/${id}` });
})
app.get('/list/:id', (req, res) => {
  const wishlink = list[req.params.id];
  if (wishlink) {
    res.render('pages/wishlink');

  } else {
    res.status(404).json({ error: 'Wishlink not found' });
  }
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});