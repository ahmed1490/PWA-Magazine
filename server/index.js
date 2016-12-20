const express = require('express');
const Scraper = require("./utils/scraper");

const app = express();

app.get('/getNewsArticleLinks', (request, response) => {
    Scraper.getArticleLinks().then((articleLinks) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(articleLinks));
    }).catch((e) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(e));
    });
})
.get('/getNewsArticle', (request, response) => {
    Scraper.getArticleLinks().then((articleLinks) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(articleLinks));
    }).catch((e) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(e));
    });
});

app.listen(8080, () => {
    console.log(`Server started on port 8080`);
});