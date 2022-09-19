"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cheerio = require('cheerio');
const axios = require('axios');
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/web-scrape') {
        async function scrape() {
            try {
                const url = "https://javascript.info/";
                const response = await axios.get(url);
                const $ = cheerio.load(response.data);
                const title = $('title').text();
                const desc = $("meta[name = 'description']").attr("content");
                // const imageUrl = [];
                // $('img').each((i, image) => {
                //     let newImage = $(image).attr("content")
                //     imageUrl.push(newImage)
                // })
                let finalOutput = {
                    name: title,
                    description: desc,
                };
                //console.log(imageUrl);
                res.writeHead(200, { 'Content-Type': 'text/HTML' })
                    .end(JSON.stringify(finalOutput, null, 2));
            }
            catch (err) {
                console.error(err);
            }
            ;
        }
        scrape();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/HTML' })
            .end(JSON.stringify({ alert: "Route Unavailable" }));
    }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`Port Running on ${PORT}`); });
