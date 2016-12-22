const https = require('https');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

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

function extractInitialArticleData($, articles){
    let articleDataList = [];
    articles.each(function(){
        let article = $(this);
        let articleData = {};
        let articleHref = article.find(".article-body a").attr('href');
        if (articleHref && articleHref.indexOf('news') > -1){
            articleData.heading = article.find('.article-headline.entry-title').text();
            articleData.subtitle = article.find('.article-intro.entry-content').text();
            articleData.imageLink = article.find('.article-image img').attr('src');
            // articleData.imageLink = `/getImage?imageLink=${encodeURIComponent(article.imageLink)}``
            articleData.date = article.find('.article-post-date time').text();
            articleData.link = `https://m.zalando.de/${article.find('.article-body a').attr('href')}`;
            articleData.text = ['Loading...'];
            articleDataList.push(articleData);
        }
    });

    return articleDataList;
}

function getArticleDescription(uri, callback) {
    return fetch(uri, {
        "method": 'GET'
    }).then(function(res) {
        return res.text();
    }).then(function(html) {
        let dom = cheerio.load(html);
        return {
            text: getTextSections(dom, dom("#content .article-main")),
            imageCopyright: dom("#content .article-main figure figcaption").text()
        };
    }).catch(error => {
        console.log(error)
    });
}

function getInitialArticleData(){
    return fetch(`https://m.zalando.de/editorial-damen/news/`, {
        "method": 'GET'
    }).then(function(res) {
        return res.text()
    }).then(function(html) {
        const dom = cheerio.load(html);
        return extractInitialArticleData(dom, dom("#content .article"));
    }).catch(error => {
        console.log(error)
    });
}

function sendImage(imageLink){
    return fetch(imageLink, {
        "method": 'GET'
    }).then(function(res) {
        return res;
    }).catch(error => {
        console.log(error)
    });
}

module.exports = {
    getArticleDescription: getArticleDescription,
    getInitialArticleData: getInitialArticleData,
    sendImage: sendImage
};
