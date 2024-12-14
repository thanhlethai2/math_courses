//-------------------------------------------------------------------
//-- DECLARATIONS
//-------------------------------------------------------------------
import express from 'express';
import * as abc from 'express-async-errors'
import mysql from 'mysql2/promise';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Deriving __dirname in ESM using import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));


//-------------------------------------------------------------------
//-- CONSTANTS
//-------------------------------------------------------------------
const app = express();
app.use(express.json())

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
        cb(null, 'uploads/');
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
app.post('/upload', upload.single('pdf_file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    //-- Send back the path to the uploaded file
    res.status(200).json({ filePath: req.file.filename });
});

//-------------------------------------------------------------------
// Serve static files (if needed)
//-------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
//-------------------------------------------------------------------
//-- ROUTERS
//-------------------------------------------------------------------
import courseRouter from './courses.js'
import lessonRouter from './lessons.js'
app.use('/api/courses', courseRouter)
app.use('/api/lessons', lessonRouter)


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
    app.listen(5172, () => console.log('Server started at 5172 ...'))
}).catch(err => console.log('MYSQL-DB connection fail. \n' + err))
//-------------------------------------------------------------------