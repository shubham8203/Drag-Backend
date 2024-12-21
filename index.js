import express from 'express';
import dotenv from 'dotenv'
import connectDB from './src/db/db.js';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import {v2 as cloudinary} from 'cloudinary'
import cookieParser from 'cookie-parser';

dotenv.config({path:'.env'}); 




const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to Drag');
});
app.use('/v1/apis',userRoutes);
app.use('/uploads',express.static('src/uploads'))

connectDB()
.then(()=>{
    app.listen(5000, () => {
        console.log('Server is running at port 5000');
    })
})
.catch(() => {
    console.error("Error occured while starting server");
})