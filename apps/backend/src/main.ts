import express from 'express';
// import * as path from 'path';
import responseTime from 'response-time';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProductsHandler } from './handlers/products';
import {
  addToCartHandler,
  getCartHandler,
  removeFromToCartHandler,
  updateInCartHandler,
} from './handlers/shop-carts';

const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  responseTime({
    digits: 0,
  })
);
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('/api/product', getProductsHandler);
app.get('/api/shop-cart', getCartHandler);
app.post('/api/shop-cart', addToCartHandler);
app.put('/api/shop-cart', updateInCartHandler);
app.delete('/api/shop-cart', removeFromToCartHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
