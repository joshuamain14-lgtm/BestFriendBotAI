const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


app.get("/", (req,res)=>{
    res.send("Best Friend Bot AI is online!");
});


app.post("/chat", async (req,res)=>{

    try {

        const playerMessage = req.body.message;


        const answer = await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages:[

                {
                    role:"system",
                    content:
                    `
                    You are a friendly Roblox Best Friend Bot.

                    Your job:
                    - Listen carefully
                    - Be kind
                    - Give supportive responses
                    - Ask questions
                    - Respond based on what the player says
                    `
                },

                {
                    role:"user",
                    content:playerMessage
                }

            ]

        });


        res.json({

            reply:
            answer.choices[0].message.content

        });


    } catch(error){

        console.log(error);

        res.json({

            reply:
            "I'm having trouble thinking right now."

        });

    }

});


app.listen(3000,()=>{

console.log("AI server running");

});
