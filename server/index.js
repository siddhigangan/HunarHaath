import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: './server/.env' });

// Debug environment variables
console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080','http://localhost:8081', 'http://localhost:8082'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://deshlahararn:rbhaicool7@hunarhaath.jtgfpf9.mongodb.net/craft-connection';
console.log('Attempting to connect to MongoDB with URI:', mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Connection Host:', mongoose.connection.host);
    console.log('Connection Port:', mongoose.connection.port);
    console.log('Full Connection String:', mongoose.connection.client.s.url);
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
    console.log('Current MongoDB Connection:', {
      host: mongoose.connection.host,
      database: mongoose.connection.db.databaseName,
      connectionString: mongoose.connection.client.s.url
    });
    
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

// Login route
app.post('/api/seller/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Remove password from response
    const sellerResponse = seller.toObject();
    delete sellerResponse.password;

    console.log('Seller logged in successfully:', { id: seller._id, email: seller.email });

    res.json({
      success: true,
      data: sellerResponse
    });
  } catch (error) {
    console.error('Error in seller login:', error);
    res.status(500).json({
      message: 'Error during login',
      error: error.message
    });
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

// Add 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 