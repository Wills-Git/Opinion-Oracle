import { config } from 'dotenv';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { GoogleGenAI } from '@google/genai';
import { customers } from './prompts.mjs';

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

    const loyalResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.loyalCustomer + userInput
    })
    const impulsiveResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.impulsiveCustomer + userInput
    })
    const curiousResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.curiousCustomer + userInput
    })
    const thriftyResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.thriftyCustomer + userInput
    })
    const unsatisfiableResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.unsatisfiableCustomer + userInput
    })
    const easyGoingResponse = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: customers.easyGoingCustomer + userInput
    })


    const payload = {
        "loyalResult": loyalResponse.text,
        "impulsiveResult": impulsiveResponse.text,
        "curiousResult": curiousResponse.text,
        "thriftyResult": thriftyResponse.text,
        "unsatisfiableResult": unsatisfiableResponse.text,
        "easyGoingResult": easyGoingResponse.text,
    }
    
    return res.status(200).json(payload)
}


app.listen(PORT,
    console.log(`server listening on ${PORT}`)
)