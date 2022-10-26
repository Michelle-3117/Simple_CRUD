import http, { IncomingMessage, Server, ServerResponse } from "http";
const cheerio = require('cheerio');
const axios = require('axios');

/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url === '/web-scrape') {
    async function scrape() {
        try {
        const url = "https://google.com/"
        const response = await axios.get(url)
        const $ = cheerio.load(response.data);
        const title = $('title').text()
        const desc = $("description").attr("content");
       

        let finalOutput = {
            name: title,
            description: desc,
        }
        
        res.writeHead(200, {'Content-Type': 'text/HTML'})
        .end(JSON.stringify(finalOutput, null, 2))
        }
         catch (err) {console.error(err)};
    } 
    scrape();
} else {
    res.writeHead(404, {'Content-Type': 'text/HTML'})
    .end(JSON.stringify({alert: "Route Unavailable"}))
}
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Port Running on ${PORT}`)});

    
