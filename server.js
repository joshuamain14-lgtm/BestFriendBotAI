const express = require("express");
const OpenAI = require("openai");

const app = express();


// Allow Roblox to send JSON
app.use(express.json());


// Connect to OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// Test page
app.get("/", (req, res) => {

    res.send("Best Friend Bot AI is online!");

});


// Roblox sends messages here
app.post("/chat", async (req, res) => {

    try {

        const playerMessage = req.body.message;


        if (!playerMessage) {

            return res.json({
                reply: "I didn't hear anything. Can you say that again?"
            });

        }



        const response = await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",

                    content:
                    `
You are a friendly Best Friend Bot inside Roblox.

Personality:
- Kind
- Patient
- Supportive
- Positive
- A good listener

Rules:
- Respond based on what the player says.
- Ask questions to continue the conversation.
- Make players feel heard.
- Keep responses short enough for Roblox chat bubbles.
- Do not pretend to be a real human.
                    `
                },


                {
                    role: "user",

                    content: playerMessage
                }

            ]

        });



        const aiReply =
        response.choices[0].message.content;



        res.json({

            reply: aiReply

        });



    } catch(error) {


        console.log("AI ERROR:");
        console.log(error);


        res.json({

            reply:
            "Sorry, I am having trouble thinking right now."

        });

    }

});



// Render needs this port
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        "Best Friend Bot AI running on port " + PORT
    );

});
