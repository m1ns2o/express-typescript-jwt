// src/controllers/authController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const users: User[] = [{
    id: 0,
    username: "test",
    password: "pwd"
  }];

const secretKey = "4ab2fce7a6bd79e1c014396315ed322dd6edb1c5d975c6b74a2904135172c03c"

const generateAccessToken = (user: User) => {
  return jwt.sign({ username: user.username }, secretKey, {
    expiresIn: '15m', // Adjust the expiration time as needed
  });
};

const generateRefreshToken = (user: User) => {
  return jwt.sign({ username: user.username }, 'your-refresh-secret-key', {
    expiresIn: '7d', // Adjust the expiration time as needed
  });
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const newUser: User = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  console.log(accessToken, refreshToken);
  res.json({ accessToken, refreshToken });
};

export const refreshAccessToken = (req: Request, res: Response) => {
  const { user } = req.body;
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
};
