//-------------------------------------------------------------------
//-- DECLARATIONS
//-------------------------------------------------------------------
import express from 'express';
import * as abc from 'express-async-errors'
import mysql from 'mysql2/promise';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import courseRouter from './courses.js'
import lessonRouter from './lessons.js'
import questionRouter from './questions.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//-------------------------------------------------------------------
//-- CONSTANTS
//-------------------------------------------------------------------
//-- Deriving __dirname in ESM using import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config() //- for using .env file
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5172

//-------------------------------------------------------------------
//-- Enable CORS (important if React app is on a different port)
//-------------------------------------------------------------------
app.use(cors());

//-------------------------------------------------------------------
//-- FOR ASYNC ERROR
//-------------------------------------------------------------------
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Internal Server Error.')
})

//-------------------------------------------------------------------
//-- Set up storage for uploaded images
//-------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOADS_SLASH);
    },
    filename: (req, file, cb) => {
        // Use a timestamp for uniqueness
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

//-------------------------------------------------------------------
//-- File filter to only accept PDFs
//-------------------------------------------------------------------
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only PDF files are allowed!'), false); // Reject the file
    }
};

//-------------------------------------------------------------------
//-- Initialize multer with the storage configuration
//-------------------------------------------------------------------
const upload = multer({ storage, fileFilter});

//-------------------------------------------------------------------
//-- Endpoint for uploading an image
//-------------------------------------------------------------------
app.post('/upload', upload.single('pdf'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.status(200).send({
            message: 'File uploaded successfully',
            file: req.file,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
  });

//-------------------------------------------------------------------
//-- Serve static files (if needed)
//-------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOADS)));

//-------------------------------------------------------------------
//-- Delete a file in server
//-------------------------------------------------------------------
app.delete('/delete-file', (req, res) => {
    const filePath = path.join(__dirname, process.env.UPLOADS, req.query.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({ message: 'File not found or cannot be deleted' });
        }
        res.send({ message: 'File deleted successfully' });
    });
});

//-------------------------------------------------------------------
//-- ROUTERS
//-------------------------------------------------------------------
app.use('/api/courses', courseRouter)
app.use('/api/lessons', lessonRouter)
app.use('/api/questions', questionRouter)


//-------------------------------------------------------------------
//-- INITIALIZATION: PORT AND DB 
//-------------------------------------------------------------------
mysql.createPool({
    host: 'localhost',
    database: 'math_courses',
    user: 'root',
    password: '',
}).query('SELECT 1').then(() => { 
    console.log('MYSQL-DB connection succeeded.') 
    app.listen(PORT, () => console.log(`Server started at ${PORT} ...`))
}).catch(err => console.log('MYSQL-DB connection fail. \n' + err))
//-------------------------------------------------------------------