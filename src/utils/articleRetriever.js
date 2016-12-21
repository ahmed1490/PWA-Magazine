import 'whatwg-fetch';
import CONSTANTS from './constants';

let articleLinksPromise = getArticleLinks(); //trigger article links
let articleData = [];


function getArticleLinks() {
    return articleLinksPromise || fetch(`${CONSTANTS.serverDomain}getNewsArticleLinks`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    })
}

function getArticle(articleLinkData, retries = 10) {
    return fetch(`${CONSTANTS.serverDomain}getNewsArticleDescription?articleLink=${encodeURIComponent(articleLinkData.link)}`)
        .then(response => {
            return response.json();
        })
        .then(responseJSON => {
            return { ...articleLinkData, descriptionFetched: true, ...responseJSON}
        })
        .catch(() => {
            if (retries > 0) {
                getArticle(articleLinkData, retries-1);
            }
        })
}

function getPagesFromIndex(index){
    return getArticleLinks().then((articleLinks) => {
        articleData = articleLinks;
        /*let startIndex = (index - 3) > 0 ? (index - 3) : 0;
        let endIndex = (index + 3) < articleData.length ? (index + 3) : articleData.length;*/

        const articlePromises = articleData.slice(0, 10).map((articleLinkData) => {
            return (articleLinkData.descriptionFetched ? articleLinkData : getArticle(articleLinkData));
        });

        return Promise.all(articlePromises).then((updatedArticleData) => {
            return updatedArticleData;
        });
    });
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