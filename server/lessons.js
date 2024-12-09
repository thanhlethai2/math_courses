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
//-- Get All Lessons
//-------------------------------------------------------------------
router.get('/', async (req, res) => {
    const [lessons] = await db.query(`SELECT * FROM lessons`).catch(err => res.status(404).send(err))
    res.status(200).send(lessons)
})

//-------------------------------------------------------------------
//-- Get Lesson By Id
//-------------------------------------------------------------------
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const [lesson] = await db.query(`SELECT * FROM lessons WHERE id = ${id}`).catch(err => res.status(404).send(err))
    lesson.length === 0 ? res.status(404).send(`There is no lesson with Id = ${id}`) : res.status(200).send(lesson)
})

//-------------------------------------------------------------------
//-- Delete Lesson
//-------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const [{affectedRows}] = await db.query(`DELETE FROM lessons WHERE id = ${id}`).catch(err => res.status(404).send(err))
    affectedRows === 0 ? res.status(404).send(`There is no lesson with Id = ${id}`) : res.status(200).send("Lesson deleted successfully")
})

//-------------------------------------------------------------------
//-- Create Lesson
//-------------------------------------------------------------------
router.post('/', async (req, res) => {
    await db.query('INSERT INTO lessons SET ?', [req.body]).catch((err) => res.status(404).send(err))
    res.status(200).send("Lesson inserted successfully")
    
})

//-------------------------------------------------------------------
//-- Update Lesson
//-------------------------------------------------------------------
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const [row] = await db.query(`SELECT * FROM lessons WHERE id = ${id}`).catch(err => res.status(404).send(err))
    if (row.length === 0) {
        res.status(404).send(`There is no lesson with Id = ${id}`)
    } else {
        const lesson = req.body
        lesson.updatedAt = new Date()
        await db.query(`UPDATE lessons SET ? WHERE id = ${id}`, [lesson]).catch(err => res.status(404).send(err))
        res.status(200).send("Lesson updated successfully")
    } 
})

export default router