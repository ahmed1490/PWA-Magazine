import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Router, hashHistory} from 'react-router';
import Article from './containers/Article';
import Scraper from './utils/scraper';

let newsArticleLinks = ['a'];
let serviceWorkerPromise, newsArticlesLinksPromise;

if ('serviceWorker' in navigator) {
    serviceWorkerPromise = navigator.serviceWorker
        .register('service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}



let RouterNav = <Router history={hashHistory}>
    <Router path="/" component={App}>
        <Router path="/articles/:articleId" component={Article}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);

setTimeout(function(){
    newsArticleLinks.push('b')
}, 1000)


