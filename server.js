import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import { connectDB } from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT ?? 3000
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const catBookSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFood: String,
    funFact: String,
    image: String,
})

const CatBook = mongoose.model('CatBook', catBookSchema)

app.get('/catBook', async (req, res) => {
    const cats = await CatBook.find()
    res.send(cats)
})

app.get('/catBook/:id', async (req, res) => {
    const cat = await CatBook.findById()
    res.send(cat)
})

app.post('/catBook', async (req, res) => {
    const newCat = new CatBook(req.body)
    const saveCat = await newCat.save()
    res.send(saveCat)
})

app.delete('/catBook/:id', async (req, res) => {
    await CatBook.findByIdAndDelete(req.params.id)
    res.status(200).send('Cat deleted')
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})
