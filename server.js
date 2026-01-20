import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// define schema & model for the "products" collection
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

// replace direct mongoose.connect assignment with a start-after-connect flow
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');

    // start server after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use the model to fetch data from the collection
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error('DB read error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});