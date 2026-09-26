const http = require("http");

const server = http.createServer((req, res) => {

    res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
});

    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sports Score Dashboard</title>

            <style>
                body {
                    font-family: Arial;
                    margin: 0;
                    background: #eef2f7;
                    text-align: center;
                }

                header {
                    background: #172554;
                    color: white;
                    padding: 25px;
                }

                .container {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin: 40px;
                }

                .card {
                    background: white;
                    width: 250px;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px #bbb;
                }

                .score {
                    font-size: 28px;
                    font-weight: bold;
                    color: #172554;
                }

                .live {
                    color: red;
                    font-weight: bold;
                }

                footer {
                    background: #172554;
                    color: white;
                    padding: 15px;
                    margin-top: 30px;
                }
            </style>
        </head>

        <body>

            <header>
                <h1>🏆 Sports Score Dashboard</h1>
                <p>Live Sports Updates</p>
            </header>

            <div class="container">

                <div class="card">
                    <h2>🏏 Cricket</h2>
                    <h3>India vs Australia</h3>
                    <p class="score">245/6</p>
                    <p class="live">● LIVE</p>
                </div>

                <div class="card">
                    <h2>⚽ Football</h2>
                    <h3>India vs Japan</h3>
                    <p class="score">2 - 1</p>
                    <p class="live">● LIVE</p>
                </div>

                <div class="card">
                    <h2>🏀 Basketball</h2>
                    <h3>Lakers vs Bulls</h3>
                    <p class="score">98 - 94</p>
                    <p class="live">● LIVE</p>
                </div>

            </div>

            <footer>
                Advanced Web Technology Lab - Experiment 6
            </footer>

        </body>
        </html>
    `);

    res.end();
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});