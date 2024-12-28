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
//-- Get All Questions
//-------------------------------------------------------------------
router.get('/', async (req, res) => {
    const [questions] = await db.query(`SELECT * FROM questions`).catch(err => res.status(404).send(err))
    res.status(200).send(questions)
})

//-------------------------------------------------------------------
//-- Get question By Id
//-------------------------------------------------------------------
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const [question] = await db.query(`SELECT * FROM questions WHERE id = ${id}`).catch(err => res.status(404).send(err))
    question.length === 0 ? res.status(404).send(`There is no question with Id = ${id}`) : res.status(200).send(question)
})

//-------------------------------------------------------------------
//-- Delete question
//-------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const [{affectedRows}] = await db.query(`DELETE FROM questions WHERE id = ${id}`).catch(err => res.status(404).send(err))
    affectedRows === 0 ? res.status(404).send(`There is no question with Id = ${id}`) : res.status(200).send("Question deleted successfully")
})

//-------------------------------------------------------------------
//-- Create question
//-------------------------------------------------------------------
router.post('/', async (req, res) => {
    await db.query('INSERT INTO questions SET ?', [req.body]).catch((err) => res.status(404).send(err))
    res.status(200).send("Question inserted successfully")
    
})

//-------------------------------------------------------------------
//-- Update question
//-------------------------------------------------------------------
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const [row] = await db.query(`SELECT * FROM questions WHERE id = ${id}`).catch(err => res.status(404).send(err))
    if (row.length === 0) {
        res.status(404).send(`There is no question with Id = ${id}`)
    } else {
        const question = req.body
        question.updatedAt = new Date()
        await db.query(`UPDATE questions SET ? WHERE id = ${id}`, [question]).catch(err => res.status(404).send(err))
        res.status(200).send("Question updated successfully")
    } 
})

export default router