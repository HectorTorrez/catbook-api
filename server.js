import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose'
import { connectDB } from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT ?? 3000

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})
