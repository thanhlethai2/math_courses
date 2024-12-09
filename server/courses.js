//-------------------------------------------------------------------
//-- DECLARATIONS
//-------------------------------------------------------------------
import express from 'express'
import mysql from 'mysql2/promise';
const router = express.Router()

//-------------------------------------------------------------------
//-- DB CONNECTION
//-------------------------------------------------------------------
const db = mysql.createPool({
    host: 'localhost',
    database: 'math_courses',
    user: 'root',
    password: '',
});

//-------------------------------------------------------------------
//-- Get All Courses
//-------------------------------------------------------------------
router.get('/', async (req, res) => {
    const [courses] = await db.query(`SELECT * FROM courses`).catch(err => res.status(404).send(err))
    res.status(200).send(courses)
})

//-------------------------------------------------------------------
//-- Get Course By Id
//-------------------------------------------------------------------
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const [course] = await db.query(`SELECT * FROM courses WHERE id = ${id}`).catch(err => res.status(404).send(err))
    course.length === 0 ? res.status(404).send(`There is no course with Id = ${id}`) : res.status(200).send(course)
})

//-------------------------------------------------------------------
//-- Delete Course
//-------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const [{affectedRows}] = await db.query(`DELETE FROM courses WHERE id = ${id}`).catch(err => res.status(404).send(err))
    affectedRows === 0 ? res.status(404).send(`There is no course with Id = ${id}`) : res.status(200).send("Course deleted successfully")
})

//-------------------------------------------------------------------
//-- Create Course
//-------------------------------------------------------------------
router.post('/', async (req, res) => {
    const course = req.body
    //-- Check for existing 'code'
    const [cour] = await db.query(`SELECT * FROM courses WHERE code = '${course.code}'`).catch(err => res.status(404).send(err))
    if (cour.length > 0) {
        res.status(404).send("This 'code' key is already taken")
    } else {
        await db.query('INSERT INTO courses SET ?', [course]).catch((err) => res.status(404).send(err))
        res.status(200).send("Course inserted successfully")
    }
})

//-------------------------------------------------------------------
//-- Update Course
//-------------------------------------------------------------------
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const [row] = await db.query(`SELECT * FROM courses WHERE id = ${id}`)
    .catch(err => res.status(404).send(err))
    if (row.length === 0) {
        res.status(404).send(`There is no course with Id = ${id}`)
    } else {
        const course = req.body
        const [us] = await db.query(`SELECT * FROM courses WHERE code = '${course.code}' AND id != ${id}`).catch(err => res.status(404).send(err))
        if (us.length > 0) {
            res.status(404).send("This 'code' key is already taken")
        } else {
            course.updatedAt = new Date()
            await db.query(`UPDATE courses SET ? WHERE id = ${id}`, [course]).catch(err => res.status(404).send(err))
            res.status(200).send("Course updated successfully")
        }
    } 
})

export default router