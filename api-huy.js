const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_12 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6.1 Mobile/15E148 Safari/604.1',
    'Cookie': 'PHPSESSID=E3f7fbcec094ddde903e94fb904ba43e', 
    'Referer': 'https://tooldudoanai.fun/',
    'Origin': 'https://tooldudoanai.fun',
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest'
};

const GAMES = [
    { id: 'lc79',    url: 'https://tooldudoanai.fun/apilc79.php' },
    { id: 'sic789',  url: 'https://tooldudoanai.fun/api789sicbo.php' },
    { id: 'hitlon',  url: 'https://tooldudoanai.fun/apihitclubsicbo.php' },
    { id: 'betvip',  url: 'https://tooldudoanai.fun/apibetvip.php' },
    { id: 'b52md5',  url: 'https://tooldudoanai.fun/apib52md5.php' },
    { id: 'sicb52',  url: 'https://tooldudoanai.fun/apib52sicbo.php' },
    { id: 'sunlon',  url: 'https://tooldudoanai.fun/sun.php' }
];

let database = {};

async function startMining() {
    for (const game of GAMES) {
        try {
            const separator = game.url.includes('?') ? '&' : '?';
            const realUrl = `${game.url}${separator}t=${Date.now()}`;

            const response = await axios.get(realUrl, { headers: HEADERS });

            if (response.data) {
                database[game.id] = {
                    "author": "crack API ngu by Zyah",
                    ...response.data
                };
            }
        } catch (error) {
            // Error handling silent
        }
    }
}

startMining();

setInterval(startMining, 100);

app.get('/', (req, res) => {
    res.json({
        "info": "crack API tooldudoanai.fun by Zyah id @mryanhdz",
        "list_api": {
            "/lc79": "api dự đoán tài xỉu lc79",
            "/sunlon": "api dự đoán ngu tài xỉu sunwin",
            "/sic789": "api dự đoán tài xỉu ngu tài xỉu sicbo789",
            "/hitlon": "api dự đoán tài xỉu hitclub",
            "/betvip": "api dự đoán tài xỉu betvip",
            "/b52md5": "api dự đoán tài xỉu b52 md5",
            "/sicb52": "api dự đoán tài xỉu b52 sicbo"
        }
    });
});

app.get('/:game_id', (req, res) => {
    const id = req.params.game_id;
    if (database[id]) {
        res.json(database[id]);
    } else {
        res.json({ "author": "crack API ngu by Zyah", status: "Loading..." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
