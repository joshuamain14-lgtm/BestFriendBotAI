const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const app = express();

app.use(express.json());


// Gemini connection
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



app.get("/", (req,res)=>{

    res.send("Best Friend Bot AI is online!");

});



app.post("/chat", async (req,res)=>{


    try {


        const playerMessage = req.body.message;



        if(!playerMessage){

            return res.json({

                reply:"I didn't hear you. Can you say that again?"

            });

        }



        const model = genAI.getGenerativeModel({

            model:"gemini-1.5-flash"

        });



        const prompt = `

You are a friendly Best Friend Bot inside Roblox.

Your personality:
- Kind
- Patient
- Supportive
- Positive
- A good listener

The player said:

"${playerMessage}"

Respond naturally.
Ask questions.
Help them feel heard.
Keep replies short enough for Roblox speech bubbles.

`;



        const result = await model.generateContent(prompt);


        const response = result.response;


        const reply = response.text();



        res.json({

            reply: reply

        });



    } catch(error){


        console.log("GEMINI ERROR:");
        console.log(error);



        res.json({

            reply:
            "Sorry, I am having trouble thinking right now."

        });


    }


});



const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        "Best Friend Bot AI running on port " + PORT
    );

});
