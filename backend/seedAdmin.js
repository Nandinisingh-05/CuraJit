import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/curajit';
    await mongoose.connect(mongoUri);
    
    console.log('Connected to MongoDB for seeding...');
    
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (adminUser) {
      console.log('Admin user already exists!');
      console.log(`Email: ${adminUser.email}`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      adminUser = await User.create({
        name: 'Super Admin',
        email: 'admin@curajit.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Created new admin user!');
      console.log(`Email: ${adminUser.email}`);
      console.log('Password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
