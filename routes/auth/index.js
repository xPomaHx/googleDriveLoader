import express from 'express';
import google from './google';

const app = express();
app.use('/google', google);

export default app;
