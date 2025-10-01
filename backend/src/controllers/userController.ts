// src/controllers/userController.ts
import type { Request, Response, NextFunction } from "express"; // type-only imports for TS
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from '../models/User.ts';        // runtime import


import type { IUser } from '../models/User.ts'; // type-only import

import type { AuthRequest } from '../middlewares/authMiddleware.ts';



// GET /users/me
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user: IUser | null = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('getMe Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user — password will be hashed automatically by schema
    const user: IUser = await User.create({
      username,
      password, // raw password, DO NOT hash manually
      email
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id.toString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } });
    if (!user) {
      
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(password)
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      username: user['username'],
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
