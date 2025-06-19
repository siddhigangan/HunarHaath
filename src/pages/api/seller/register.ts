import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/config/db';
import Seller from '@/models/Seller';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, contact, email, categories, photo, address, shopAddress, password } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new seller
    const seller = await Seller.create({
      name,
      contact,
      email,
      categories,
      photo,
      address,
      shopAddress,
      password: hashedPassword,
    });

    // Remove password from response
    const sellerResponse = seller.toObject();
    delete sellerResponse.password;

    res.status(201).json({
      success: true,
      data: sellerResponse,
    });
  } catch (error) {
    console.error('Error in seller registration:', error);
    res.status(500).json({ message: 'Error registering seller' });
  }
} 