import express from 'express';
import { setCode, getAuthUrl } from '@root/providers/googleAuth';

const app = express();

app.get('/redirect', async (req, res) => {
  const { code } = req.query;
  await setCode(code);
  res.send('ok');
});

app.get('/login', async (req, res) => {
  res.redirect(getAuthUrl());
});

export default app;
