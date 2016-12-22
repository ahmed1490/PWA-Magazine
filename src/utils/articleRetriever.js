import 'whatwg-fetch';
import CONSTANTS from './constants';

let articleLinksPromise = getArticleLinks(); //trigger article links
let articleData = [];


function getArticleLinks() {
    return articleLinksPromise || fetch(`/getNewsArticleLinks`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json().then((articles) =>{
            cacheLinksToServiceWorker(articles.slice(0, 10).map((article) => `/getImage?imageLink=${encodeURIComponent(article.imageLink)}`));
            return articles;
        });
    })
}

function getArticle(articleLinkData, retries = 3) {
    return fetch(`/getNewsArticleDescription?articleLink=${encodeURIComponent(articleLinkData.link)}`)
        .then(response => {
            return response.json();
        })
        .then(responseJSON => {
            return { ...articleLinkData, descriptionFetched: true, ...responseJSON}
        })
        .catch((err) => {
            console.error('error in fetching description', err);
            if (retries > 0) {
                getArticle(articleLinkData, retries-1);
            }
        })
}

function getPagesFromIndex(index){
    return getArticleLinks().then((articleLinks) => {
        articleData = articleLinks.slice(0, 10);
        /*let startIndex = (index - 3) > 0 ? (index - 3) : 0;
        let endIndex = (index + 3) < articleData.length ? (index + 3) : articleData.length;*/

        cacheLinksToServiceWorker(articleData.map((articleData) => `/getNewsArticleDescription?articleLink=${encodeURIComponent(articleData.link)}`));

        const articlePromises = articleData.map((articleLinkData) => {
            return (articleLinkData.descriptionFetched ? articleLinkData : getArticle(articleLinkData));
        });

        return Promise.all(articlePromises).then((updatedArticleData) => {
            return updatedArticleData;
        });
    });
}

function cacheLinksToServiceWorker(linksToCache) {
    caches.open('z.fm-v1')
        .then(function(cache) {
            console.log('caching thigns', linksToCache);
            return cache.addAll(linksToCache)
    });

    // navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        // console.log('links to cache', linksToCache, navigator.serviceWorker.ready, serviceWorkerRegistration.active);
        // serviceWorkerRegistration.addEventListener('fetch', function (event) {
        //     console.log('SW ACTIVATED: links to cache', linksToCache, navigator.serviceWorker.controller);
        //     navigator.serviceWorker.controller.postMessage({ command: 'cache', urlsToCache: linksToCache })
        // });
    // });
}

/*function getArticlePages(startIndex) {
    console.log("getting news...");
    return getArticleLinks().then((articleLinks) => {

        articleData = articleLinks.map((articleLink)=> {
           return { ...articleLink, descriptionFetched: false};
        });


        console.log("getting article link descriptions", articleData)
        const articlePromises = articleData.map((articleLinkData) => {
            console.log("Requesting article news data")
            return (articleLinkData.descriptionFetched ? articleLinkData : getArticle(articleLinkData));
        });

        return Promise.all(articlePromises).then((updatedArticleData) => {
            console.log("got updated article data")
            articleData = updatedArticleData;

            return getPagesFromIndex(startIndex);
        });
    })
}*/

module.exports = {
    getPagesFromIndex: getPagesFromIndex,
    getArticleLinks: getArticleLinks
};