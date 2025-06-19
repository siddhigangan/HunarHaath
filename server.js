import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://deshlahararn:rbhaicool7@hunarhaath.jtgfpf9.mongodb.net/craft-connection', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
  });

// Add connection error handler
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Seller Schema
const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  categories: [{ type: String, required: true }],
  photo: { type: String, default: null },
  address: { type: String, required: true },
  shopAddress: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Seller = mongoose.model('Seller', sellerSchema);

// Routes
app.post('/api/seller/register', async (req, res) => {
  try {
    console.log('Received registration request:', { ...req.body, password: '[REDACTED]' });
    
    const { name, contact, email, categories, photo, address, shopAddress, password } = req.body;

    // Validate required fields
    if (!name || !contact || !email || !categories || !address || !shopAddress || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        missingFields: Object.entries({ name, contact, email, categories, address, shopAddress, password })
          .filter(([_, value]) => !value)
          .map(([key]) => key)
      });
    }

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Parse categories if it's a string
    let parsedCategories = categories;
    if (typeof categories === 'string') {
      try {
        parsedCategories = JSON.parse(categories);
      } catch (e) {
        console.error('Error parsing categories:', e);
        return res.status(400).json({ message: 'Invalid categories format' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new seller
    const seller = await Seller.create({
      name,
      contact,
      email,
      categories: parsedCategories,
      photo,
      address,
      shopAddress,
      password: hashedPassword,
    });

    console.log('Seller registered successfully:', { id: seller._id, email: seller.email });

    // Remove password from response
    const sellerResponse = seller.toObject();
    delete sellerResponse.password;

    res.status(201).json({
      success: true,
      data: sellerResponse,
    });
  } catch (error) {
    console.error('Error in seller registration:', error);
    res.status(500).json({ 
      message: 'Error registering seller',
      error: error.message
    });
  }
});

// Get all sellers
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password'); // Exclude password from response
    res.json({
      success: true,
      data: sellers
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Error fetching sellers' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 