const express = require('express')
const router = express.Router()
const Question = require('./models/Question')

router.get('/questions', async (req, res) => {
    try{
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch(error) {
        console.log(error)
        return res.status(500).json({"error":"error"})
    }
})

router.post('/addquestion', async (req, res) => {
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

router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.post('/questions/', async (req, res) => {
    try {
        var marks = 0
        let n = req.body.length
        for (let i = 0; i < n; i++){
            let _id = req.body[i]._id
            let question = await Question.findOne({_id})
            let user_response = new Question
            user_response.description = req.body[i].description
            user_response.alternatives = req.body[i].alternatives

            if(isCorrect(user_response, question)){
                marks++;
            }
        }

        return res.status(200).json({'marks': marks})
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})

router.post('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { description } = req.body
        const { alternatives } = req.body
        user_response = new Question
        user_response.description = description
        user_response.alternatives = alternatives
        const question = await Question.findOne({_id})

        if(isCorrect(user_response, question)){
            return res.status(200).json({'Correct':'true'})
        } else {
            return res.status(200).json({'Correct': 'false'})
        }

    } catch (error) {
        return res.status(500).json({'error':error})
    }
})


function isCorrect(response, answer) {
    var n = answer.alternatives.length
    for (let i = 0; i < n; i++){
        if (response.alternatives[i].isCorrect != answer.alternatives[i].isCorrect)
            return false;
    }
    return true;
}

router.get('/', (req, res) => {
    res.send("Hello World")
})
module.exports = router