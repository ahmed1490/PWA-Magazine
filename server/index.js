const express = require('express');
const Scraper = require("./utils/scraper");
const cors = require('cors');
const app = express();
/*
const pem = require('pem');
const https = require('https');
*/

app.use(cors());
app.options('*', cors());

app.use(express.static('./build'));

app.get('/getNewsArticleLinks', function(request, response){
    Scraper.getInitialArticleData()
    .then(function(articleLinks){
        response.end(JSON.stringify(articleLinks));
    }).catch((e) => {
        response.end(JSON.stringify(e));
    });
})
.get('/getNewsArticleDescription', function(request, response){
    Scraper.getArticleDescription(request.query.articleLink)
    .then(function(articleData){
        response.end(JSON.stringify(articleData));
    }).catch((e) => {
        response.end(JSON.stringify(e));
    });
})
.get('/getImage', function(request, response){
    Scraper.sendImage(request.query.imageLink)
    .then(function(imageResponse){
        response.set('Content-Length', imageResponse.headers.get('Content-Length'));
        response.set('Content-Type', imageResponse.headers.get('Content-Type'));
        imageResponse.body.pipe(response);
    }).catch((e) => {
        console.log("Image fetch failed", e);
        response.end(JSON.stringify(e));
    });
})
.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
})
.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

/*
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
    https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(8080, '0.0.0.0', function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at https://localhost:8080/');
    });
});*/

app.listen(8080, () => {
    console.log(`Server started on port 8080`);
});
