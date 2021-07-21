const express = require('express')
const router = express.Router()
const Question = require('./models/Question')

router.get('/questions', async (req, res) => {
    try{
        const questions = await Question.find()
        console.log(questions)
        return res.status(200).json(questions)
    } catch(error) {
        console.log(error)
        return res.status(500).json({"error":"error"})
    }
})

router.post('/questions', async (req, res) => {
    try{
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get('/', (req, res) => {
    res.send("Hello World")
})
module.exports = router