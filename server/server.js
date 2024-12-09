//-------------------------------------------------------------------
//-- DECLARATIONS
//-------------------------------------------------------------------
import express from 'express';
const app = express();
app.use(express.json())
import * as abc from 'express-async-errors'
import mysql from 'mysql2/promise';

//-------------------------------------------------------------------
//-- FOR ASYNC ERROR
//-------------------------------------------------------------------
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Internal Server Error.')
})

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