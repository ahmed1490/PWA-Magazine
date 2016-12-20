const https = require('https');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function getTextSections(dom, texts){
    let textContent = [];
    texts.each(function(textIndex, text){
        if (dom(this).attr('id') !== 'item-0'){
            textContent.push(dom(this).text());
        }
    });

    return textContent;
}

function getNewsArticles(dom, articleLinks){
    let articles = [];
    articleLinks.each(function(){
        let articleHref = dom(this).attr('href');
        if (articleHref.includes('/editorial-damen/news/')){
            articles.push(articleHref);
        }
    });

    return articles;
}

function getArticle(uri, callback) {

    let html = "";

    let request = https.request({
        host: "m.zalando.de",
        path: uri,
        port: 443,
        method: 'GET'
    }, function (response) {
        console.log(response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (data) {
            html = html + data;
        });
        response.on('end', function () {
            let dom = cheerio.load(html);
            let article = {
                title: dom("#content .article-content-head .article-headline").text(),
                subTitle: dom("#content .article-content-head .article-intro").text(),
                image: dom("#content .article-main img").last().attr("src"),
                text: getTextSections(dom, dom("#content .article-main")),
                date: dom("#content .article-meta .article-post-date time").text(),
                imageCopyright: dom("#content .article-main figure figcaption").text()
            };
            callback(article);
        })
    });

    request.on('error', function (e) {
        console.error('Error encountered listening to ' + e);
        console.info('Retrying...');
    });

    request.end();
}


function getArticleLinks() {
    return new Promise((resolve, reject) => {
        let html = "";

        let request = https.request({
            host: "m.zalando.de",
            path: "/editorial-damen/news/",
            port: 443,
            method: 'GET'
        }, function (response) {
            console.log(response.statusCode);
            response.setEncoding('utf8');
            response.on('data', function (data) {
                html = html + data;
            });
            response.on('end', function () {
                const dom = cheerio.load(html);
                resolve(getNewsArticles(dom, dom("#content").find(".ng-scope .article .article-body a")));
            })
        });

        request.on('error', function (e) {
            reject('Error encountered listening to ' + e);
        });

        request.end();
    });
}

//following is a test. uncomment and run as node js
/*getArticleLinks((articleLinks)=>{
    console.log(articleLinks);
    getArticle(articleLinks[0], (articleData)=>{
        console.log(articleData)
    })
});*/

module.exports = {
    getArticleLinks: getArticleLinks,
    getArticle: getArticle
};
