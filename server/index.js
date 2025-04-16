import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

const DB_URL = 'mongodb://127.0.0.1:27017/musing_DB';
mongoose
  .connect(DB_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});