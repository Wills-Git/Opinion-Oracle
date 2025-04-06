import { config } from 'dotenv';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { GoogleGenAI } from '@google/genai';

config({path:'../.env'
})
const apiKey =  process.env.GEMINI_API_KEY
const PORT = process.env.PORT
const app = express();
const ai = new GoogleGenAI({ apiKey: apiKey})
app.use(express.json())

// routes
app.post('/', asyncHandler(getOpinions))

async function getOpinions(req,res){

    const userInput = req.body.input || "No input provided."; 

    const test = `You are a customer who has just bought this product and you are writing a review for it. 
    All you actually know about this product is what's in the description. Act like you are a loyal customer but 
    writing a review because of reasons you suspect from the product description. What isn't being said by the description?
    If the description is sparse, maybe there was something missing about the product in the description. Do not be silly at all,
    or use asterisks to portray attitude.
    If anything be terse. If there is not much to talk about, don't go on and on. Always return a number between 1 and 5 as the first character,
    indictating your review stars.
    - description: ${userInput}`; 

    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: test
    })

    const payload = {
        "loyalResult": response.text,
        "impulsiveResult": response.text,
        "curiousResult": response.text,
        "thriftyResult": response.text,
        "unsatisfiableResult": response.text,
        "easyGoingResult": response.text,
    }
    
    return res.status(200).json(payload)
}


app.listen(PORT,
    console.log(`server listening on ${PORT}`)
)