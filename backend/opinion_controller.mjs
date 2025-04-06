import { config } from 'dotenv';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { GoogleGenAI } from '@google/genai';

config({path:'../.env'
})
const apiKey =  process.env.GEMINI_API_KEY
const app = express();
const ai = new GoogleGenAI({ apiKey: apiKey})
app.use(express.json())

console.log(process.env.GEMINI_API_KEY)

async function getOpinions(req,res){
    const test = `You are a customer who has just bought this product and you are writing a review for it. 
    All you actually know about this product is what's in the description. Act like you are a loyal customer but 
    writing a review because of reasons you suspect from the product description. WHat isn't being said by the description?
    If the description is sparse, maybe there was something missing about the product in the desctiption.
    - description: This is a great shovel, very new, very nice.`
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: test
    })
    console.log(response.text)
}

getOpinions()