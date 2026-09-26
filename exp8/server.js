require("dotenv").config();

const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.urlencoded({ extended: true }));

// HOME PAGE
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>SportsPay - Match Tickets</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #07111f, #102a43, #06121f);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
        }

        .container {
            width: 100%;
            max-width: 900px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 42px;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        .header p {
            color: #a9b8c8;
            font-size: 16px;
        }

        .card {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            padding: 35px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .match {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 20px;
            margin-bottom: 30px;
        }

        .team {
            text-align: center;
            flex: 1;
        }

        .team-icon {
            width: 90px;
            height: 90px;
            margin: auto;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 42px;
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
        }

        .team h2 {
            margin-top: 12px;
            font-size: 22px;
        }

        .vs {
            font-size: 25px;
            font-weight: bold;
            color: #8ec5ff;
        }

        .details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 25px 0;
        }

        .detail {
            background: rgba(255,255,255,0.06);
            padding: 18px;
            border-radius: 14px;
            text-align: center;
        }

        .detail span {
            display: block;
            color: #9fb0c2;
            font-size: 13px;
            margin-bottom: 6px;
        }

        .detail strong {
            font-size: 16px;
        }

        .ticket {
            background: linear-gradient(135deg, #ffffff, #e9f1f8);
            color: #101820;
            border-radius: 18px;
            padding: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-top: 25px;
        }

        .ticket h3 {
            font-size: 20px;
            margin-bottom: 5px;
        }

        .ticket p {
            color: #596875;
            font-size: 14px;
        }

        .price {
            font-size: 30px;
            font-weight: bold;
            color: #0d6efd;
        }

        .pay-btn {
            margin-top: 20px;
            width: 100%;
            border: none;
            padding: 16px;
            border-radius: 12px;
            background: linear-gradient(90deg, #1677ff, #00a8ff);
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
        }

        .pay-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,150,255,0.35);
        }

        .secure {
            text-align: center;
            margin-top: 18px;
            color: #9fb0c2;
            font-size: 13px;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: #718096;
            font-size: 12px;
        }

        @media (max-width: 650px) {

            .header h1 {
                font-size: 32px;
            }

            .card {
                padding: 22px;
            }

            .match {
                gap: 8px;
            }

            .team-icon {
                width: 65px;
                height: 65px;
                font-size: 30px;
            }

            .team h2 {
                font-size: 17px;
            }

            .details {
                grid-template-columns: 1fr;
            }

            .ticket {
                flex-direction: column;
                align-items: flex-start;
            }

            .price {
                font-size: 27px;
            }
        }
    </style>
</head>

<body>

<div class="container">

    <div class="header">
        <h1>🏆 SportsPay</h1>
        <p>Secure online ticket booking for live sports</p>
    </div>

    <div class="card">

        <div class="match">

            <div class="team">
                <div class="team-icon">🇮🇳</div>
                <h2>India</h2>
            </div>

            <div class="vs">VS</div>

            <div class="team">
                <div class="team-icon">🇦🇺</div>
                <h2>Australia</h2>
            </div>

        </div>

        <div class="details">

            <div class="detail">
                <span>📅 DATE</span>
                <strong>20 October 2026</strong>
            </div>

            <div class="detail">
                <span>⏰ TIME</span>
                <strong>7:30 PM</strong>
            </div>

            <div class="detail">
                <span>📍 VENUE</span>
                <strong>Wankhede Stadium</strong>
            </div>

        </div>

        <div class="ticket">

            <div>
                <h3>🎟️ Match Entry Ticket</h3>
                <p>Standard seating • Digital ticket</p>
            </div>

            <div class="price">₹500</div>

        </div>

        <form action="/create-checkout-session" method="POST">
            <button class="pay-btn" type="submit">
                🔒 Pay ₹500 Securely
            </button>
        </form>

        <div class="secure">
            🔐 Secure payment powered by Stripe
        </div>

    </div>

    <div class="footer">
        SportsPay • Payment Gateway Integration Project
    </div>

</div>

</body>
</html>
    `);
});


// STRIPE CHECKOUT
app.post("/create-checkout-session", async (req, res) => {

    try {

        const session = await stripe.checkout.sessions.create({

            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: "inr",

                        product_data: {
                            name: "India vs Australia Match Ticket"
                        },

                        unit_amount: 50000
                    },

                    quantity: 1
                }
            ],

            success_url: "http://localhost:3003/success",

            cancel_url: "http://localhost:3003/cancel"
        });

        res.redirect(303, session.url);

    } catch (error) {

        console.log(error);

        res.status(500).send("Payment Error");

    }

});


// SUCCESS PAGE
app.get("/success", (req, res) => {

    res.send(`
        <html>
        <head>
            <title>Payment Successful</title>

            <style>
                body {
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg,#07111f,#12395b);
                    color: white;
                    font-family: Arial;
                    text-align: center;
                }

                .box {
                    padding: 45px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 20px;
                    backdrop-filter: blur(15px);
                }

                h1 {
                    color: #4ade80;
                    font-size: 35px;
                }

                p {
                    color: #cbd5e1;
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 25px;
                    background: #1677ff;
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                }
            </style>
        </head>

        <body>

            <div class="box">

                <h1>✓ Payment Successful!</h1>

                <p>Your test payment has been completed successfully.</p>

                <a href="/">Back to SportsPay</a>

            </div>

        </body>
        </html>
    `);

});


// CANCEL PAGE
app.get("/cancel", (req, res) => {

    res.send(`
        <html>
        <head>
            <title>Payment Cancelled</title>

            <style>
                body {
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #07111f;
                    color: white;
                    font-family: Arial;
                    text-align: center;
                }

                .box {
                    padding: 45px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 20px;
                }

                h1 {
                    color: #fbbf24;
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 25px;
                    background: #1677ff;
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                }
            </style>
        </head>

        <body>

            <div class="box">

                <h1>Payment Cancelled</h1>

                <p>Your payment was cancelled.</p>

                <a href="/">Try Again</a>

            </div>

        </body>
        </html>
    `);

});


// START SERVER
app.listen(3003, () => {

    console.log("SportsPay running on http://localhost:3003");

});