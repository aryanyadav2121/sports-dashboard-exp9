const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Display form
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Sports Registration Form</title>

            <style>
                body {
                    font-family: Arial;
                    background: #eef2f7;
                    text-align: center;
                    padding: 40px;
                }

                .form-box {
                    background: white;
                    width: 350px;
                    margin: auto;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px #bbb;
                }

                input {
                    width: 90%;
                    padding: 10px;
                    margin: 10px;
                }

                button {
                    padding: 10px 25px;
                    background: #172554;
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
            </style>
        </head>

        <body>

            <h1>🏆 Sports Score Dashboard</h1>

            <div class="form-box">
                <h2>Player Registration</h2>

                <form action="/submit" method="POST">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        required
                    >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                    >

                    <br>

                    <button type="submit">Submit</button>

                </form>
            </div>

        </body>
        </html>
    `);
});

// Process form data
app.post("/submit", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;

    res.send(`
        <h1>Registration Successful!</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <br>
        <a href="/">Back to Form</a>
    `);
});

// Start server
app.listen(3002, () => {
    console.log("Server running at http://localhost:3002");
});