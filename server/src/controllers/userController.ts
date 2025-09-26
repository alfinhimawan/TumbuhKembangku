import { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Mock data - in real app, this would come from database
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    createdAt: '2024-01-03T00:00:00Z'
  }
];

export const getAllUsers = (req: Request, res: Response) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user' });
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
};