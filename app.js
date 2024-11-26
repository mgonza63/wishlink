const express = require('express');

const app = express();
app.use(express.json());

let list = {};

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/list/create', (req, res) => {
  const { title } = req.body;
  const { products } = req.body;

  const productDetails = products.map((product, index) => {
    return `product ${index + 1 }- name: ${product.name}, url: ${product.url} `
  })
  console.log(`title: ${title}, products: ${productDetails}`)
})
app.listen(3000, () => {
  console.log('Server running on port 3000');
});