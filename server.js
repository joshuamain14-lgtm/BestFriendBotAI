const express = require("express");
const OpenAI = require("openai");

const app = express();


// Allow JSON messages from Roblox
app.use(express.json());


// Connect to OpenAI using your Render environment variable
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

        // Get the player's message
        const playerMessage = req.body.message;


        if (!playerMessage) {

            return res.json({
                reply: "I didn't hear anything. Can you say that again?"
            });

        }



        // Ask the AI
        const response = await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",
                    content: `
You are a friendly Best Friend Bot inside Roblox.

Your personality:
- Kind
- Patient
- Supportive
- Positive
- A good listener

Your job:
- Listen to what the player says
- Respond based on their exact message
- Ask questions to continue the conversation
- Make the player feel heard

Do not pretend to be a real human.
Do not give dangerous advice.
Keep responses suitable for Roblox players.
`
                },

                {
                    role: "user",
                    content: playerMessage
                }

            ]

        });



        // Get AI response
        const aiReply =
            response.choices[0].message.content;



        // Send back to Roblox
        res.json({

            reply: aiReply

        });



    } catch (error) {


        console.log("AI ERROR:");
        console.log(error);



        res.json({

            reply:
            "Sorry, I am having trouble thinking right now. Can you try again?"

        });


    }

});



// Render uses its own port
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        "Best Friend Bot AI running on port " + PORT
    );

});
